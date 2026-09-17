import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { DocumentLang } from "@/components/layout/DocumentLang";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { getContent } from "@/content";
import { getLandingContent } from "@/content/landing";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const content = getLandingContent(locale);
  const site = getContent(locale);

  return (
    <>
      <DocumentLang locale={locale} />
      <a
        href="#main-content"
        className="sr-only-focusable fixed left-4 top-4 z-50 rounded-md bg-pt-emerald-600 px-4 py-2 text-sm font-medium text-white"
      >
        {locale === "pl"
          ? "Przejdź do treści"
          : locale === "en"
            ? "Skip to content"
            : "İçeriğe atla"}
      </a>
      <LandingHeader locale={locale} content={content} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <LandingFooter locale={locale} content={content} />
      <WhatsAppFab content={site} locale={locale} />
    </>
  );
}
