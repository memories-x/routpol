"use client";

import type { LandingContent } from "@/content/landing";
import { SmartLink } from "@/components/ui/SmartLink";
import { btnPrimaryClassName, btnSecondaryClassName } from "@/lib/ui-classes";
import { motion } from "framer-motion";

type Props = { content: LandingContent; locale: string };

/** Wise-like transfer steps — connected circles + soft cards. */
export function LandingProcess({ content, locale }: Props) {
  const steps = Array.isArray(content.process.steps)
    ? content.process.steps
    : [];
  const consultSteps = Array.isArray(content.process.consultSteps)
    ? content.process.consultSteps
    : [];

  return (
    <section id="surec" className="scroll-mt-20 bg-pt-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pt-emerald-700">
          {content.process.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-pt-navy-950 md:text-4xl">
          {content.process.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-pt-slate-600">
          {content.process.intro}
        </p>

        <h3 className="mt-14 text-xs font-semibold uppercase tracking-[0.14em] text-pt-slate-500">
          {content.process.paidPathTitle}
        </h3>

        <ol className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-0.5 bg-pt-emerald-100 lg:block"
            aria-hidden
          />
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="relative rounded-2xl border border-pt-border bg-pt-bg/80 p-5"
            >
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-pt-emerald-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-pt-navy-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-16 rounded-2xl border border-pt-border bg-pt-emerald-50/50 p-6 md:p-8">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-pt-navy-950">
            {content.process.consultPathTitle}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-pt-slate-600 md:text-base">
            {content.process.consultPathBody}
          </p>
          {consultSteps.length > 0 ? (
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {consultSteps.map((step, i) => (
                <li key={step.title}>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-pt-surface text-xs font-bold text-pt-emerald-700 ring-1 ring-pt-emerald-200">
                    {i + 1}
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
          <div className="mt-8 flex flex-wrap gap-3">
            <SmartLink
              href={`/${locale}#iletisim`}
              className={btnPrimaryClassName}
            >
              {content.process.ctaConsult}
            </SmartLink>
            <SmartLink
              href={`/${locale}/hizmetler#paketler`}
              className={btnSecondaryClassName}
            >
              {content.process.ctaPackage}
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
