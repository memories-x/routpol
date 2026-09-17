import { PageShell } from "@/components/ui/PageShell";
import { SmartLink } from "@/components/ui/SmartLink";
import { getEducationContent } from "@/content/education";
import { getLandingContent } from "@/content/landing";
import { isLocale, type Locale } from "@/lib/i18n";
import { btnPrimaryClassName } from "@/lib/ui-classes";
import { Check, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "pl" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "tr";
  const edu = getEducationContent(locale);
  const brand = getLandingContent(locale).brand.name;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: `${edu.meta.title} | ${brand}`,
    description: edu.meta.description,
    alternates: {
      languages: {
        tr: `${base}/tr/hizmetler/egitim`,
        pl: `${base}/pl/hizmetler/egitim`,
        en: `${base}/en/hizmetler/egitim`,
      },
    },
  };
}

export default async function EducationServicePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const edu = getEducationContent(locale);
  const who = Array.isArray(edu.who) ? edu.who : [];
  const pillars = Array.isArray(edu.pillars) ? edu.pillars : [];
  const deliverables = Array.isArray(edu.deliverables) ? edu.deliverables : [];
  const process = Array.isArray(edu.process) ? edu.process : [];
  const included = Array.isArray(edu.included) ? edu.included : [];
  const excluded = Array.isArray(edu.excluded) ? edu.excluded : [];

  return (
    <PageShell width="wide">
      <Link
        href={`/${locale}/hizmetler`}
        className="text-sm font-medium text-pt-emerald-600 hover:underline"
      >
        ← {edu.ctaBack}
      </Link>

      <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-pt-emerald-600">
        {edu.eyebrow}
      </p>
      <h1 className="mt-2 font-display text-3xl text-pt-navy-900 md:text-4xl">
        {edu.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-pt-slate-600">
        {edu.lead}
      </p>
      <p className="mt-4 max-w-3xl border-l-2 border-pt-emerald-600/40 pl-4 text-sm leading-relaxed text-pt-slate-600">
        {edu.positioning}
      </p>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-pt-navy-900">{edu.whoTitle}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {who.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-pt-border bg-pt-surface p-5 shadow-sm"
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
          {edu.pillarsTitle}
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
          {edu.deliverablesTitle}
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
          {edu.processTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-pt-slate-600">{edu.processIntro}</p>
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

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-pt-emerald-600/25 bg-pt-emerald-50/40 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-pt-emerald-700">
            {edu.includedTitle}
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
            {edu.excludedTitle}
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
          {edu.engagementTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pt-slate-600">
          {edu.engagementBody}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <SmartLink
            href={`/${locale}#iletisim`}
            className={`${btnPrimaryClassName} px-5 py-3`}
          >
            {edu.ctaConsult}
          </SmartLink>
          <Link
            href={`/${locale}/basvuru?paket=tek-yazi`}
            className="rounded-md border border-pt-border px-5 py-3 text-sm font-semibold text-pt-navy-800 hover:bg-pt-bg"
          >
            {edu.ctaLetter}
          </Link>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-pt-slate-500">
          {edu.disclaimer}
        </p>
      </section>
    </PageShell>
  );
}
