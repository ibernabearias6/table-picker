'use client';

import { getUserInStore } from '@/lib/user';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [user] = useState<any>(getUserInStore());
  const [isLoading, setIsLoading] = useState({
    id: '',
    loading: false,
  });
  const [reload, setReload] = useState<boolean>(false);
  const isAdm = user?.type.type === 'Adm';

  const updateReservationStatus = async (status: string, reservation: any) => {
    setIsLoading({
      id: reservation.id,
      loading: true,
    });
    const payload = {
      reservationId: reservation.id,
      status: status,
    };
    const response = await fetch('/api/reservation', {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      toast('Status Updated!');
      const payload = {
        user: user.user,
        password: user.password,
      };
      const response = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
    } else {
      toast('Error');
    }
    setIsLoading({
      ...isLoading,
      loading: false,
    });
    setReload(!reload);
  };

  const statusColor = (status: string) => {
    let textColor = 'text-yellow-600';
    switch (status) {
      case 'Confirmed':
        textColor = 'text-green-600';
        break;
      case 'Rejected':
      case 'Cancelled':
        textColor = 'text-red-600';
        break;
      case 'Confirmed':
        textColor = 'text-green-600';
        break;
    }
    return textColor;
  };

  useEffect(() => {
    const getReservations = async () => {
      const response = await fetch(`/api/reservation?userId=${user?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setReservations(result || []);
    };
    getReservations();
  }, [user?.id, reload]);

  return (
    <div className='mt-8'>
      <h1 className='text-violet-950 text-4xl'>Reservations</h1>
      <div className='flex flex-col gap-3'>
        {reservations.map((item) => (
          <div
            key={item.id}
            className='bg-violet-300 rounded-xl pl-6  mt-6'
          >
            <div className='bg-zinc-50 rounded-xl shadow-md p-4 flex flex-col gap-6 relative'>
              <div className='flex justify-between'>
                <label className='text-md text-violet-950 font-semibold tracking-wide'>
                  {isAdm
                    ? item.user.name + ' ' + item.user.lastName
                    : item.restaurant.name}
                </label>
                <nav className='font-normal text-sm'>
                  <label className='text-violet-950'>
                    {new Date(item.date).toLocaleString()} {'|'}{' '}
                  </label>
                  <label className='text-violet-600'>
                    {new Date(item.endDate).toLocaleString()}
                  </label>
                </nav>
              </div>
              <div className='flex gap-3 justify-between'>
                <div className='flex gap-4'>
                  <div className='flex flex-col gap-2 justify-center w-fit bg-white pt-2 pb-3 px-16 rounded-xl shadow-md text-center'>
                    <label className='text-violet-800'>Table</label>
                    <label className='text-zinc-500 text-sm'>
                      {item.table.order}
                    </label>
                  </div>
                  <div className='flex flex-col gap-2 justify-center w-fit bg-white pt-2 pb-3 px-16 rounded-xl shadow-md text-center'>
                    <label className='text-violet-800'>Capacity</label>
                    <label className='text-zinc-500 text-sm'>
                      {item.table.capacity}
                    </label>
                  </div>
                  <div className='flex flex-col gap-2 justify-center w-fit bg-white pt-2 pb-3 px-16 rounded-xl shadow-md text-center'>
                    <label className='text-violet-800'>Status</label>
                    <label
                      className={`text-sm ${statusColor(item.status).toString()}`}
                    >
                      {item.status}
                    </label>
                  </div>
                </div>
                <div className='w-2/6 flex self-end justify-end gap-3'>
                  {isAdm ? (
                    <>
                      {item.status !== 'Rejected' && (
                        <button
                          className='bg-red-600 text-white text-xs py-1 px-6 rounded-md tracking-wide'
                          onClick={() =>
                            updateReservationStatus('Rejected', item)
                          }
                        >
                          REJECT
                        </button>
                      )}

                      {item.status !== 'Confirmed' && (
                        <button
                          className='text-white bg-green-500 text-sm py-1 px-6 rounded-md tracking-wide'
                          onClick={() =>
                            updateReservationStatus('Confirmed', item)
                          }
                        >
                          CONFIRM
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      className='bg-red-600 text-white text-xs py-1 px-6 rounded-md tracking-wide'
                      onClick={() => updateReservationStatus('Cancelled', item)}
                    >
                      CANCEL
                    </button>
                  )}
                </div>
              </div>
              {isLoading.id == item.id && isLoading && (
                <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black opacity-60 rounded-xl'>
                  <Image
                    src='/icons/loading.svg'
                    className='bg-transparent object-cover'
                    width={55}
                    height={55}
                    alt='image'
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
