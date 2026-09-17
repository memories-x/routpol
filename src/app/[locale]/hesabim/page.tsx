import { CustomerPortalApp } from "@/components/customer/CustomerPortalApp";
import { PageShell } from "@/components/ui/PageShell";
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
  const title =
    locale === "pl"
      ? "Wasze konto"
      : locale === "en"
        ? "Your account"
        : "Hesabınız";
  return {
    title: `${title} | ROUTEPOL`,
    robots: { index: false, follow: false },
  };
}

export default async function HesabimPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <PageShell width="default" variant="muted">
      <Link
        href={`/${locale}`}
        className="text-sm font-medium text-pt-emerald-600 hover:underline"
      >
        ← {locale === "pl" ? "Strona główna" : locale === "en" ? "Home" : "Ana sayfa"}
      </Link>
      <div className="mt-8">
        <Suspense fallback={<p className="text-pt-slate-600">…</p>}>
          <CustomerPortalApp locale={locale} />
        </Suspense>
      </div>
    </PageShell>
  );
}
