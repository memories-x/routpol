"use client";

import type { LandingContent } from "@/content/landing";
import { motion, useReducedMotion } from "framer-motion";

type Props = { content: LandingContent };

/**
 * Attio/Mercury rhythm: one scene, open breath — not a card wall.
 * Pitch: soft rise on scroll.
 */
export function LandingBridge({ content }: Props) {
  const reduce = useReducedMotion();
  const B = content.bridge;
  const lanes = Array.isArray(B.lanes) ? B.lanes : [];

  return (
    <section
      id="ne-yapiyoruz"
      className="scroll-mt-20 border-b border-pt-border bg-pt-bg py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-700">
          {B.eyebrow}
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-pt-navy-950 md:text-4xl">
          {B.title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pt-slate-600">
          {B.intro}
        </p>

        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-4 hidden h-px bg-pt-emerald-200/80 md:block"
            aria-hidden
          />
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {lanes.map((lane, i) => (
              <motion.div
                key={lane.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  delay: reduce ? 0 : i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-pt-emerald-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-5 font-display text-xl font-semibold tracking-tight text-pt-navy-950">
                  {lane.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-pt-slate-600">
                  {lane.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-14 max-w-2xl text-sm leading-relaxed text-pt-slate-500">
          {B.lawyerNote}
        </p>
      </div>
    </section>
  );
}
