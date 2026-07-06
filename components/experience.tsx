"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { experience } from "@/lib/content/experience";

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <section id="experience" className="py-[110px]">
      <div className="mx-auto max-w-[1140px] px-7">
        <SectionHead kicker="Experience" title="Professional history, in detail." className="mb-14" />
        <div className="grid gap-3.5">
          {experience.map((role) => {
            const open = openId === role.id;
            return (
              <div
                key={role.id}
                className={`overflow-hidden rounded-[18px] border bg-bg-card transition-colors ${
                  open ? "border-stroke" : "border-stroke-soft"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : role.id)}
                  className="grid w-full grid-cols-[1fr_auto_auto] items-center gap-5 p-[24px_28px] text-left"
                >
                  <span>
                    <span className="block text-[18px] font-semibold tracking-[-0.01em]">{role.title}</span>
                    <span className="mt-0.5 block font-mono text-[13px] text-text-2">{role.org}</span>
                  </span>
                  <span className="whitespace-nowrap font-mono text-[12.5px] text-text-3">{role.dates}</span>
                  <span
                    className={`grid h-[34px] w-[34px] flex-shrink-0 place-items-center rounded-full border transition-transform ${
                      open ? "rotate-180 border-accent text-accent" : "border-stroke text-text-2"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="grid gap-2.5 p-[0_28px_26px]">
                        {role.bullets.map((bullet) => (
                          <li key={bullet} className="relative pl-[22px] text-[15px] text-text-2">
                            <span className="absolute left-0 text-accent">▹</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
