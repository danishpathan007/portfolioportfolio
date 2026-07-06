import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { achievements } from "@/lib/content/achievements";

export function Achievements() {
  return (
    <section id="achievements" className="py-[110px]">
      <div className="mx-auto max-w-[1140px] px-7">
        <SectionHead kicker="Achievements" title="Recognition along the way." className="mb-14" />
        <RevealGroup className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((group) => {
            const Icon = group.icon;
            return (
              <RevealItem
                key={group.title}
                className="grid gap-3.5 rounded-[18px] border border-stroke-soft bg-bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/28"
              >
                <h3 className="flex items-center gap-3 text-[17px] font-semibold">
                  <span className="grid h-[38px] w-[38px] flex-shrink-0 place-items-center rounded-[11px] bg-accent-soft text-accent">
                    <Icon size={18} />
                  </span>
                  {group.title}
                </h3>
                <ul className="grid gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="relative pl-5 text-[14.5px] text-text-2">
                      <span className="absolute left-0 font-mono text-xs text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
