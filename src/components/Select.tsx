"use client";
import { ChangeEvent, ChangeEventHandler, SyntheticEvent } from "react";

interface SelectProps {
  value: string;
  options: Array<{ label: string; value: string }>;
  theme: "primary" | "secondary";
  label: string;
  name: string;
  error?: boolean;
  messageError?: string;
  disabled?: boolean;
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  value,
  options,
  theme = "primary",
  label,
  name,
  error,
  onSelect,
  messageError,
  disabled,
}: SelectProps) {
  return (
    <div>
      <div
        className={`flex flex-col rounded-xl px-3 py-1 border-[1px] focus-within:border-violet-600 hover:border-violet-600 ${theme === "primary" ? "bg-violet-600 bg-opacity-[29%] border-transparent text-white" : "bg-zinc-50 border-zinc-300 text-violet-900"}`}
      >
        <label htmlFor={name} className="text-xs">
          {label}
        </label>
        <select
          value={value}
          onChange={(e) => onSelect(e)}
          name={name}
          disabled={disabled}
          id={name}
          className="outline-none bg-transparent"
        >
          {options.map((item) => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className="text-xs px-3 text-rose-500 tracking-wide mt-1">
          {messageError}
        </div>
      )}
    </div>
  );
}
