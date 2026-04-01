import Image from "next/image";

export default function F1Logo({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/f1-logo.png"
      alt="F1 Logo"
      width={size}
      height={size}
      className="flex-shrink-0"
    />
  );
}
