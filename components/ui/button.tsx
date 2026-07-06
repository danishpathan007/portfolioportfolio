import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center gap-2.5 rounded-full text-[15.5px] font-semibold transition-all hover:-translate-y-0.5";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 text-bg shadow-[0_4px_28px_rgba(34,211,238,0.35)] hover:shadow-[0_8px_36px_rgba(34,211,238,0.5)]",
  ghost:
    "border border-stroke bg-white/4 px-7 py-3.5 text-text backdrop-blur-sm hover:bg-white/8",
};

export function Button({ href, children, variant = "primary", external, className }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className ?? ""}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
