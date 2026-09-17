"use client";

import { PanelLogoutButton } from "@/components/panel/PanelLogoutButton";
import {
  PanelLocaleSwitcher,
  usePanelLocale,
  usePanelStrings,
} from "@/components/panel/PanelLocaleSwitcher";
import { PanelSearch } from "@/components/panel/PanelSearch";
import { panelNavGroups } from "@/lib/panel-i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState, type ReactNode } from "react";

function isActive(pathname: string, href: string): boolean {
  if (href === "/panel") return pathname === "/panel";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({
  pathname,
  locale,
  onNavigate,
}: {
  pathname: string;
  locale: ReturnType<typeof usePanelLocale>;
  onNavigate?: () => void;
}) {
  const groups = panelNavGroups(locale);
  return (
    <div className="space-y-5">
      {groups.map((g) => (
        <div key={g.title}>
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-white/45">
            {g.title}
          </p>
          <ul className="mt-1 space-y-0.5">
            {g.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={
                      active
                        ? "block rounded-md bg-white/15 px-3 py-2 text-sm font-medium text-white"
                        : "block rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function PanelChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const isLogin = pathname === "/panel/login";
  const locale = usePanelLocale();
  const strings = usePanelStrings();

  useEffect(() => {
    if (isLogin) return;
    const html = document.documentElement;
    const { overflow: htmlOverflow, height: htmlHeight } = html.style;
    const { overflow: bodyOverflow, height: bodyHeight } = document.body.style;
    html.style.overflow = "hidden";
    html.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
    return () => {
      html.style.overflow = htmlOverflow;
      html.style.height = htmlHeight;
      document.body.style.overflow = bodyOverflow;
      document.body.style.height = bodyHeight;
    };
  }, [isLogin]);

  if (isLogin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-pt-bg px-4">
        <PanelLocaleSwitcher />
        {children}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-20 flex overflow-hidden bg-pt-bg">
      <aside className="hidden h-full w-60 shrink-0 flex-col bg-pt-navy-950 lg:flex">
        <Link
          href="/panel"
          className="flex h-14 shrink-0 items-center gap-2 border-b border-white/10 px-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/mark-on-dark.svg" alt="" className="h-8 w-8" />
          <span className="font-display text-sm font-semibold text-white">
            {strings.brand}
          </span>
        </Link>
        <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-5">
          <NavLinks pathname={pathname} locale={locale} />
        </nav>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-pt-navy-950/60"
            aria-label={strings.close}
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-pt-navy-950 shadow-lg">
            <div className="flex h-14 items-center justify-between gap-2 border-b border-white/10 px-4">
              <Link
                href="/panel"
                className="flex items-center gap-2 font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/mark-on-dark.svg" alt="" className="h-7 w-7" />
                {strings.brand}
              </Link>
              <button
                type="button"
                className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {strings.close}
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-5">
              <NavLinks
                pathname={pathname}
                locale={locale}
                onNavigate={() => setOpen(false)}
              />
            </nav>
          </aside>
        </div>
      ) : null}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-30 h-14 shrink-0 border-b border-pt-border bg-pt-surface">
          <div className="flex h-full items-center gap-3 px-4 lg:px-6">
            <button
              type="button"
              className="shrink-0 rounded-md border border-pt-border px-2.5 py-1.5 text-xs font-medium lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              {strings.menu}
            </button>
            <Suspense fallback={<div className="min-w-0 flex-1" />}>
              <PanelSearch />
            </Suspense>
            <PanelLocaleSwitcher />
            <span className="hidden shrink-0 text-[11px] uppercase tracking-wide text-pt-slate-500 sm:inline">
              {strings.operator}
            </span>
            <PanelLogoutButton />
          </div>
        </header>
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-6 pb-10 lg:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
