import { cn } from "@/lib/utils";

type Tone = "ink" | "cream";

export function LogoMark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: Tone;
}) {
  const stroke = tone === "cream" ? "hsl(42 40% 94%)" : "hsl(160 37% 17%)";
  const accent = tone === "cream" ? "hsl(38 58% 62%)" : "hsl(37 49% 46%)";

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn("h-10 w-10", className)}
    >
      <title>Apoyo Legal MX</title>
      {/* Seal frame */}
      <rect
        x="1.25"
        y="1.25"
        width="45.5"
        height="45.5"
        rx="1"
        stroke={stroke}
        strokeWidth="1.4"
      />
      <rect
        x="5"
        y="5"
        width="38"
        height="38"
        rx="0.5"
        stroke={accent}
        strokeWidth="0.75"
        strokeDasharray="3 3"
        opacity="0.9"
      />
      {/* Column / arch forming an A */}
      <path
        d="M15.5 34.5V22.2c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5v12.3"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="square"
      />
      <path d="M15.5 27.4h17" stroke={accent} strokeWidth="2.1" />
      {/* Base plinth */}
      <path
        d="M11.5 37.6h25"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="square"
      />
      <circle cx="24" cy="10.4" r="1.5" fill={accent} />
    </svg>
  );
}

export function Logo({
  className,
  tone = "ink",
  compact = false,
}: {
  className?: string;
  tone?: Tone;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark tone={tone} className={compact ? "h-8 w-8" : "h-10 w-10"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display tracking-[-0.03em]",
            compact ? "text-[1.05rem]" : "text-[1.3rem]",
            tone === "cream" ? "text-cream" : "text-ink",
          )}
        >
          Apoyo Legal
        </span>
        <span
          className={cn(
            "eyebrow mt-[3px] text-[0.58rem] tracking-[0.34em]",
            tone === "cream" ? "text-brass-light" : "text-brass",
          )}
        >
          México
        </span>
      </span>
    </span>
  );
}
