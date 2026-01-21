import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: "reversed" | "normal";
}

export function Logo({ width = 140, height = 50, className, variant = "normal" }: LogoProps) {
  const logoSrc = variant === "reversed" 
    ? "/logo-horizontal-reversed.png" 
    : "/logo-horizontal-normal.png";

  return (
    <Image
      src={logoSrc}
      alt="Zacharias - Watches & Jewellery"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  );
}
