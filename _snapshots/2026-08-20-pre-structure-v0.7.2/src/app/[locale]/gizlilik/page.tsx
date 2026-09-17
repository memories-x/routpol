import { getContent } from "@/content";
import { getPublicEnv } from "@/lib/env";
import { isLocale } from "@/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const content = getContent(isLocale(raw) ? raw : "tr");
  return { title: `${content.privacyPage.title} | ${content.brand.name}` };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const content = getContent(raw);
  const env = getPublicEnv();

  const controllerLines = [
    env.operatorLegalName,
    env.operatorNip ? `NIP: ${env.operatorNip}` : null,
    env.operatorAddress,
    env.contactEmail,
  ].filter(Boolean);

  return (
    <article className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="font-display text-3xl text-pt-navy-900">{content.privacyPage.title}</h1>
      <p className="mt-6 leading-relaxed text-pt-slate-600">
        {content.privacyPage.body}
      </p>
      {Array.isArray(content.privacyPage.sections) &&
      content.privacyPage.sections.length > 0 ? (
        <div className="mt-10 space-y-8">
          {content.privacyPage.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-normal text-pt-aws-ink">
                {section.title}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-3 text-pt-slate-600">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      ) : null}
      {controllerLines.length > 0 ? (
        <div className="mt-8 rounded-xl border border-pt-border bg-pt-surface px-4 py-4 text-sm text-pt-slate-600 shadow-sm">
          <p className="font-medium text-pt-aws-ink">
            {raw === "pl"
              ? "Administrator danych"
              : raw === "en"
                ? "Data controller"
                : "Veri sorumlusu"}
          </p>
          <ul className="mt-2 space-y-1">
            {controllerLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <Link
        href={`/${raw}`}
        className="mt-8 inline-block text-pt-emerald-600 hover:underline"
      >
        ← {content.brand.name}
      </Link>
    </article>
  );
}
