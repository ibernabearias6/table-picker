"use client";

import Input from "@/components/Input";
import Select from '@/components/Select';
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

interface FormData {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  userName: string;
  password: string;
  type: string;
  restaurantName: string | undefined;
}

export default function SignUpPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    userName: "",
    password: "",
    type: "",
    restaurantName: "",
  });
  const typeOptions = [
    {
        label: "User",
        value: "user",
    },
    {
        label: "Restaurant",
        value: "restaurant",
    },
  ];

  const onInputChange = (e:any) => {
    console.log(e);
  };

  return (
    <div className="flex items-center justify-between mt-[2%]">
      <section>
        <h6 className="text-sm opacity-50 tracking-wide">START FOR FREE</h6>
        <h1 className="text-5xl tracking-wide">Create new account</h1>
        <div className="flex gap-2 mt-2 tracking-wide font-light">
          <p className="text-zinc-400">Already a member?</p>
          <Link
            href="auth/login"
            className="text-violet-600 underline-offset-8 hover:underline"
          >
            Log In
          </Link>
        </div>
        <form className="mt-8 w-[650px]">
          <div className="grid grid-cols-2 row-auto gap-4">
            <Input
              value={form.name}
              type="text"
              theme="primary"
              label="Name"
              name="name"
              placeholder=""
              disabled={false}
              onChange={onInputChange}
            />
            <Input
              value={form.name}
              type="text"
              theme="primary"
              label="Last Name"
              name="lastname"
              placeholder=""
              disabled={false}
              onChange={onInputChange}
            />
            <Input
              value={form.name}
              type="number"
              theme="primary"
              label="Phone"
              name="phone"
              placeholder=""
              disabled={false}
              onChange={onInputChange}
            />
            <Input
              value={form.name}
              type="email"
              theme="primary"
              label="Email"
              name="email"
              placeholder=""
              disabled={false}
              onChange={onInputChange}
            />
            <Input
              value={form.name}
              type="text"
              theme="primary"
              label="User Name"
              name="username"
              placeholder=""
              disabled={false}
              onChange={onInputChange}
            />
            <Input
              value={form.name}
              type="password"
              theme="primary"
              label="Password"
              name="password"
              placeholder=""
              error={false}
              disabled={false}
              onChange={onInputChange}
            />
            <Input
              value={form.name}
              type="password"
              theme="primary"
              label="Confirm Password"
              name="confirmpassword"
              placeholder=""
              error={false}
              disabled={false}
              onChange={onInputChange}
            />
            <Select
                value={form.type}
                options={typeOptions}
                theme="primary"
                label="Type"
                name="type"
                onSelect={onInputChange}
            />
            <Input
              value={form.name}
              type="text"
              theme="primary"
              label="Restaurant Name"
              name="restaurantName"
              placeholder=""
              disabled={false}
              onChange={onInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-violet-600 rounded-2xl p-2 w-[250px] mt-8"
          >
            Create Acccount
          </button>
        </form>
      </section>
      <section className="flex justify-center items-center">
        <Image
          src="/img/signup-decoration.svg"
          className="bg-transparent object-cover w-3/4"
          width={50}
          height={50}
          alt="image"
        />
      </section>
    </div>
  );
}
