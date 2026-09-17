"use client";

import { BrandLockup } from "@/components/brand/BrandLockup";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeaderProps = {
  locale: Locale;
  content: SiteContent;
};

export function Header({ locale, content }: HeaderProps) {
  const nav = Array.isArray(content.nav) ? content.nav : [];
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

  function navHref(href: string) {
    if (href.startsWith("#")) return `/${locale}${href}`;
    if (href.startsWith("/")) return href;
    return `/${locale}/${href}`;
  }

  return (
    <header
      className={`sticky top-0 z-30 border-b border-pt-border bg-pt-surface transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={`/${locale}`} className="min-w-0 shrink">
          <BrandLockup name={content.brand.name} priority />
        </Link>

        <nav
          className="hidden items-center gap-6 text-sm font-medium text-pt-navy-800 lg:flex"
          aria-label="Ana"
        >
          {nav.map((item) => (
            <a
              key={item.id}
              href={navHref(item.href)}
              className="hover:text-pt-emerald-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-0.5 text-xs font-medium uppercase tracking-wide text-pt-slate-500">
            {locales.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                className={
                  code === locale
                    ? "rounded-md bg-pt-navy-900 px-2 py-1 text-white"
                    : "rounded-md px-2 py-1 hover:bg-pt-bg"
                }
                aria-current={code === locale ? "page" : undefined}
              >
                {code}
              </Link>
            ))}
          </div>
          <a
            href={`/${locale}/basvuru`}
            className="hidden rounded-md bg-pt-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-pt-emerald-500 sm:inline-flex"
          >
            {content.hero.ctaHeader}
          </a>
          <button
            type="button"
            className="inline-flex rounded-md border border-pt-border p-2 text-pt-navy-800 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 top-16 z-40 lg:hidden" id="mobile-nav">
          <button
            type="button"
            className="absolute inset-0 bg-pt-navy-950/40"
            aria-label="Menüyü kapat"
            onClick={() => setOpen(false)}
          />
          <nav
            className="absolute inset-x-0 top-0 max-h-[min(70vh,28rem)] overflow-y-auto border-b border-pt-border bg-pt-surface px-4 py-3 shadow-md"
            aria-label="Mobil"
          >
            {nav.map((item) => (
              <a
                key={item.id}
                href={navHref(item.href)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-pt-navy-800 hover:bg-pt-bg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`/${locale}/basvuru`}
              className="mt-2 block rounded-md bg-pt-emerald-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {content.hero.ctaHeader}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
