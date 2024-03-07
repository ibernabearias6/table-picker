"use client";

import NavBar from "@/components/NavBar";
import { getUserInStore, logOut } from "@/lib/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const user = getUserInStore();
  const typeUser = user?.type?.type;
  return (
    <div className="relative h-screen">
      <NavBar theme="secondary">
        <Link className="link" href="/">
          Home
        </Link>
        {typeUser === "User" ? (
          <>
            <Link className="link" href="/app/reservation/new">
              Add Reservation
            </Link>
            <Link className="link" href="/app/reservation">
              My Reservation
            </Link>
          </>
        ) : (
          <>
            <Link className="link" href="/app/reservation">
              All Reservations
            </Link>
            <Link className="link" href="/app/restaurant">
              My Restaurant
            </Link>
          </>
        )}
        <nav className="link cursor-pointer" onClick={logOut}>
          Log Out
        </nav>
      </NavBar>
      <main className="px-16">{children}</main>
    </div>
  );
}
