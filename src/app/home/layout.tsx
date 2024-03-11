"use client";

import NavBar from "@/components/NavBar";
import { getUserInStore, logOut } from "@/lib/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getUserInStore();
  const router = useRouter();
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
        <Link className="link" href="/home/restaurant/edit">
          My Restaurant
        </Link>
        <nav
          className="link cursor-pointer"
          onClick={() => {
            logOut();
            router.push("/");
          }}
        >
          LogOut
        </nav>
      </NavBar>
      <main className="px-16">{children}</main>
    </div>
  );
}
