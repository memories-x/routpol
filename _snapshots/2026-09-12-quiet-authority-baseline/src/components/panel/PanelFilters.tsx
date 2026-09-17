"use client";

import { statusLabelTr } from "@/lib/cases/checklist";
import { packageLabelTr } from "@/lib/cases/package-labels";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  basePath: string;
  placeholder?: string;
  showStatus?: boolean;
  showPackage?: boolean;
};

const STATUS_OPTS = [
  "",
  "awaiting_payment",
  "paid",
  "in_progress",
  "closed",
  "unpaid_archived",
] as const;

const PACKAGE_OPTS = [
  "",
  "tek-yazi",
  "aylik-paket",
  "surec-yonetimi",
  "telefon-gorusme",
] as const;

export function PanelFilters({
  basePath,
  placeholder = "Ara…",
  showStatus = false,
  showPackage = false,
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [status, setStatus] = useState(sp.get("status") ?? "");
  const [pkg, setPkg] = useState(sp.get("package") ?? "");

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (showStatus && status) params.set("status", status);
    if (showPackage && pkg) params.set("package", pkg);
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `${basePath}?${qs}` : basePath);
    });
  }

  return (
    <form
      onSubmit={apply}
      className="mt-6 flex flex-wrap items-end gap-3 rounded-lg border border-pt-border bg-pt-surface px-4 py-3"
    >
      <label className="min-w-[12rem] flex-1 text-sm">
        <span className="text-pt-slate-500">Arama</span>
        <input
          className="mt-1 w-full rounded-md border border-pt-border px-3 py-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
        />
      </label>
      {showStatus ? (
        <label className="text-sm">
          <span className="text-pt-slate-500">Durum</span>
          <select
            className="mt-1 block rounded-md border border-pt-border px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUS_OPTS.map((o) => (
              <option key={o || "all"} value={o}>
                {o ? statusLabelTr(o) : "Tümü"}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {showPackage ? (
        <label className="text-sm">
          <span className="text-pt-slate-500">Paket</span>
          <select
            className="mt-1 block rounded-md border border-pt-border px-3 py-2"
            value={pkg}
            onChange={(e) => setPkg(e.target.value)}
          >
            {PACKAGE_OPTS.map((o) => (
              <option key={o || "all"} value={o}>
                {o ? packageLabelTr(o) : "Tümü"}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-pt-aws-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        Filtrele
      </button>
    </form>
  );
}
