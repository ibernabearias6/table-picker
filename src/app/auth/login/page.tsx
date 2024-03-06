"use client";

import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FormData {
  userName: string;
  password: string;
}

export default function LogInPage() {
  const [form, setForm] = useState<FormData>({
    userName: "",
    password: "",
  });

  return (
    <div className="flex items-center justify-between mt-[7%]">
      <section>
        <h1 className="text-5xl tracking-wide">Log In</h1>
        <div className="flex gap-2 mt-2 tracking-wide font-light">
          <p className="text-zinc-400">Haven&apos;t a account?</p>
          <Link
            href="signup"
            className="text-violet-600 underline-offset-8 hover:underline"
          >
            Sign up
          </Link>
        </div>
        <form className="flex flex-col mt-8 w-[340px] gap-5">
          <Input
            value={form.userName}
            type="text"
            theme="primary"
            label="User Name"
            name="username"
            placeholder=""
            disabled={false}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
          />
          <Input
            value={form.password}
            type="password"
            theme="primary"
            label="Password"
            name="password"
            placeholder=""
            error={false}
            disabled={false}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="bg-violet-600 rounded-2xl p-2 w-[250px] mt-4"
          >
            Log In
          </button>
        </form>
      </section>
      <section className="flex justify-center items-center">
        <Image
          src="/img/login-decoration.svg"
          className="bg-transparent object-cover w-3/4"
          width={50}
          height={50}
          alt="image"
        />
      </section>
    </div>
  );
}
