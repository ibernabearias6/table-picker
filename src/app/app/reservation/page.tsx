"use client";

import { Search, Pencil, Trash, Plus } from "lucide-react";
export default function ReservationsPage() {
  return (
    <div className="mt-8">
      <h1 className="text-violet-950 text-4xl">Reservations</h1>
      <div className="flex justify-between mt-6 mb-8 gap-2">
        <div className="flex items-center w-full justify-between px-4 py-2  border bg-zinc-50 border-zinc-300 rounded-md">
          <input
            type="text"
            className="outline-none w-full bg-zinc-50"
            placeholder="Search by name..."
          />
          <Search className="text-violet-950" size={16} />
        </div>
        <button className="bg-violet-600 p-3 rounded-md">
          <Plus className="text-white" size={16} />
        </button>
      </div>
      <div className="bg-violet-300 rounded-xl pl-6">
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
    </div>
  );
}
