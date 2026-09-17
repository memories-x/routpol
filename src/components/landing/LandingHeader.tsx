"use client";

import type { LandingContent, LandingNavItem } from "@/content/landing";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { swapLocalePath } from "@/lib/locale-path";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

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

function hrefMatches(
  locale: string,
  pathname: string,
  hash: string,
  href: string,
): boolean {
  if (href.startsWith("#")) {
    return (
      (pathname === `/${locale}` || pathname === `/${locale}/`) &&
      hash === href
    );
  }
  const path = pathOnly(href);
  const itemHash = hashOnly(href);
  const full = `/${locale}${path === "/" ? "" : path}`;
  if (itemHash === "#paketler") {
    if (hash === "#paketler" && pathname.startsWith(`/${locale}/hizmetler`)) {
      return true;
    }
    return false;
  }
  if (path === "/hizmetler") {
    if (pathname === `/${locale}/hizmetler` || pathname === `/${locale}/hizmetler/`) {
      return hash !== "#paketler";
    }
    if (
      pathname.startsWith(`/${locale}/hizmetler/`) &&
      !pathname.includes("#")
    ) {
      return false;
    }
  }
  if (pathname === full || pathname.startsWith(`${full}/`)) {
    return true;
  }
  return false;
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

function DesktopDropdown({
  item,
  locale,
  pathname,
  hash,
  openId,
  setOpenId,
}: {
  item: LandingNavItem;
  locale: string;
  pathname: string;
  hash: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  const kids = Array.isArray(item.children) ? item.children : [];
  const open = openId === item.id;
  const parentActive =
    hrefMatches(locale, pathname, hash, item.href) ||
    kids.some((c) => hrefMatches(locale, pathname, hash, c.href));
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null);
    }
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpenId]);

  return (
    <div
      ref={panelRef}
      className="relative"
      onMouseEnter={() => setOpenId(item.id)}
      onMouseLeave={() => setOpenId(null)}
    >
      <button
        type="button"
        className={`pt-nav-item group relative inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 ${
          parentActive || open
            ? "text-pt-emerald-800"
            : "hover:text-pt-emerald-700"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpenId(open ? null : item.id)}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
        <span
          aria-hidden
          className={`absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-pt-emerald-600 transition-transform duration-300 ease-out ${
            parentActive || open
              ? "scale-x-100"
              : "scale-x-0 group-hover:scale-x-50"
          }`}
        />
      </button>
      {open ? (
        <div
          className="absolute left-0 top-full z-40 min-w-[18rem] pt-2"
          role="menu"
        >
          <div className="rounded-xl border border-pt-border bg-pt-surface py-2 shadow-[0_12px_32px_-16px_rgba(15,23,42,0.35)]">
            {kids.map((child) => {
              const active = hrefMatches(locale, pathname, hash, child.href);
              return (
                <NavLink
                  key={child.id}
                  href={navHref(locale, child.href)}
                  hashLink={child.href.startsWith("#")}
                  current={active}
                  onClick={() => setOpenId(null)}
                  className={`block px-4 py-2.5 transition-colors ${
                    active
                      ? "bg-pt-emerald-50 text-pt-emerald-900"
                      : "hover:bg-pt-bg"
                  }`}
                >
                  <span className="block text-sm font-semibold text-pt-navy-950">
                    {child.label}
                  </span>
                  {child.description ? (
                    <span className="mt-0.5 block text-xs leading-snug text-pt-slate-500">
                      {child.description}
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function LandingHeader({ locale, content }: Props) {
  const nav = Array.isArray(content.nav) ? content.nav : [];
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const [navReady, setNavReady] = useState(false);
  const [desktopOpenId, setDesktopOpenId] = useState<string | null>(null);
  const [mobileExpandId, setMobileExpandId] = useState<string | null>(null);

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
    setDesktopOpenId(null);
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
      const kids = Array.isArray(item.children) ? item.children : [];
      if (kids.length > 0) {
        if (kids.some((c) => hrefMatches(locale, pathname, hash, c.href))) {
          return item.id;
        }
        if (hrefMatches(locale, pathname, hash, item.href)) {
          return item.id;
        }
        continue;
      }
      if (hrefMatches(locale, pathname, hash, item.href)) {
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
            const kids = Array.isArray(item.children) ? item.children : [];
            if (kids.length > 0) {
              return (
                <DesktopDropdown
                  key={item.id}
                  item={item}
                  locale={locale}
                  pathname={pathname}
                  hash={hash}
                  openId={desktopOpenId}
                  setOpenId={setDesktopOpenId}
                />
              );
            }
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
            const kids = Array.isArray(item.children) ? item.children : [];
            const active = activeId === item.id;
            if (kids.length > 0) {
              const expanded = mobileExpandId === item.id;
              return (
                <div key={item.id} className="border-b border-pt-border/60 last:border-0">
                  <button
                    type="button"
                    className={`pt-mobile-nav-item flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium ${
                      active ? "bg-pt-emerald-50 text-pt-emerald-800" : ""
                    }`}
                    style={{ animationDelay: `${40 + i * 40}ms` }}
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileExpandId(expanded ? null : item.id)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  {expanded
                    ? kids.map((child) => {
                        const childActive = hrefMatches(
                          locale,
                          pathname,
                          hash,
                          child.href,
                        );
                        return (
                          <NavLink
                            key={child.id}
                            href={navHref(locale, child.href)}
                            hashLink={child.href.startsWith("#")}
                            current={childActive}
                            onClick={() => {
                              setOpen(false);
                              setMobileExpandId(null);
                            }}
                            className={`block px-5 py-2 text-sm ${
                              childActive
                                ? "text-pt-emerald-800"
                                : "text-pt-slate-600"
                            }`}
                          >
                            <span className="font-medium text-pt-navy-900">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="mt-0.5 block text-xs text-pt-slate-500">
                                {child.description}
                              </span>
                            ) : null}
                          </NavLink>
                        );
                      })
                    : null}
                </div>
              );
            }
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
