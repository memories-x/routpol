"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Item = {
  key: string;
  label: string;
  doneAt?: string;
};

type Props = {
  caseId: string;
  items: Item[];
};

export function ChecklistForm({ caseId, items: initial }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  async function toggle(key: string, done: boolean) {
    setBusyKey(key);
    setItems((prev) =>
      prev.map((i) =>
        i.key === key
          ? { ...i, doneAt: done ? new Date().toISOString() : undefined }
          : i,
      ),
    );
    try {
      const res = await fetch(`/api/panel/cases/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checklistToggle: { key, done } }),
      });
      const json = await res.json();
      if (res.ok && json.success && Array.isArray(json.data?.checklist)) {
        setItems(json.data.checklist);
      }
      router.refresh();
    } finally {
      setBusyKey(null);
    }
  }

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="mt-6 border-t border-pt-border pt-6">
      <h2 className="text-lg font-semibold">İş listesi</h2>
      <p className="mt-1 text-xs text-pt-slate-500">
        Pakete göre adımlar. Sonuç yüklenince ve müşteri maili gidince ilgili
        tikler otomatik; kalanlar elle. Hukuki yürütme değil.
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((i) => {
          const done = Boolean(i.doneAt);
          return (
            <li key={i.key}>
              <label className="flex cursor-pointer items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={done}
                  disabled={busyKey === i.key}
                  onChange={(e) => toggle(i.key, e.target.checked)}
                />
                <span>
                  <span
                    className={
                      done ? "text-pt-slate-500 line-through" : "text-pt-aws-ink"
                    }
                  >
                    {i.label}
                  </span>
                  {done && i.doneAt ? (
                    <span className="mt-0.5 block text-[10px] text-pt-slate-400">
                      {new Date(i.doneAt).toLocaleString("tr-TR")}
                    </span>
                  ) : null}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
