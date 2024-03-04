"use client";

import { Search, Pencil, Trash } from "lucide-react";
export default function RestaurantsPage() {
  return (
    <div className="mt-8">
      <h1 className="text-violet-950 text-4xl">Restaurants</h1>
      <div className="flex items-center justify-between px-4 py-2 mt-6 mb-8 bg-zinc-50 border border-zinc-300 rounded-md">
        <input type="text" placeholder="Search by name..." />
        <Search className="text-violet-950" size={16} />
      </div>
      <div className="rounded-md mt-5 overflow-hidden w-full">
        <table className="table-autoborder-collapse w-full text-center rounded-xl">
          <thead>
            <tr className="text-sm">
              <th className="border p-1">Name</th>
              <th className="border p-1">Tables</th>
              <th className="border p-1">Available</th>
              <th className="border p-1"></th>
            </tr>
          </thead>
          <tbody className="text-zinc-600 text-sm">
            <tr>
              <td className="border p-2">Locanda</td>
              <td className="border p-2">3</td>
              <td className="border p-2">Yes</td>
              <td className="border p-2">
                <div className="flex justify-around">
                  <Pencil className="text-zinc-500" size={16} />
                  <Trash className="text-zinc-500" size={16} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border p-2">Locanda</td>
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
    </div>
  );
}
