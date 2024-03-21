import Image from "next/image";
import Link from "next/link";

interface NavProps {
  theme?: "main" | "secondary";
  children: React.ReactNode;
}
export default function NavBar({ theme = "main", children }: NavProps) {
  return (
    <div
      className={`flex items-center bg-violet-950 justify-between px-10 text-white ${theme === "main" ? "py-10" : "py-3"}`}
    >
      <div className="flex gap-3">
        <Image src="/icons/favicon.png" width={35} height={35} alt="image" />
        <div className="flex gap-1 items-center capitalize">
          <nav className="font-[300] text-[1.3em]">Table</nav>
          <nav className="font-[400] text-[1.3em]">Picker</nav>
        </div>
      </div>
      <div className="flex w-[70%] font-[400] gap-16">{children}</div>
    </div>
  );
}
