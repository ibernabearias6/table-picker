"use client";

import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="relative h-screen overflow-hidden text-white bg-violet-950">
      <NavBar>
        <Link className="link" href="/">
          Home
        </Link>
        {pathname === "/auth/signup" ? (
          <Link className="link" href="/auth/login">
            Log In
          </Link>
        ) : (
          <Link className="link" href="/auth/signup">
            Sign Up
          </Link>
        )}
      </NavBar>
      <main className="px-16">{children}</main>
      <footer className="absolute -bottom-32">
        <Image
          src="/img/top-decoration.svg"
          className="w-full bg-transparent"
          width={50}
          height={50}
          alt="image"
        />
      </footer>
    </div>
  );
}
