import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getContent } from "@/content";
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
  const content = getContent(locale);
  const showLocaleSoon =
    locale !== "tr" && !content.system.contentComplete;

  return (
    <>
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
      {showLocaleSoon && content.system.localeSoon ? (
        <p className="border-b border-pt-border bg-pt-bg px-4 py-2 text-center text-sm text-pt-slate-600">
          {content.system.localeSoon}
        </p>
      ) : null}
      <Header locale={locale} content={content} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} content={content} />
    </>
  );
}
