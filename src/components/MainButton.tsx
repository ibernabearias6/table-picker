import Image from "next/image";

interface Props {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  method?: () => void;
  type?: "submit" | "button" | "reset";
  className?: string;
}

export default function MainButton({
  title,
  loading,
  method,
  disabled,
  className,
  type = "submit",
}: Props) {
  return (
    <button
      type={type}
      className={`bg-violet-600 flex justify-center items-center rounded-2xl p-2 w-[250px] text-white disabled:opacity-60 ${className}`}
      disabled={disabled || loading}
      onClick={method}
    >
      {loading ? (
        <Image
          src="/icons/loading.svg"
          className="bg-transparent object-cover"
          width={25}
          height={25}
          alt="image"
        />
      ) : (
        title
      )}
    </button>
  );
}
