"use client";

import type { LandingContent } from "@/content/landing";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { swapLocalePath } from "@/lib/locale-path";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  locale: Locale;
  content: LandingContent;
};

function navHref(locale: string, href: string): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return `/${locale}/${href}`;
}

function pathOnly(href: string): string {
  return href.split("#")[0] || "/";
}

function hashOnly(href: string): string | null {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i) : null;
}

function NavLink({
  href,
  hashLink,
  className,
  children,
  onClick,
  current,
  style,
}: {
  href: string;
  hashLink: boolean;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
  current?: boolean;
  style?: React.CSSProperties;
}) {
  if (hashLink) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        aria-current={current ? "page" : undefined}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      style={style}
    >
      {children}
    </Link>
  );
}

export function LandingHeader({ locale, content }: Props) {
  const nav = Array.isArray(content.nav) ? content.nav : [];
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    setNavReady(true);
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function syncHash() {
      setHash(window.location.hash || "");
    }
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (!navReady) return;
    const home =
      pathname === `/${locale}` || pathname === `/${locale}/`;
    const ids = [
      "sss",
      "iletisim",
      "paketler",
      "surec",
      "ne-yapiyoruz",
      "sinirlar",
    ];
    if (!home && !pathname.includes("/hizmetler")) return;

    const observed = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (observed.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setHash(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    observed.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, locale, navReady]);

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

  const activeId = useMemo(() => {
    if (!navReady) return null;
    for (const item of nav) {
      const path = pathOnly(item.href);
      const itemHash = hashOnly(item.href);
      if (item.href.startsWith("#")) {
        if (
          (pathname === `/${locale}` || pathname === `/${locale}/`) &&
          hash === item.href
        ) {
          return item.id;
        }
        continue;
      }
      const full = `/${locale}${path === "/" ? "" : path}`;
      if (itemHash === "#paketler") {
        if (hash === "#paketler") return item.id;
        if (
          pathname.startsWith(`/${locale}/hizmetler`) &&
          !hash &&
          pathname.endsWith("/hizmetler")
        ) {
          return item.id;
        }
        continue;
      }
      if (path === "/hizmetler") {
        if (
          pathname.startsWith(`/${locale}/hizmetler`) &&
          hash !== "#paketler"
        ) {
          return item.id;
        }
        continue;
      }
      if (pathname === full || pathname.startsWith(`${full}/`)) {
        return item.id;
      }
    }
    return null;
  }, [nav, pathname, locale, hash, navReady]);

  return (
    <header
      suppressHydrationWarning
      className={`sticky top-0 z-30 border-b border-pt-border bg-pt-surface/95 backdrop-blur ${
        navReady && scrolled
          ? "shadow-[0_8px_24px_-16px_rgba(15,23,42,0.35)]"
          : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={`/${locale}`} className="relative z-10 min-w-0 shrink">
          <BrandLockup name={content.brand.name} priority />
        </Link>

        <nav
          className="relative z-20 hidden min-w-0 items-center gap-0.5 text-sm font-medium text-pt-navy-800 lg:flex"
          aria-label="Main"
        >
          {nav.map((item, i) => {
            const active = activeId === item.id;
            const href = navHref(locale, item.href);
            return (
              <NavLink
                key={item.id}
                href={href}
                hashLink={item.href.startsWith("#")}
                current={active}
                style={{ animationDelay: `${80 + i * 45}ms` }}
                className={`pt-nav-item group relative rounded-lg px-2.5 py-1.5 ${
                  active
                    ? "text-pt-emerald-800"
                    : "hover:text-pt-emerald-700"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-pt-emerald-600 transition-transform duration-300 ease-out ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                  }`}
                />
              </NavLink>
            );
          })}
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
        <div className="pt-mobile-nav border-b border-pt-border bg-pt-surface px-4 py-3 lg:hidden">
          {nav.map((item, i) => {
            const active = activeId === item.id;
            return (
              <NavLink
                key={item.id}
                href={navHref(locale, item.href)}
                hashLink={item.href.startsWith("#")}
                current={active}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${40 + i * 40}ms` }}
                className={`pt-mobile-nav-item block rounded-md px-3 py-2.5 text-sm font-medium ${
                  active ? "bg-pt-emerald-50 text-pt-emerald-800" : ""
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
          <Link
            href={`/${locale}/hesabim`}
            className="pt-mobile-nav-item block rounded-md px-3 py-2.5 text-sm font-medium"
            style={{ animationDelay: `${40 + nav.length * 40}ms` }}
            onClick={() => setOpen(false)}
          >
            {content.accountLink}
          </Link>
          <Link
            href={`/${locale}/basvuru`}
            className="pt-mobile-nav-item mt-2 block rounded-xl bg-pt-emerald-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
            style={{ animationDelay: `${80 + nav.length * 40}ms` }}
            onClick={() => setOpen(false)}
          >
            {content.headerCta}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
