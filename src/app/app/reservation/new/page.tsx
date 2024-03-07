"use client";

import Input from "@/components/Input";
import MainButton from "@/components/MainButton";
import Select from "@/components/Select";
import { ReservationCreate } from "@/models/reservation.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  tableId: string;
  restaurantId: string;
  date: string;
  userId: string;
}

export default function NewReservationPage() {
  const [formLoading, setFormLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    tableId: "",
    restaurantId: "",
    date: "",
    userId: "",
  });

  const isFormValid = () => {
    return !!form.date && !!form.tableId;
  };

  const handleSubmit = async () => {
    setFormLoading(true);
    const payload: ReservationCreate = {
      userId: "",
      date: form.date,
      tableId: form.tableId,
    };
    const response = await fetch("/api/reservation", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFormLoading(false);
    if (response.status === 200) {
      router.push("");
      toast("Reservation Created!");
    }
    console.log(form);
  };

  const onInputChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const getRestaurantOptions = async () => {
    const response = await fetch("/api/restaurant", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setRestaurants(result);
  };

  const restaurantOptions = () => {
    return restaurants?.map((x: any) => ({
      label: x.name,
      value: x.id,
    }));
  };

  const tableOptions = () => {
    const restaurant = restaurants.find((x) => x.id === form.restaurantId);
    return restaurant?.tables.map((x: any) => ({
      label: `${x.name} - ${x.capacity} persons`,
      value: x.id,
    }));
  };

  useEffect(() => {
    getRestaurantOptions();
  }, []);

  return (
    <div className="mt-8">
      <h1 className="text-violet-950 text-4xl">New Reservation</h1>
      <p className="bg-violet-600 text-zinc-500 bg-opacity-[15%] p-3 rounded mt-6">
        Book your reservation at the place and time you want <b>(1 hour)</b>
      </p>
      <div className="grid grid-cols-2 row-auto mt-10 gap-10 w-2/3">
        <Select
          value={form.tableId}
          options={restaurantOptions() || []}
          theme="secondary"
          label="Restaurant"
          name="tableId"
          disabled={formLoading}
          onSelect={(e) => onInputChange(e.target.name, e.target.value)}
        />
        <Select
          value={form.tableId}
          options={tableOptions() || []}
          theme="secondary"
          label="Table"
          name="tableId"
          disabled={formLoading}
          onSelect={(e) => onInputChange(e.target.name, e.target.value)}
        />
        <Input
          value={form.date}
          type="datetime-local"
          theme="secondary"
          label="Date"
          name="date"
          disabled={formLoading}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
        />
      </div>
      <MainButton
        title="Create Reservation"
        loading={formLoading}
        disabled={!isFormValid()}
        method={() => handleSubmit()}
        className="absolute bottom-5 right-4"
      />
    </div>
  );
}
