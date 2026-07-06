"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SectionHead } from "@/components/ui/section-head";
import { GlowOrb } from "@/components/ui/glow-orb";
import { journey } from "@/lib/content/journey";

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative overflow-hidden border-y border-stroke-soft bg-bg-elev py-[110px]">
      <GlowOrb size={500} color="accent-2" className="right-[-200px] top-[10%] opacity-[0.06]" />
      <div className="relative mx-auto max-w-[1140px] px-7">
        <SectionHead
          kicker="My Journey"
          title="From college labs to production apps."
          description="Every milestone built on the last — a steady climb from BCA classrooms to architecting iOS and Flutter applications used in the real world."
          className="mb-14"
        />

        <div ref={containerRef} className="relative z-[1]">
          <div className="absolute bottom-1.5 left-[19px] top-1.5 w-0.5 bg-gradient-to-b from-transparent via-stroke to-transparent" />
          <motion.div
            style={{ height: reduce ? "100%" : fillHeight }}
            className="absolute left-[19px] top-1.5 w-0.5 bg-gradient-to-b from-accent to-accent-2 shadow-[0_0_14px_rgba(34,211,238,0.5)]"
          />
          <div className="grid gap-0">
            {journey.map((item) => (
              <div key={item.id} className="relative pb-[52px] pl-[72px] last:pb-0">
                <div className="absolute left-2 top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-stroke bg-bg-elev">
                  <span className="h-2 w-2 rounded-full bg-text-3" />
                </div>
                <div className="font-mono text-[12.5px] uppercase tracking-[0.12em] text-accent">
                  {item.dateRange}
                </div>
                <div
                  className={`mt-2.5 max-w-[720px] rounded-[18px] border border-stroke-soft p-[26px_30px] transition-all hover:translate-x-1 hover:border-stroke hover:bg-white/[0.045] ${
                    item.current
                      ? "border-accent/35 bg-gradient-to-br from-accent-soft to-white/[0.02]"
                      : "bg-bg-card"
                  }`}
                >
                  <h3 className="text-[20px] font-semibold tracking-[-0.01em]">{item.title}</h3>
                  {item.org && <div className="mt-0.5 font-mono text-[14.5px] text-text-2">{item.org}</div>}
                  <p className="mt-3 text-pretty text-[15.5px] text-text-2">{item.description}</p>
                  {item.badge && (
                    <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 font-mono text-[11.5px] uppercase tracking-[0.1em] text-accent">
                      ★ {item.badge}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
