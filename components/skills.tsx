import { SectionHead } from "@/components/ui/section-head";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { skills } from "@/lib/content/skills";

export function Skills() {
  return (
    <section id="skills" className="py-[110px]">
      <div className="mx-auto max-w-[1140px] px-7">
        <SectionHead
          kicker="Skills & Expertise"
          title="A full mobile toolkit, native and cross-platform."
          className="mb-14"
        />
        <RevealGroup className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <RevealItem
                key={skill.title}
                className="group relative grid gap-3 overflow-hidden rounded-[18px] border border-stroke-soft bg-bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/30 hover:bg-white/4"
              >
                <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="grid h-[46px] w-[46px] place-items-center rounded-[13px] border border-accent/22 bg-accent-soft text-accent">
                  <Icon size={22} />
                </div>
                <h3 className="text-[18.5px] font-semibold">{skill.title}</h3>
                <p className="text-pretty text-[14.5px] text-text-2">{skill.description}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stroke px-2.5 py-1 font-mono text-[11.5px] text-text-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
