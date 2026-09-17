"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PanelSearch() {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const sp = useSearchParams();
  const urlQ = pathname === "/panel/dosyalar" ? (sp.get("q") ?? "") : "";
  const [q, setQ] = useState(urlQ);

  useEffect(() => {
    setQ(urlQ);
  }, [urlQ]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();
      document.getElementById("panel-search")?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = q.trim();
    router.push(
      t
        ? `/panel/dosyalar?q=${encodeURIComponent(t)}`
        : "/panel/dosyalar",
    );
  }

  return (
    <form onSubmit={onSubmit} className="min-w-0 flex-1">
      <label className="sr-only" htmlFor="panel-search">
        Dosya ara
      </label>
      <input
        id="panel-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="İsim, firma, konu, id…"
        className="w-full max-w-md rounded-sm border border-pt-border bg-pt-surface px-3 py-2 text-sm text-pt-aws-ink placeholder:text-pt-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pt-emerald-500"
      />
    </form>
  );
}
