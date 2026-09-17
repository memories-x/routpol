"use client";

import { cx } from "@/lib/ui-classes";
import { useId, useRef, useState } from "react";

type Props = {
  label: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  files: FileList | null;
  onFiles: (files: FileList | null) => void;
  chooseLabel: string;
  dropLabel: string;
  formatsLabel: string;
  clearLabel: string;
};

function fileListFromArray(list: File[]): FileList | null {
  if (list.length === 0) return null;
  const dt = new DataTransfer();
  for (const f of list) dt.items.add(f);
  return dt.files;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Kurumsal evrak alanı — dashed panel + gizli input (native chrome yok).
 * PanelEmptyState / dosya masası ritmi.
 */
export function OrderFileField({
  label,
  hint,
  required,
  disabled,
  files,
  onFiles,
  chooseLabel,
  dropLabel,
  formatsLabel,
  clearLabel,
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const items = files ? Array.from(files) : [];

  function applyFiles(next: FileList | null) {
    const list = next && next.length > 0 ? next : null;
    onFiles(list);
    const el = inputRef.current;
    if (!el) return;
    if (!list) {
      el.value = "";
      return;
    }
    try {
      const dt = new DataTransfer();
      for (const f of Array.from(list)) dt.items.add(f);
      el.files = dt.files;
    } catch {
      /* React state remains source of truth for submit */
    }
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    applyFiles(e.target.files);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const dropped = e.dataTransfer.files;
    if (!dropped?.length) return;
    const allowed = Array.from(dropped).filter((f) => {
      const n = f.name.toLowerCase();
      return (
        n.endsWith(".pdf") ||
        n.endsWith(".jpg") ||
        n.endsWith(".jpeg") ||
        n.endsWith(".png") ||
        f.type === "application/pdf" ||
        f.type === "image/jpeg" ||
        f.type === "image/png"
      );
    });
    applyFiles(fileListFromArray(allowed));
  }

  return (
    <div>
      <p className="text-sm font-semibold text-pt-navy-900">{label}</p>
      {hint ? (
        <p className="mt-1 text-sm text-pt-slate-500">{hint}</p>
      ) : null}

      <div
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={onDrop}
        className={cx(
          "mt-3 rounded-2xl border-2 border-dashed px-5 py-8 text-center transition-colors duration-200",
          dragging
            ? "border-pt-emerald-600 bg-pt-emerald-50/80"
            : items.length > 0
              ? "border-pt-emerald-500 bg-pt-emerald-50/40"
              : "border-pt-navy-300/70 bg-pt-bg/80 hover:border-pt-emerald-500 hover:bg-pt-emerald-50/30",
          disabled && "opacity-60",
        )}
      >
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-pt-surface text-pt-emerald-700 ring-1 ring-pt-border">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 3.75h6.75L19.5 9.5V20.25A.75.75 0 0 1 18.75 21H7.25a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 .75-.75Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 3.75V9h5.25M12 13.5v4.5M9.75 15.75 12 13.5l2.25 2.25"
            />
          </svg>
        </div>
        <p className="mt-3 text-sm font-semibold text-pt-navy-950">{dropLabel}</p>
        <p className="mt-1 text-xs text-pt-slate-500">{formatsLabel}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <label
            htmlFor={inputId}
            className={cx(
              "inline-flex cursor-pointer items-center justify-center rounded-full border border-pt-border bg-pt-surface px-4 py-2 text-sm font-semibold text-pt-navy-900 transition-colors hover:border-pt-emerald-500 hover:bg-pt-emerald-50",
              disabled && "pointer-events-none",
            )}
          >
            {chooseLabel}
          </label>
          {items.length > 0 ? (
            <button
              type="button"
              disabled={disabled}
              onClick={() => applyFiles(null)}
              className="inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold text-pt-slate-600 underline-offset-2 hover:text-pt-navy-900 hover:underline disabled:opacity-60"
            >
              {clearLabel}
            </button>
          ) : null}
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept=".pdf,image/jpeg,image/png"
          multiple
          required={required}
          disabled={disabled}
          className="sr-only"
          onChange={onPick}
        />
      </div>

      {items.length > 0 ? (
        <ul className="mt-3 divide-y divide-pt-border/80 overflow-hidden rounded-2xl border border-pt-border/80 bg-pt-surface">
          {items.map((f) => (
            <li
              key={`${f.name}-${f.size}-${f.lastModified}`}
              className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
            >
              <span className="min-w-0 truncate font-medium text-pt-navy-900">
                {f.name}
              </span>
              <span className="shrink-0 tabular-nums text-pt-slate-500">
                {formatSize(f.size)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
