import { OrderForm } from "@/components/cases/OrderForm";
import { CustomerLoginBanner } from "@/components/customer/CustomerLoginBanner";
import { PageShell } from "@/components/ui/PageShell";
import { getContent } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
  const content = getContent(locale);
  const title =
    locale === "pl"
      ? `Wniosek | ${content.brand.name}`
      : locale === "en"
        ? `Apply | ${content.brand.name}`
        : `Başvuru | ${content.brand.name}`;
  return { title };
}

export default async function BasvuruPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = getContent(locale);

  return (
    <PageShell width="form" variant="muted" className="md:py-20">
      <Link
        href={`/${locale}/hizmetler#paketler`}
        className="inline-flex text-sm font-medium text-pt-emerald-700 transition-colors hover:text-pt-emerald-600"
      >
        ← {content.services.detailBack}
      </Link>
      <div className="mt-8 rounded-3xl border border-pt-border/70 bg-pt-surface p-5 shadow-[0_24px_64px_-40px_rgba(15,23,42,0.35)] sm:p-8 md:p-10">
        <CustomerLoginBanner locale={locale} />
        <Suspense fallback={<p className="text-pt-slate-600">…</p>}>
          <OrderForm locale={locale} />
        </Suspense>
      </div>
    </PageShell>
  );
}
