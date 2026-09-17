"use client";

import type { LandingContent } from "@/content/landing";
import { SmartLink } from "@/components/ui/SmartLink";
import { motion } from "framer-motion";

type Props = { content: LandingContent; locale: string };

/** Açık yüzey timeline — kart duvarı yok. */
export function LandingProcess({ content, locale }: Props) {
  const steps = Array.isArray(content.process.steps)
    ? content.process.steps
    : [];
  const consultSteps = Array.isArray(content.process.consultSteps)
    ? content.process.consultSteps
    : [];

  return (
    <section id="surec" className="scroll-mt-20 bg-pt-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-700">
          {content.process.eyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl text-pt-navy-900 md:text-4xl">
          {content.process.title}
        </h2>
        <p className="mt-4 max-w-2xl text-pt-slate-600">{content.process.intro}</p>

        <h3 className="mt-12 text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
          {content.process.paidPathTitle}
        </h3>
        <ol className="mt-8 grid gap-8 border-t border-pt-border pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="relative"
            >
              <span className="font-display text-2xl tabular-nums text-pt-emerald-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-semibold text-pt-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-14 border-t border-pt-border pt-10">
          <h3 className="font-display text-xl text-pt-navy-900">
            {content.process.consultPathTitle}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-pt-slate-600">
            {content.process.consultPathBody}
          </p>
          {consultSteps.length > 0 ? (
            <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {consultSteps.map((step, i) => (
                <li key={step.title}>
                  <span className="text-xs font-semibold tabular-nums text-pt-emerald-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-1 font-semibold text-pt-navy-900">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-pt-slate-600">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <SmartLink
              href={`/${locale}#iletisim`}
              className="inline-flex rounded-md bg-pt-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-pt-emerald-500"
            >
              {content.process.ctaConsult}
            </SmartLink>
            <SmartLink
              href={`/${locale}/hizmetler#paketler`}
              className="inline-flex rounded-md border border-pt-border bg-pt-surface px-5 py-2.5 text-sm font-semibold text-pt-navy-900 hover:bg-pt-bg"
            >
              {content.process.ctaPackage}
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
