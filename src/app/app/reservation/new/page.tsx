"use client";

import Input from "@/components/Input";

export default function NewReservationPage() {
  return (
    <div className="mt-8">
      <h1 className="text-violet-950 text-4xl">New Reservation</h1>
      <p className="bg-violet-600 text-zinc-500 bg-opacity-[15%] p-3 rounded mt-6">
        Book your reservation at the place and time you want
      </p>
      <div className="grid grid-cols-2 row-auto mt-10 gap-10 w-2/3">
        {/* <Select
          value={""}
          options={[]}
          theme="secondary"
          label="Restaurant"
          name="restaurant"
          onSelect={(e) => {}}
        />
        <Select
          value={""}
          options={[]}
          theme="secondary"
          label="Table"
          name="table"
          onSelect={(e) => {}}
        /> */}
        <Input
          value={""}
          type="number"
          theme="secondary"
          label="Persons Quantity"
          name="persons"
          placeholder=""
          disabled={false}
          onChange={(e) => {}}
        />
        <Input
          value={""}
          type="date"
          theme="secondary"
          label="Date"
          name="date"
          placeholder=""
          disabled={false}
          onChange={(e) => {}}
        />
        <Input
          value={""}
          type="time"
          theme="secondary"
          label="Time"
          name="time"
          placeholder=""
          disabled={false}
          onChange={(e) => {}}
        />
      </div>
      <button
        type="submit"
        className="bg-violet-600 text-white rounded-2xl p-2 w-[250px] absolute bottom-5 right-4"
      >
        Create Reservation
      </button>
    </div>
  );
}
