"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  caseId: string;
  current: string;
};

export function ArchiveFolderForm({ caseId, current }: Props) {
  const router = useRouter();
  const [value, setValue] = useState(current);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/panel/cases/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archiveFolder: value.trim() }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json?.error?.message ?? "Kaydedilemedi");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hata");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="mt-3 space-y-2">
      <label className="block text-sm">
        <span className="font-medium text-pt-aws-ink">Arşiv klasör adı</span>
        <input
          className="mt-1 w-full rounded-md border border-pt-border bg-pt-bg px-3 py-2 font-mono text-xs"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={busy}
        />
      </label>
      {error ? <p className="text-sm text-pt-danger">{error}</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="rounded-md border border-pt-border px-3 py-1.5 text-xs font-semibold text-pt-aws-ink disabled:opacity-50"
      >
        {busy ? "…" : "Klasör adını kaydet"}
      </button>
    </form>
  );
}
