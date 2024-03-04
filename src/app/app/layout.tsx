"use client";

import NavBar from "@/components/NavBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="relative h-screen">
      <NavBar theme="secondary">
        <Link className="link" href="/">
          Home
        </Link>
        <Link className="link" href="/app/reservation/new">
        Add Reservation
        </Link>
        <Link className="link" href="/app/reservation">
        My Reservation
        </Link>
        <Link className="link" href="/app/reservation">
        All Reservations
        </Link>
      </NavBar>
      <main className="px-16">{children}</main>
    </div>
  );
}
