import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface ProductVisualProps {
  label: string;
  accent?: string;
  variant?: "dashboard" | "phone" | "system";
  className?: string;
  imageSrc?: string;
  tagline?: string;
  badge?: string;
  priority?: boolean;
}

export function ProductVisual({
  label,
  accent = "#00f0ff",
  variant = "dashboard",
  className,
  imageSrc,
  tagline,
  badge,
  priority,
}: ProductVisualProps) {
  const isPriority = priority ?? (variant === "dashboard");
  return (
    <div
      className={cn(
        "product-visual group relative overflow-hidden rounded-[1.8rem] border border-white/12 bg-gradient-to-b from-[#0e1628] to-[#060a15] p-3 shadow-2xl transition-all duration-500 hover:border-white/25",
        variant === "phone" && "mx-auto max-w-[320px] rounded-[2.8rem] p-2.5",
        className
      )}
      style={{ "--visual-accent": accent } as React.CSSProperties}
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-[2rem] opacity-25 blur-xl transition-opacity duration-700 group-hover:opacity-40"
        style={{
          background: `radial-gradient(circle at 60% 20%, ${accent}, transparent 70%)`,
        }}
      />

      <div
        className={cn(
          "relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#040711]",
          variant === "phone" && "min-h-[500px] rounded-[2.2rem]"
        )}
      >
        {/* Header Bar */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/8 bg-[#080d1e]/80 px-4 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">
              {label}
            </span>
            <span
              className="h-2 w-2 rounded-full shadow-[0_0_8px]"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
          </div>
          {badge ? (
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider"
              style={{
                backgroundColor: `${accent}22`,
                color: accent,
                border: `1px solid ${accent}44`,
              }}
            >
              {badge}
            </span>
          ) : (
            <span className="text-[10px] text-white/30">v2.4</span>
          )}
        </div>

        {/* Content Section */}
        {imageSrc ? (
          <div className="relative flex-1 min-h-[240px] overflow-hidden">
            <Image
              src={imageSrc}
              alt={label}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={isPriority}
              loading={isPriority ? "eager" : undefined}
            />
            {/* Dark gradient overlay for SaaS integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-transparent to-transparent opacity-60" />

            {/* Floating Glassmorphic Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/12 bg-black/60 p-3 backdrop-blur-md">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  System Live
                </p>
                <p className="text-xs font-medium text-white truncate max-w-[200px]">
                  {tagline || label}
                </p>
              </div>
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${accent}26`, color: accent }}
              >
                <Sparkles size={14} />
              </div>
            </div>
          </div>
        ) : (
          /* High-Fidelity UI Fallback */
          <div
            className={cn(
              "grid flex-1 gap-3 p-4",
              variant !== "phone" && "grid-cols-[.32fr_1fr]"
            )}
          >
            <div className="space-y-2.5">
              {[75, 50, 65, 40, 60].map((n, i) => (
                <span
                  key={i}
                  className="block h-2 rounded-full bg-white/10"
                  style={{ width: `${n}%` }}
                />
              ))}
              <div className="mt-6 rounded-lg border border-white/8 bg-white/[.02] p-2.5">
                <span className="block h-1.5 w-12 rounded bg-white/10" />
                <span className="mt-2 block h-1.5 w-20 rounded bg-white/5" />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: "99.8%", lbl: "Uptime" },
                  { val: "4.2k", lbl: "Orders" },
                  { val: "100%", lbl: "Cloud Sync" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/8 bg-white/[.035] p-3"
                  >
                    <span className="block font-mono text-[9px] uppercase text-muted">
                      {item.lbl}
                    </span>
                    <strong
                      className="mt-2 block text-lg font-semibold"
                      style={{ color: i === 0 ? accent : undefined }}
                    >
                      {item.val}
                    </strong>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-28 rounded-xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,.035),transparent)] p-3">
                <svg
                  viewBox="0 0 300 80"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 62 C35 55 42 24 75 38 S130 65 160 34 S218 9 300 22"
                    fill="none"
                    stroke={accent}
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path d="M0 64H300" stroke="rgba(255,255,255,.08)" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
