"use client";

import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import MainButton from "@/components/MainButton";
import { saveUserInStore } from "@/lib/user";

interface FormData {
  userName: string;
  password: string;
}

export default function LogInPage() {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    userName: "",
    password: "",
  });

  const isFormValid = () => {
    return form.userName && form.password;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const payload = {
      user: form.userName,
      password: form.password,
    };
    const response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.status === 200) {
      saveUserInStore(result);
      router.push("/app/reservation");
    } else {
      toast("Incorrect User!");
    }
    setFormLoading(false);
  };

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
        <form
          className="flex flex-col mt-8 w-[340px] gap-5"
          onSubmit={handleSubmit}
        >
          <Input
            value={form.userName}
            type="text"
            theme="primary"
            label="User Name"
            name="username"
            disabled={formLoading}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
          />
          <Input
            value={form.password}
            type="password"
            theme="primary"
            label="Password"
            name="password"
            error={false}
            disabled={formLoading}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <MainButton
            title="Log In"
            loading={formLoading}
            disabled={!isFormValid()}
            className="mt-8"
          />
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
