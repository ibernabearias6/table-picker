"use client";

import { ChangeEvent } from "react";

interface InputProps {
  type: "text" | "number" | "email" | "password" | "date" | "time";
  theme?: "primary" | "secondary";
  label: string;
  value: string | number;
  name: string;
  placeholder: string;
  error?: boolean;
  messageError?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  theme = "primary",
  label,
  value,
  name,
  placeholder,
  error,
  messageError,
  disabled,
  onChange,
}: InputProps) {
  return (
    <div>
      <div
        className={`flex flex-col rounded-xl px-3 py-1 border-[1px] focus-within:border-violet-600 hover:border-violet-600 ${theme === "primary" ? "bg-violet-600 bg-opacity-[29%] border-transparent text-white" : "bg-zinc-50 border-zinc-300 text-violet-900"}`}
      >
        <label htmlFor={name} className="text-xs">
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="outline-none bg-transparent"
        />
      </div>
      {error && (
        <div className="text-xs px-3 text-rose-500 tracking-wide mt-1">
          {messageError}
        </div>
      )}
    </div>
  );
}
