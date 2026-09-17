"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { statusLabelTr } from "@/lib/cases/checklist";

const options = ["paid", "in_progress", "closed", "unpaid_archived"] as const;

type Props = {
  caseId: string;
  current: string;
};

export function StatusForm({ caseId, current }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(current);
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    try {
      await fetch(`/api/panel/cases/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-end gap-2">
      <label className="text-sm">
        <span className="font-medium text-pt-aws-ink">Durumu güncelle</span>
        <select
          className="mt-1 block rounded-md border border-pt-border px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {statusLabelTr(o)}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        disabled={busy}
        onClick={save}
        className="rounded-md bg-pt-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        Kaydet
      </button>
    </div>
  );
}
