"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { ProjectPlaceholderArt } from "@/components/ui/project-placeholder-art";
import type { ProjectItem } from "@/lib/content/projects";

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="grid overflow-hidden rounded-[22px] border border-stroke-soft bg-bg-card transition-colors hover:border-accent/32 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="relative flex h-[300px] items-end justify-center overflow-hidden border-b border-stroke-soft bg-[radial-gradient(120%_100%_at_50%_0%,rgba(34,211,238,0.14),transparent_60%),#0a0c12] px-[34px] pt-[34px]">
        <motion.div whileHover={{ y: -12 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}>
          <PhoneFrame>
            {project.image ? (
              <Image src={project.image} alt={`${project.name} screenshot`} fill className="object-cover" />
            ) : (
              <ProjectPlaceholderArt name={project.name} />
            )}
          </PhoneFrame>
        </motion.div>
      </div>
      <div className="grid gap-3 p-[26px_30px_30px]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[21px] font-semibold tracking-[-0.01em]">{project.name}</h3>
          <span className="whitespace-nowrap font-mono text-[11.5px] text-text-3">{project.date}</span>
        </div>
        <p className="text-pretty text-[15px] text-text-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11.5px] text-accent">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex items-baseline gap-2 text-[14px] text-text-2">
          <span className="font-mono text-accent">→</span>
          {project.outcome}
        </div>
      </div>
    </motion.article>
  );
}
