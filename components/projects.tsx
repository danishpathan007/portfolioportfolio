import { SectionHead } from "@/components/ui/section-head";
import { GlowOrb } from "@/components/ui/glow-orb";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/content/projects";

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden border-y border-stroke-soft bg-bg-elev py-[110px]">
      <GlowOrb size={600} color="accent" className="left-[-250px] top-0 opacity-[0.05]" />
      <div className="relative mx-auto max-w-[1140px] px-7">
        <SectionHead
          kicker="Featured Projects"
          title="Recent work, shipped and in the wild."
          description="A selection of production apps shipped across native iOS and cross-platform Flutter."
          className="mb-14"
        />
        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
