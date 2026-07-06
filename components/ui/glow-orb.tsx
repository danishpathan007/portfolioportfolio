export function GlowOrb({
  size,
  color = "accent",
  className,
}: {
  size: number;
  color?: "accent" | "accent-2";
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 rounded-full blur-[110px] ${
        color === "accent-2" ? "bg-accent-2" : "bg-accent"
      } ${className ?? ""}`}
      style={{ width: size, height: size }}
    />
  );
}
