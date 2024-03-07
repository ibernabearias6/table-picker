"use client";

import NavBar from "@/components/NavBar";
import { getUserInStore, logOut } from "@/lib/user";
import Link from "next/link";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getUserInStore();
  const typeUser = user?.type?.type;

  return (
    <div className="relative h-screen">
      <NavBar theme="secondary">
        <Link className="link" href="/">
          Home
        </Link>
        <Link className="link" href="/home/reservation/new">
          Add Reservation
        </Link>
        <Link className="link" href="/home/reservation">
          Reservations
        </Link>
        {typeUser === "Adm" && (
          <Link className="link" href="/home/restaurant/edit">
            Add Restaurant
          </Link>
        )}
        <nav className="link" onClick={logOut}>
          LogOut
        </nav>
      </NavBar>
      <main className="px-16">{children}</main>
    </div>
  );
}
