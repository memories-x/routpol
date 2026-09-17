"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function InvoiceRetryButton({ caseId }: { caseId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function retry() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/panel/cases/${caseId}/invoice`, {
        method: "POST",
      });
      const json = (await res.json()) as {
        success?: boolean;
        error?: { message?: string };
      };
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message ?? "Kesilemedi");
      }
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Kesilemedi");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={() => void retry()}
        disabled={busy}
        className="text-pt-emerald-600 hover:underline disabled:opacity-50"
      >
        {busy ? "Kesiliyor…" : "Tekrar kes"}
      </button>
      {err ? <span className="text-xs text-pt-danger">{err}</span> : null}
    </span>
  );
}
