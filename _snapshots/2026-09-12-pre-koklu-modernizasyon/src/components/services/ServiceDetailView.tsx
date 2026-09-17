import type { ServiceDetailContent } from "@/content/service-detail-types";
import { SmartLink } from "@/components/ui/SmartLink";
import { btnPrimaryClassName } from "@/lib/ui-classes";
import { Check, X } from "lucide-react";
import Link from "next/link";

type Props = {
  locale: string;
  content: ServiceDetailContent;
};

export function ServiceDetailView({ locale, content }: Props) {
  const who = Array.isArray(content.who) ? content.who : [];
  const workstreams = Array.isArray(content.workstreams)
    ? content.workstreams
    : [];
  const pillars = Array.isArray(content.pillars) ? content.pillars : [];
  const deliverables = Array.isArray(content.deliverables)
    ? content.deliverables
    : [];
  const process = Array.isArray(content.process) ? content.process : [];
  const packages = Array.isArray(content.packages) ? content.packages : [];
  const included = Array.isArray(content.included) ? content.included : [];
  const excluded = Array.isArray(content.excluded) ? content.excluded : [];

  return (
    <>
      <Link
        href={`/${locale}/hizmetler`}
        className="text-sm font-medium text-pt-emerald-600 hover:underline"
      >
        ← {content.ctaBack}
      </Link>

      <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
        {content.eyebrow}
      </p>
      <h1 className="mt-2 font-display text-3xl text-pt-navy-900 md:text-4xl">
        {content.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-pt-slate-600">
        {content.lead}
      </p>
      <p className="mt-4 max-w-3xl border-l-2 border-pt-emerald-600/40 pl-4 text-sm leading-relaxed text-pt-slate-600">
        {content.positioning}
      </p>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-pt-navy-900">
          {content.whoTitle}
        </h2>
        <div
          className={`mt-8 grid gap-5 ${
            who.length > 3
              ? "md:grid-cols-2 lg:grid-cols-4"
              : who.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3"
          }`}
        >
          {who.map((item) => (
            <article
              key={item.title}
              id={item.id}
              className="scroll-mt-24 rounded-xl border border-pt-border bg-pt-surface p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-pt-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {workstreams.length > 0 && content.workstreamsTitle ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl text-pt-navy-900">
            {content.workstreamsTitle}
          </h2>
          {content.workstreamsIntro ? (
            <p className="mt-3 max-w-3xl text-pt-slate-600">
              {content.workstreamsIntro}
            </p>
          ) : null}
          <div className="mt-8 space-y-6">
            {workstreams.map((stream) => {
              const items = Array.isArray(stream.items) ? stream.items : [];
              return (
                <article
                  key={stream.title}
                  className="rounded-xl border border-pt-border bg-pt-surface p-5 md:p-6"
                >
                  <h3 className="text-base font-semibold text-pt-navy-900">
                    {stream.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                    {stream.body}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {items.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-sm text-pt-slate-700"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-pt-emerald-600"
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-14">
        <h2 className="font-display text-2xl text-pt-navy-900">
          {content.pillarsTitle}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pillars.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-pt-border bg-pt-bg p-5"
            >
              <h3 className="text-base font-semibold text-pt-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-pt-navy-900">
          {content.deliverablesTitle}
        </h2>
        <ul className="mt-6 space-y-3">
          {deliverables.map((line) => (
            <li key={line} className="flex gap-3 text-sm text-pt-slate-700">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-pt-emerald-600"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-pt-navy-900">
          {content.processTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-pt-slate-600">
          {content.processIntro}
        </p>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-pt-border bg-pt-surface p-5"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-pt-navy-900 text-xs font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-pt-navy-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-pt-slate-600">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-pt-navy-900">
          {content.packagesTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-pt-slate-600">
          {content.packagesIntro}
        </p>
        <ul className="mt-8 space-y-4">
          {packages.map((pkg) => (
            <li
              key={pkg.slug}
              className="rounded-xl border border-pt-border bg-pt-surface px-5 py-4 shadow-sm md:flex md:items-center md:justify-between md:gap-6"
            >
              <div>
                <p className="font-semibold text-pt-navy-900">{pkg.title}</p>
                <p className="mt-1 text-sm text-pt-slate-600">{pkg.role}</p>
              </div>
              <Link
                href={`/${locale}${pkg.href}`}
                className="mt-3 inline-block shrink-0 text-sm font-semibold text-pt-emerald-700 hover:underline md:mt-0"
              >
                {locale === "pl"
                  ? "Szczegóły →"
                  : locale === "en"
                    ? "Details →"
                    : "Detay →"}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-pt-emerald-600/25 bg-pt-emerald-50/40 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-700">
            {content.includedTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {included.map((line) => (
              <li key={line} className="flex gap-3 text-sm text-pt-slate-700">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-pt-emerald-600"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-pt-border bg-pt-bg p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-slate-500">
            {content.excludedTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {excluded.map((line) => (
              <li key={line} className="flex gap-3 text-sm text-pt-slate-600">
                <X
                  className="mt-0.5 h-4 w-4 shrink-0 text-pt-slate-400"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14 rounded-xl border border-pt-border bg-pt-surface p-6 md:p-8">
        <h2 className="font-display text-xl text-pt-navy-900">
          {content.engagementTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pt-slate-600">
          {content.engagementBody}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <SmartLink
            href={`/${locale}#iletisim`}
            className={`${btnPrimaryClassName} px-5 py-3`}
          >
            {content.ctaConsult}
          </SmartLink>
          <SmartLink
            href={`/${locale}${content.ctaPrimaryPackage.href}`}
            className="rounded-md border border-pt-border px-5 py-3 text-sm font-semibold text-pt-navy-800 hover:bg-pt-bg"
          >
            {content.ctaPrimaryPackage.label}
          </SmartLink>
          {content.ctaSecondaryPackage ? (
            <SmartLink
              href={`/${locale}${content.ctaSecondaryPackage.href}`}
              className="rounded-md border border-pt-border px-5 py-3 text-sm font-semibold text-pt-navy-800 hover:bg-pt-bg"
            >
              {content.ctaSecondaryPackage.label}
            </SmartLink>
          ) : null}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-pt-slate-500">
          {content.disclaimer}
        </p>
      </section>
    </>
  );
}
