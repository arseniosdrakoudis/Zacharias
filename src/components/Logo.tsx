import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 140, height = 50, className }: LogoProps) {
  return (
    <Image
      src="/logo-hotizontal.png"
      alt="Zacharias - Watches & Jewellery"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  );
}
