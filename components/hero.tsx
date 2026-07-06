"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/ui/glow-orb";
import { FlutterIcon, SwiftIcon, SupabaseIcon } from "@/components/ui/brand-icons";
import { site } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

const STATS = [
  { value: 7, suffix: "+", label: "Years experience" },
  { value: 7, suffix: "", label: "Apps shipped recently" },
  { value: 5, suffix: "", label: "Certifications" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = String(to);
      return;
    }
    const controls = animate(count, to, {
      duration: 1.2,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = String(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [inView, to, reduce, count]);

  return <span ref={ref}>0</span>;
}

function FloatingChip({
  icon,
  label,
  className,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  className: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -9, 0] }}
      transition={{ duration: 5.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute z-[3] flex items-center gap-2 whitespace-nowrap rounded-xl border border-stroke bg-[rgba(13,15,21,0.85)] px-4 py-2.5 font-mono text-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-md ${className}`}
    >
      {icon}
      {label}
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <header id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-[140px]">
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[length:56px_56px] bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black_30%,transparent_75%)]"
      />
      <GlowOrb size={560} color="accent" className="-right-[120px] -top-[180px] opacity-[0.11]" />
      <GlowOrb size={480} color="accent-2" className="-bottom-[200px] -left-[140px] opacity-[0.09]" />

      <div className="relative z-[2] mx-auto grid w-full max-w-[1140px] grid-cols-1 items-center gap-16 px-7 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <motion.div
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-stroke bg-white/3 px-4 py-1.5 font-mono text-[12.5px] text-text-2"
          >
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-emerald-400" />
            Available for new projects
          </motion.div>

          <motion.h1
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-[46px] font-bold leading-[1.02] tracking-[-0.03em] sm:text-[62px] lg:text-[84px]"
          >
            Danish Khan
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              builds mobile apps
            </span>
            <br />
            people love.
          </motion.h1>

          <motion.div
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 mt-4 font-mono text-[15px] text-text-2 sm:text-[19px]"
          >
            Mobile App Developer — iOS · Swift · SwiftUI · Flutter
            <span className="ml-1 inline-block h-[1.1em] w-[9px] animate-[blink_1.1s_step-end_infinite] bg-accent align-text-bottom" />
          </motion.div>

          <motion.p
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-[540px] text-[18px] text-text-2"
          >
            7+ years crafting scalable, performance-driven iOS and cross-platform applications
            — from first internship commit to shipping production apps powered by Swift,
            Flutter, and Supabase.
          </motion.p>

          <motion.div
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <Button href="#projects" variant="primary">
              View Projects <span>→</span>
            </Button>
            <Button href="#contact" variant="ghost">
              Contact Me
            </Button>
            <Button href={site.resumePath} variant="ghost" external>
              Resume
            </Button>
          </motion.div>

          <motion.div
            initial={reduce ? "show" : "hidden"}
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-14 flex flex-wrap gap-9"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="grid gap-0.5">
                <b className="text-[30px] font-bold tabular-nums tracking-[-0.02em]">
                  <Counter to={stat.value} />
                  <em className="not-italic text-accent">{stat.suffix}</em>
                </b>
                <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-text-3">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative grid justify-items-center pl-[24px] lg:justify-items-stretch lg:pl-[52px]"
        >
          <div className="relative rounded-[28px] border border-stroke bg-gradient-to-br from-white/7 to-white/[0.015] p-3.5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <Image
              src="/images/portrait.webp"
              alt="Portrait of Danish Khan"
              width={280}
              height={340}
              priority
              className="rounded-[18px] object-cover"
            />
            <FloatingChip icon={<FlutterIcon />} label="Flutter" className="left-[-52px] top-[26px]" delay={0} />
            <FloatingChip icon={<SwiftIcon />} label="SwiftUI" className="bottom-[70px] right-[-44px]" delay={0.8} />
            <FloatingChip icon={<SupabaseIcon />} label="Supabase" className="bottom-[-16px] left-[-20px]" delay={1.6} />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
