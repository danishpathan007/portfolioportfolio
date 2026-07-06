export function ProjectPlaceholderArt({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent-soft to-white/[0.02]">
      <div className="grid place-items-center gap-3">
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-accent/25 bg-accent-soft font-mono text-xl text-accent">
          {initials}
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">
          Screenshot coming soon
        </span>
      </div>
    </div>
  );
}
