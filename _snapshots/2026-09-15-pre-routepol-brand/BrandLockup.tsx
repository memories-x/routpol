import Image from "next/image";

type Props = {
  name?: string;
  tagline?: string;
  className?: string;
  markOnly?: boolean;
  priority?: boolean;
  /** Footer / koyu zemin */
  onDark?: boolean;
  /** header = compact; hero = brand-first */
  size?: "header" | "hero";
};

export function BrandLockup({
  name = "POL-TURK",
  tagline,
  className = "",
  markOnly = false,
  priority = false,
  onDark = false,
  size = "header",
}: Props) {
  const src = onDark ? "/brand/mark-on-dark.svg" : "/brand/mark.svg";
  const markClass =
    size === "hero" ? "h-10 w-10 shrink-0" : "h-8 w-8 shrink-0";
  const markPx = size === "hero" ? 40 : 32;
  const nameClass = onDark
    ? size === "hero"
      ? "block font-display text-2xl font-semibold tracking-tight text-white md:text-3xl"
      : "block font-display text-lg font-semibold tracking-tight text-white"
    : size === "hero"
      ? "block font-display text-2xl font-semibold tracking-tight text-pt-navy-950 md:text-3xl"
      : "block font-display text-lg font-semibold tracking-tight text-pt-navy-900";
  const tagClass = onDark
    ? size === "hero"
      ? "text-xs font-medium text-white/70 md:text-sm"
      : "mt-0.5 hidden text-[10px] font-medium text-white/70 sm:block"
    : size === "hero"
      ? "text-xs font-medium text-pt-slate-500 md:text-sm"
      : "hidden text-[10px] font-medium text-pt-slate-500 sm:block";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={src}
        alt=""
        width={markPx}
        height={markPx}
        className={markClass}
        priority={priority}
      />
      {markOnly ? (
        <span className="sr-only">{name}</span>
      ) : (
        <span className="min-w-0">
          <span className={nameClass}>{name}</span>
          {tagline ? <span className={tagClass}>{tagline}</span> : null}
        </span>
      )}
    </span>
  );
}
