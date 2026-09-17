import type { ReactNode } from "react";
import { cx } from "@/lib/ui-classes";

type PageShellProps = {
  children: ReactNode;
  /** narrow: başvuru · default: portal · wide: geniş içerik */
  width?: "narrow" | "default" | "wide";
  variant?: "plain" | "muted";
  className?: string;
};

const widthClass = {
  narrow: "max-w-2xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function PageShell({
  children,
  width = "default",
  variant = "plain",
  className,
}: PageShellProps) {
  return (
    <div className={variant === "muted" ? "bg-pt-surface-alt" : undefined}>
      <div
        className={cx(
          "mx-auto px-4 py-14 md:px-6 md:py-16",
          widthClass[width],
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
