import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-violet-950 h-screen relative text-white">
      <Image
        src="/img/top-decoration.svg"
        className="w-full bg-transparent -mt-[7rem] absolute"
        width={50}
        height={50}
        alt="image"
      />
      <nav className="flex justify-end pr-48 gap-8 font-[400] pt-12">
        <Link className="link" href="auth/signup">
          Sign Up
        </Link>
      </nav>

      <div className="flex gap-8 justify-center items-center mt-11 capitalize p-0 -mb-7">
        <nav className="font-[300] text-[12rem]">Table</nav>
        <nav className="font-[400] text-[12rem]">Picker</nav>
      </div>
      <article className="font-[100] text-lg tracking-widest leading-relaxed text-center">
        Simplify your dining experience with Table Picker. Reserve your table
        effortlessly <br /> and enjoy your meal stress-free!
      </article>
      <article className="flex justify-center items-center gap-3 font-[400] mt-10">
        <button className="border border-violet-600 rounded-lg py-1 px-4 tracking-widest hover:bg-violet-600">
          LOG IN
        </button>
        <button className="border bg-violet-600 border-violet-600 rounded-lg py-1 px-4 tracking-widest hover:bg-violet-700 hover:border-violet-700">
          MAKE RESERVATON
        </button>
      </article>
      <div className="flex justify-center">
        <Image
          src="/img/bottom-decoration.svg"
          className="fixed bottom-0"
          width={350}
          height={350}
          alt="image"
        />
      </div>
    </div>
  );
}
