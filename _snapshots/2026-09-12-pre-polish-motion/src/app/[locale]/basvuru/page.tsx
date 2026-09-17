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
    <PageShell width="narrow">
      <Link
        href={`/${locale}/hizmetler#paketler`}
        className="text-sm font-medium text-pt-emerald-600 hover:underline"
      >
        ← {content.services.detailBack}
      </Link>
      <div className="mt-8">
        <CustomerLoginBanner locale={locale} />
        <Suspense fallback={<p className="text-pt-slate-600">…</p>}>
          <OrderForm locale={locale} />
        </Suspense>
      </div>
    </PageShell>
  );
}
