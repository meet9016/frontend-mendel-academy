import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Spinner */}
        <div className="absolute h-28 w-28 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />

        {/* Logo */}
        <Image
          src="/images/logo.svg" // put your logo in public/logo.png
          alt="Loading"
          width={64}
          height={64}
          className="z-10"
        />
      </div>
    </div>
  );
}
