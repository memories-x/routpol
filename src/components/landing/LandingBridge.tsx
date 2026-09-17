"use client";

import { PtReveal, ptEase } from "@/components/ui/PtReveal";
import { SmartLink } from "@/components/ui/SmartLink";
import type { LandingContent } from "@/content/landing";
import { motion, useReducedMotion } from "framer-motion";

type Props = { content: LandingContent; locale: string };

function resolveHref(locale: string, href: string): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

/**
 * Attio/Mercury rhythm + Stripe scroll craft.
 * Soft rise on scroll — not a card wall.
 * serviceLine = ayrı ticaret hattı (hero’dan taşındı).
 */
export function LandingBridge({ content, locale }: Props) {
  const reduce = useReducedMotion();
  const B = content.bridge;
  const lanes = Array.isArray(B.lanes) ? B.lanes : [];
  const serviceLine = B.serviceLine;
  const serviceHref = serviceLine
    ? resolveHref(locale, serviceLine.href)
    : "";

  return (
    <section
      id="ne-yapiyoruz"
      className="scroll-mt-20 border-b border-pt-border bg-pt-bg py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PtReveal className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-700">
            {B.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-pt-navy-950 md:text-4xl">
            {B.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pt-slate-600">
            {B.intro}
          </p>
        </PtReveal>

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
                  duration: 0.5,
                  delay: reduce ? 0 : i * 0.08,
                  ease: ptEase,
                }}
              >
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-pt-emerald-600 text-xs font-bold text-white shadow-[0_8px_16px_-8px_rgba(5,150,105,0.7)]">
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

        <PtReveal delay={0.12} className="mt-14 max-w-2xl space-y-4">
          <p className="text-sm leading-relaxed text-pt-slate-500">
            {B.lawyerNote}
          </p>
          {serviceLine ? (
            <p className="text-sm leading-relaxed text-pt-slate-600">
              <span className="font-semibold text-pt-navy-950">
                {serviceLine.title}.{" "}
              </span>
              {serviceLine.body}{" "}
              <SmartLink
                href={serviceHref}
                className="font-semibold text-pt-emerald-700 transition-colors hover:text-pt-emerald-600"
              >
                {serviceLine.ctaLabel} →
              </SmartLink>
            </p>
          ) : null}
        </PtReveal>
      </div>
    </section>
  );
}
