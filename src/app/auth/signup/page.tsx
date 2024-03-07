"use client";
import Input from "@/components/Input";
import MainButton from "@/components/MainButton";
import Select from "@/components/Select";
import { UserCreate } from "@/models/user.interface";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface FormData {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  type: string;
  restaurantName: string;
}

export default function SignUpPage() {
  const [formErrors, setFormError] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    type: "",
    restaurantName: "",
  });

  const hasFieldError = (field: string) => {
    return formErrors.hasOwnProperty(field);
  };

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

  const isFormValid = () => {
    let isValid =
      !!form.name &&
      !!form.lastName &&
      !!form.phone &&
      !!form.email &&
      !!form.userName &&
      !!form.password &&
      !!form.confirmPassword &&
      form.password === form.confirmPassword;

    if (form.type === "restaurant") {
      isValid = !!form.restaurantName;
    }
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({});
    setFormLoading(true);
    const payload: UserCreate = {
      user: form.userName,
      password: form.password,
      type: form.type === "restaurant" ? "Adm" : "User",
      name: form.name,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      restaurantName: form.restaurantName,
    };
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    setFormLoading(false);

    if ((result as object).hasOwnProperty("error")) {
      setFormError({ ...formErrors, ...result.error });
    } else {
      toast("Your user is created!");
      router.push("login");
    }
  };

  const onInputChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-between mt-[2%]">
      <section>
        <h6 className="text-sm opacity-50 tracking-wide">START FOR FREE</h6>
        <h1 className="text-5xl tracking-wide">Create new account</h1>
        <div className="flex gap-2 mt-2 tracking-wide font-light">
          <p className="text-zinc-400">Already a member?</p>
          <Link
            href="login"
            className="text-violet-600 underline-offset-8 hover:underline"
          >
            Log In
          </Link>
        </div>
        <form className="mt-8 w-[650px]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 row-auto gap-4">
            <Input
              value={form.name}
              type="text"
              theme="primary"
              label="Name"
              name="name"
              disabled={formLoading}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
            <Input
              value={form.lastName}
              type="text"
              theme="primary"
              label="Last Name"
              name="lastName"
              disabled={formLoading}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
            <Input
              value={form.phone}
              type="number"
              theme="primary"
              label="Phone"
              name="phone"
              disabled={formLoading}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
            <Input
              value={form.email}
              type="email"
              theme="primary"
              label="Email"
              name="email"
              disabled={formLoading}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
            <Input
              value={form.userName}
              type="text"
              theme="primary"
              label="User Name"
              name="userName"
              error={hasFieldError("userName")}
              messageError="This name already exists"
              disabled={formLoading}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
            <Input
              value={form.password}
              type="password"
              theme="primary"
              label="Password"
              name="password"
              disabled={formLoading}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
            <Input
              value={form.confirmPassword}
              type="password"
              theme="primary"
              label="Confirm Password"
              name="confirmPassword"
              error={form.password !== form.confirmPassword}
              messageError="Must be equal to password field"
              disabled={formLoading}
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
            <Select
              value={form.type}
              options={typeOptions}
              theme="primary"
              label="Type"
              name="type"
              disabled={formLoading}
              onSelect={(e) =>
                onInputChange(e.currentTarget.name, e.currentTarget.value)
              }
            />
            {form.type === "restaurant" && (
              <Input
                value={form.restaurantName}
                type="text"
                theme="primary"
                label="Restaurant Name"
                name="restaurantName"
                error={hasFieldError("restaurantName")}
                messageError="This name already exists"
                disabled={formLoading}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            )}
          </div>
          <MainButton
            title="Create Acccount"
            loading={formLoading}
            disabled={!isFormValid()}
            className="mt-8"
          />
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
