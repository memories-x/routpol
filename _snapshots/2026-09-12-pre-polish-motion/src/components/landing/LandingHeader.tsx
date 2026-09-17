"use client";

import type { LandingContent } from "@/content/landing";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { swapLocalePath } from "@/lib/locale-path";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  locale: Locale;
  content: LandingContent;
};

function navHref(locale: string, href: string): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

export function LandingHeader({ locale, content }: Props) {
  const nav = Array.isArray(content.nav) ? content.nav : [];
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-30 border-b border-pt-border bg-pt-surface/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={`/${locale}`} className="relative z-10 min-w-0 shrink">
          <BrandLockup name={content.brand.name} priority />
        </Link>

        <nav
          className="relative z-20 hidden min-w-0 items-center gap-4 text-sm font-medium text-pt-navy-800 lg:flex"
          aria-label="Main"
        >
          {nav.map((item) => (
              <a
                key={item.id}
                href={navHref(locale, item.href)}
                className="hover:text-pt-emerald-700"
              >
                {item.label}
              </a>
            ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex gap-0.5 text-xs font-medium uppercase text-pt-slate-500">
            {locales.map((code) => (
              <Link
                key={code}
                href={swapLocalePath(pathname, code)}
                className={
                  code === locale
                    ? "rounded-md bg-pt-navy-900 px-2 py-1 text-white"
                    : "rounded-md px-2 py-1 hover:bg-pt-bg"
                }
              >
                {code}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/hesabim`}
            className="hidden text-sm font-medium text-pt-navy-800 hover:text-pt-emerald-700 sm:inline"
          >
            {content.accountLink}
          </Link>
          <Link
            href={`/${locale}/basvuru`}
            className="hidden rounded-xl bg-pt-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pt-emerald-500 sm:inline-flex"
          >
            {content.headerCta}
          </Link>
          <button
            type="button"
            className="rounded-md border border-pt-border p-2 lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-b border-pt-border bg-pt-surface px-4 py-3 lg:hidden">
          {nav.map((item) => (
            <a
              key={item.id}
              href={navHref(locale, item.href)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link
            href={`/${locale}/hesabim`}
            className="block rounded-md px-3 py-2.5 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            {content.accountLink}
          </Link>
          <Link
            href={`/${locale}/basvuru`}
            className="mt-2 block rounded-xl bg-pt-emerald-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            {content.headerCta}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
