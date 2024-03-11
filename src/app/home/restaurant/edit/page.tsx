"use client";

import Input from "@/components/Input";
import MainButton from "@/components/MainButton";
import Select from "@/components/Select";
import { getUserInStore, saveUserInStore } from "@/lib/user";
import { RestaurantEdit } from "@/models/restaurant.interface";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  available: boolean;
}

interface TableForm {
  id?: string;
  order: number;
  capacity: number;
}

export default function MyRestaurantPage() {
  const [formLoading, setFormLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState<any>({});
  const [form, setForm] = useState<FormData>({
    name: "",
    available: false,
  });
  const [tableForm, setTableForm] = useState<TableForm>({
    order: 0,
    capacity: 0,
  });
  const [tables, setTables] = useState<Array<TableForm>>([]);
  const availableOptions = [
    {
      label: "True",
      value: true,
    },
    {
      label: "False",
      value: false,
    },
  ];

  const isFormValid = () => {
    return !!form.name;
  };
  const isTableFormValid = () => {
    return (
      !!tableForm.order &&
      tableForm.order > 0 &&
      !!tableForm.capacity &&
      tableForm.capacity > 0
    );
  };

  const addTable = () => {
    setTables([
      ...tables,
      {
        capacity: tableForm.capacity,
        order: tableForm.order,
      },
    ]);
    cleanTableForm();
  };

  const cleanTableForm = () => {
    setTableForm({
      capacity: 0,
      order: 0,
    });
  };

  const handleSubmit = async () => {
    setFormLoading(true);
    const list = tables.map((x) => ({
      id: x.id,
      order: x.order.toString(),
      capacity: x.capacity.toString(),
    }));
    const payload: RestaurantEdit = {
      id: user?.restaurants[0].id,
      name: form.name,
      available: form.available,
      tables: list,
    };
    const response = await fetch("/api/restaurant", {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const payload = {
        user: user.user,
        password: user.password,
      };
      const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      saveUserInStore(result);
      toast("Restaurant Updated!");
    } else {
      toast("This name already exists!");
    }
    setFormLoading(false);
    cleanTableForm();
    setReload(!reload);
  };

  const onInputChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onInputChangeTable = (name: string, value: string) => {
    setTableForm({
      ...tableForm,
      [name]: value,
    });
  };

  useEffect(() => {
    const result = getUserInStore();
    setUser(result);
    const restaurant = result?.restaurants[0];
    if (restaurant) {
      const resultTables = restaurant.tables.map((x: any) => ({
        id: x.id,
        order: x.order,
        capacity: x.capacity,
      }));
      setForm({
        name: restaurant.name,
        available: restaurant.available,
      });
      setTables(resultTables || []);
    }
  }, [reload]);

  return (
    <div className="mt-8">
      <h1 className="text-violet-950 text-4xl">My Restaurant</h1>
      <p className="bg-violet-600 text-zinc-500 bg-opacity-[15%] p-3 rounded mt-6">
        Edit your restaurant options and its available tables.
      </p>
      <div className="grid grid-cols-2 row-auto mt-10 gap-10 w-2/3">
        <Input
          value={form.name}
          type="text"
          theme="secondary"
          label="Name"
          name="name"
          disabled={formLoading}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
        />
        <Select
          value={form.available.toString()}
          options={availableOptions}
          theme="secondary"
          label="Available"
          name="available"
          disabled={formLoading}
          onSelect={(e) => onInputChange(e.target.name, e.target.value)}
        />
      </div>
      <h2 className="text-2xl text-zinc-500 my-5">Tables</h2>
      <div className="grid grid-cols-3 row-auto mt-5 gap-x-10 gap-y-5 w-2/3">
        <Input
          value={tableForm.order}
          type="number"
          theme="secondary"
          label="Order"
          name="order"
          disabled={formLoading}
          onChange={(e) => onInputChangeTable(e.target.name, e.target.value)}
        />
        <Input
          value={tableForm.capacity}
          type="number"
          theme="secondary"
          label="Capacity"
          name="capacity"
          disabled={formLoading}
          onChange={(e) => onInputChangeTable(e.target.name, e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={!isTableFormValid()}
        onClick={addTable}
        className="bg-violet-950 text-white rounded-md p-1 mt-5 w-2/3 disabled:opacity-65"
      >
        Add Table
      </button>

      <div className="rounded-md mt-5 overflow-hidden w-2/3">
        <table className="table-autoborder-collapse w-full text-center rounded-xl">
          <thead>
            <tr className="text-sm">
              <th className="border p-1">Order</th>
              <th className="border p-1">Capacity</th>
            </tr>
          </thead>
          <tbody className="text-zinc-600 text-sm">
            {tables.map((x, index) => (
              <tr key={index}>
                <td className="border p-2">{x.order}</td>
                <td className="border p-2">{x.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MainButton
        title="Add Restaurant"
        type="button"
        loading={formLoading}
        disabled={!isFormValid()}
        method={() => handleSubmit()}
        className="absolute bottom-5 right-4"
      />
    </div>
  );
}
