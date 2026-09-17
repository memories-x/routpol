"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type PartnerOption = {
  id: string;
  name: string;
  officeName?: string;
  city?: string;
  active: boolean;
};

type Props = {
  caseId: string;
  currentId?: string;
  currentName?: string;
  partners: PartnerOption[];
};

function matchId(
  currentId: string,
  currentName: string,
  options: PartnerOption[],
): string {
  if (currentId) return currentId;
  const name = currentName.trim().toLowerCase();
  if (!name) return "";
  return (
    options.find((p) => p.name.trim().toLowerCase() === name)?.id ?? ""
  );
}

export function PartnerField({
  caseId,
  currentId = "",
  currentName = "",
  partners,
}: Props) {
  const router = useRouter();
  const options = Array.isArray(partners) ? partners : [];
  const [value, setValue] = useState(() =>
    matchId(currentId, currentName, options),
  );
  const [busy, setBusy] = useState(false);
  const healed = useRef(false);

  async function persist(next: string) {
    setBusy(true);
    try {
      await fetch(`/api/panel/cases/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lawyerPartnerId: next || null }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (healed.current || currentId || !value) return;
    healed.current = true;
    void persist(value);
    // Heal leftover name-only labels once; persist is stable enough for mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (options.length === 0) {
    return (
      <div className="mt-4 rounded-md border border-dashed border-pt-border px-3 py-3 text-sm">
        <p className="font-medium text-pt-aws-ink">Avukat ortağı</p>
        <p className="mt-1 text-xs text-pt-slate-500">
          Önce ortak ekleyin, sonra burada seçin.
        </p>
        <Link
          href="/panel/ortaklar/yeni"
          className="mt-2 inline-block text-pt-emerald-600 hover:underline"
        >
          Ortak ekle
        </Link>
      </div>
    );
  }

  const unmatched = Boolean(currentName) && !value;

  return (
    <div className="mt-4 space-y-2">
      <label className="block text-sm">
        <span className="font-medium text-pt-aws-ink">Avukat ortağı</span>
        <select
          className="mt-1 w-full rounded-md border border-pt-border px-3 py-2 text-sm"
          value={value}
          onChange={(e) => {
            const next = e.target.value;
            setValue(next);
            void persist(next);
          }}
          disabled={busy}
        >
          <option value="">Atanmamış</option>
          {options.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
              {p.city ? ` · ${p.city}` : ""}
            </option>
          ))}
        </select>
      </label>
      {value ? (
        <p className="text-xs">
          <Link
            href={`/panel/ortaklar/${value}`}
            className="text-pt-emerald-600 hover:underline"
          >
            Ortak kartı
          </Link>
        </p>
      ) : unmatched ? (
        <p className="text-xs text-pt-slate-500">
          Eski etiket: {currentName}.{" "}
          <Link
            href={`/panel/ortaklar/yeni?name=${encodeURIComponent(currentName)}`}
            className="text-pt-emerald-600 hover:underline"
          >
            Kart yap
          </Link>
        </p>
      ) : null}
    </div>
  );
}
