import { Kicker } from "./kicker";

export function SectionHead({
  kicker,
  title,
  description,
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`grid max-w-[640px] gap-4 ${className ?? ""}`}>
      <Kicker>{kicker}</Kicker>
      <h2 className="text-balance text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[48px]">
        {title}
      </h2>
      {description && <p className="text-pretty text-[17px] text-text-2">{description}</p>}
    </div>
  );
}
