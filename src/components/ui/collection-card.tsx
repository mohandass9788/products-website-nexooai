import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CollectionCardProps {
  href: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  image?: string;
}

export function CollectionCard({
  href,
  index,
  eyebrow,
  title,
  description,
  accent = "#d8ff5f",
  image,
}: CollectionCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[340px] sm:min-h-[380px] flex-col justify-between overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0e100d] p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
      style={
        {
          "--card-accent": accent,
        } as React.CSSProperties
      }
    >
      {/* Background Image Layer if provided */}
      {image && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-25 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-35"
          />
          {/* Multi-layer Gradient Scrim for high text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b08] via-[#090b08]/85 to-[#090b08]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090b08]/90 via-[#090b08]/40 to-transparent" />
        </div>
      )}

      {/* Ambient Neon Accent Glow in Corner */}
      <span
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: accent, opacity: 0.15 }}
      />

      {/* Top Bar with Eyebrow, NexooAI Emblem, & Index */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* NexooAI Micro Emblem */}
          <div className="relative h-4 w-4 overflow-hidden rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
            <Image
              src="/images/nexooai-logo.png"
              alt="NexooAI"
              fill
              sizes="16px"
              className="object-contain"
            />
          </div>
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md transition-colors"
            style={{
              backgroundColor: `${accent}15`,
              color: accent,
              border: `1px solid ${accent}33`,
            }}
          >
            {eyebrow}
          </span>
        </div>

        <span className="font-mono text-xs text-muted/80 tracking-widest">
          {index}
        </span>
      </div>

      {/* Content Area */}
      <div className="relative z-10 mt-16 sm:mt-24">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-.04em] text-white transition-colors group-hover:text-[var(--card-accent)]">
          {title}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted line-clamp-3">
          {description}
        </p>

        {/* Bottom Interactive Row */}
        <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
          <span className="font-mono text-xs text-muted transition-colors group-hover:text-white">
            Explore Details
          </span>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[var(--card-accent)] group-hover:bg-[var(--card-accent)]/15 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <ArrowUpRight
              className="text-muted transition-colors group-hover:text-[var(--card-accent)]"
              size={16}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
