import Image from "next/image";

type Props = {
  name?: string;
  tagline?: string;
  className?: string;
  markOnly?: boolean;
  priority?: boolean;
  /** Footer / koyu zemin */
  onDark?: boolean;
};

export function BrandLockup({
  name = "POL-TURK",
  tagline,
  className = "",
  markOnly = false,
  priority = false,
  onDark = false,
}: Props) {
  const src = onDark ? "/brand/mark-on-dark.svg" : "/brand/mark.svg";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={src}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 shrink-0"
        priority={priority}
      />
      {markOnly ? (
        <span className="sr-only">{name}</span>
      ) : (
        <span className="min-w-0">
          <span
            className={
              onDark
                ? "block text-lg font-semibold leading-tight text-white"
                : "block text-lg font-semibold leading-tight text-pt-aws-ink"
            }
          >
            {name}
          </span>
          {tagline ? (
            <span
              className={
                onDark
                  ? "mt-0.5 hidden text-xs font-sans font-normal text-white/70 sm:block"
                  : "mt-0.5 hidden text-xs font-sans font-normal text-pt-slate-500 sm:block"
              }
            >
              {tagline}
            </span>
          ) : null}
        </span>
      )}
    </span>
  );
}
