"use client";

import Input from "@/components/Input";
import Select from "@/components/Select";
import { Trash, Pencil } from "lucide-react";
export default function NewRestaurantPage() {
  return (
    <div className="mt-8">
      <h1 className="text-violet-950 text-4xl">New Restaurant</h1>
      <p className="bg-violet-600 text-zinc-500 bg-opacity-[15%] p-3 rounded mt-6">
        Add restaurant options and its available tables.
      </p>
      <div className="grid grid-cols-2 row-auto mt-10 gap-10 w-2/3">
        <Input
          value={""}
          type="text"
          theme="secondary"
          label="Name"
          name="name"
          placeholder=""
          disabled={false}
          onChange={(e) => {}}
        />
        <Select
          value={""}
          options={[]}
          theme="secondary"
          label="Available"
          name="available"
          onSelect={() => {}}
        />
      </div>
      <h2 className="text-2xl text-zinc-500 my-5">Tables</h2>
      <div className="grid grid-cols-3 row-auto mt-5 gap-x-10 gap-y-5 w-2/3">
        <Input
          value={""}
          type="number"
          theme="secondary"
          label="Number"
          name="number"
          placeholder=""
          disabled={false}
          onChange={(e) => {}}
        />
        <Input
          value={""}
          type="number"
          theme="secondary"
          label="Seats"
          name="seats"
          placeholder=""
          disabled={false}
          onChange={(e) => {}}
        />
        <Select
          value={""}
          options={[]}
          theme="secondary"
          label="Available"
          name="available"
          onSelect={() => {}}
        />
      </div>
      <button
        type="submit"
        className="bg-violet-950 text-white rounded-md p-1 mt-5 w-2/3"
      >
        Add Table
      </button>
      <div className="rounded-md mt-5 overflow-hidden w-2/3">
        <table className="table-autoborder-collapse w-full text-center rounded-xl">
          <thead>
            <tr className="text-sm">
              <th className="border p-1">Number</th>
              <th className="border p-1">Seats</th>
              <th className="border p-1">Available</th>
              <th className="border p-1"></th>
            </tr>
          </thead>
          <tbody className="text-zinc-600 text-sm">
            <tr>
              <td className="border p-2">1</td>
              <td className="border p-2">3</td>
              <td className="border p-2">Yes</td>
              <td className="border p-2">
                <div className="flex justify-around">
                  <Pencil className="text-zinc-500" size={16} />
                  <Trash className="text-zinc-500" size={16} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        type="submit"
        className="bg-violet-600 text-white rounded-2xl p-2 w-[250px] absolute bottom-5 right-4"
      >
        Add Restaurant
      </button>
    </div>
  );
}
