"use client";

import type { LandingContent } from "@/content/landing";
import { SmartLink } from "@/components/ui/SmartLink";
import { btnPrimaryClassName } from "@/lib/ui-classes";
import { motion, useReducedMotion } from "framer-motion";

type Props = { content: LandingContent; locale: string };

/**
 * Mercury/Attio: editorial steps, not dense card grid.
 * Pitch: calm staggered rise. Clerk: one clear primary CTA.
 */
export function LandingProcess({ content, locale }: Props) {
  const reduce = useReducedMotion();
  const steps = Array.isArray(content.process.steps)
    ? content.process.steps
    : [];
  const consultSteps = Array.isArray(content.process.consultSteps)
    ? content.process.consultSteps
    : [];

  return (
    <section
      id="surec"
      className="scroll-mt-20 border-t border-pt-border bg-pt-surface py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-700">
          {content.process.eyebrow}
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-pt-navy-950 md:text-4xl">
          {content.process.title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pt-slate-600">
          {content.process.intro}
        </p>

        <h3 className="mt-16 text-xs font-semibold uppercase tracking-[0.14em] text-pt-slate-500">
          {content.process.paidPathTitle}
        </h3>

        <ol className="mt-10 space-y-0">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: reduce ? 0 : i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid gap-4 border-b border-pt-border py-6 last:border-0 sm:grid-cols-[3rem_1fr] sm:gap-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pt-emerald-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-pt-navy-950">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-pt-slate-600">
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-16 rounded-2xl bg-pt-emerald-50/60 px-6 py-8 md:px-10 md:py-10">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-pt-navy-950">
            {content.process.consultPathTitle}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pt-slate-600 md:text-base">
            {content.process.consultPathBody}
          </p>
          {consultSteps.length > 0 ? (
            <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {consultSteps.map((step, i) => (
                <li key={step.title}>
                  <span className="text-xs font-bold text-pt-emerald-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-2 font-semibold text-pt-navy-950">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-pt-slate-600">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <SmartLink
              href={`/${locale}#iletisim`}
              className={btnPrimaryClassName}
            >
              {content.process.ctaConsult}
            </SmartLink>
            <SmartLink
              href={`/${locale}/hizmetler#paketler`}
              className="text-sm font-semibold text-pt-navy-900 hover:text-pt-emerald-700"
            >
              {content.process.ctaPackage} →
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
