"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  basePath?: string;
  newCount?: number;
};

const STATUS_OPTS = [
  { value: "", label: "Tümü" },
  { value: "new", label: "Yeni" },
  { value: "contacted", label: "Dönüldü" },
  { value: "closed", label: "Kapalı" },
] as const;

export function LeadFilters({
  basePath = "/panel/temas",
  newCount = 0,
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [status, setStatus] = useState(sp.get("status") ?? "");

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (status) params.set("status", status);
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
        <span className="font-medium text-pt-navy-900">Ara</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ad, e-posta, telefon, segment…"
          className="mt-1 w-full rounded-md border border-pt-border px-3 py-2"
        />
      </label>
      <label className="text-sm">
        <span className="font-medium text-pt-navy-900">Durum</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block rounded-md border border-pt-border px-3 py-2"
        >
          {STATUS_OPTS.map((o) => (
            <option key={o.value || "all"} value={o.value}>
              {o.label}
              {o.value === "new" && newCount > 0 ? ` (${newCount})` : ""}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-pt-navy-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        Filtrele
      </button>
      {status || q ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setQ("");
            setStatus("");
            startTransition(() => router.push(basePath));
          }}
          className="rounded-md border border-pt-border px-4 py-2 text-sm font-semibold text-pt-navy-800"
        >
          Temizle
        </button>
      ) : null}
    </form>
  );
}
