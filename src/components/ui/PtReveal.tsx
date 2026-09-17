"use client";

import { cx } from "@/lib/ui-classes";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Shared ease token (Bridge/Process still import). */
export const ptEase = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "header";
  eager?: boolean;
};

/**
 * Stripe-like section reveal via CSS + IntersectionObserver.
 * Mount-safe: no useReducedMotion on first paint (avoids hydration mismatch).
 */
export function PtReveal({
  children,
  className,
  delay = 0,
  eager = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(Boolean(eager));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (eager) {
      setVisible(true);
      return;
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, mounted]);

  return (
    <div
      ref={ref}
      className={cx(
        className,
        "pt-reveal",
        visible ? "pt-reveal--in" : "pt-reveal--out",
      )}
      style={
        delay
          ? ({ "--pt-reveal-delay": `${delay}s` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
