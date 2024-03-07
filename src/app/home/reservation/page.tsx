"use client";

import { getUserInStore } from "@/lib/user";
import { useEffect, useState } from "react";

export default function ReservationsPage() {
  const [reservation, setReservation] = useState<any[]>([]);

  useEffect(() => {
    const user = getUserInStore();
    const getRestaurantOptions = async () => {
      const response = await fetch(`/api/reservation?userId=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setReservation(result || []);
      console.log(result);
    };
    getRestaurantOptions();
  }, []);
  return (
    <div className="mt-8">
      <h1 className="text-violet-950 text-4xl">Reservations</h1>
      <div className="flex flex-col gap-3">
        {reservation.map((x) => (
          <div key={x.id} className="bg-violet-300 rounded-xl pl-6  mt-6">
            <div className="bg-zinc-50 rounded-xl shadow-md p-4 flex flex-col gap-6">
              <div className="flex justify-between">
                <label className="text-md text-violet-950 font-semibold tracking-wide">
                  RAICES
                </label>
                <nav className="font-normal text-sm">
                  <label className="text-violet-950">10/10/2024 {"|"} </label>
                  <label className="text-violet-600">7:00 PM - 8:00 PM</label>
                </nav>
              </div>
              <div className="flex gap-3 justify-between">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 justify-center w-fit bg-white pt-2 pb-3 px-16 rounded-xl shadow-md text-center">
                    <label className="text-violet-800">Table</label>
                    <label className="text-zinc-500 text-sm">A000202</label>
                  </div>
                  <div className="flex flex-col gap-2 justify-center w-fit bg-white pt-2 pb-3 px-16 rounded-xl shadow-md text-center">
                    <label className="text-violet-800">Table</label>
                    <label className="text-zinc-500 text-sm">A000202</label>
                  </div>
                </div>
                <div className="w-2/6 flex self-end justify-end gap-3">
                  <button className="bg-red-600 text-white text-xs py-1 px-6 rounded-md tracking-wide">
                    REJECT
                  </button>
                  <button className="text-white bg-green-500 text-sm py-1 px-6 rounded-md tracking-wide">
                    CONFIRM
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
