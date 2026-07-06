export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[12.5px] uppercase tracking-[0.18em] text-accent">
      <span className="h-px w-7 bg-accent/70" />
      {children}
    </div>
  );
}
