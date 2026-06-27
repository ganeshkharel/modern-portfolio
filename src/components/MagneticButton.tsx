"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className
}: MagneticButtonProps) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const commonProps = {
    className: cn("magnetic-button", variant === "secondary" && "secondary", className),
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      if (!href?.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    },
    onMouseMove: (event: React.MouseEvent<HTMLElement>) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
      y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
    },
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
    style: { x, y }
  };

  if (href) {
    return (
      <motion.a href={href} {...commonProps}>
        <span>{children}</span>
        <ArrowUpRight size={18} />
      </motion.a>
    );
  }

  return (
    <motion.button {...commonProps}>
      <span>{children}</span>
      <ArrowUpRight size={18} />
    </motion.button>
  );
}
