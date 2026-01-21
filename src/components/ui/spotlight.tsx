"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "#7B2D42" }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleMouseMove(event: MouseEvent) {
    if (!divRef.current) return;
    const { left, top } = divRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }

  useEffect(() => {
    if (!isMounted) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMounted]);

  const maskImage = useMotionTemplate`radial-gradient(350px at ${mouseX}px ${mouseY}px, white, transparent)`;

  if (!isMounted) {
    return null;
  }

  return (
    <div ref={divRef} className={cn("relative", className)}>
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${fill}15, transparent 40%)`,
        }}
      />
      <svg
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full opacity-20",
          className
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="spotlight-gradient" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor={fill} stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="50%"
          cy="0"
          rx="80%"
          ry="300"
          fill="url(#spotlight-gradient)"
        />
      </svg>
    </div>
  );
}
