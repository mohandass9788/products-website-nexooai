import Link from "next/link";
import Image from "next/image";
import { brand } from "@/config/brand";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label={`${brand.name} home`}
    >
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black/60 shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#00f0ff]/50 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]">
        <Image
          src="/images/nexooai-logo.png"
          alt="NexooAI"
          fill
          sizes="36px"
          className="object-contain p-0.5"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00f0ff] group-hover:via-[#c084fc] group-hover:to-[#ff7b00] transition-all">
          Ne<span className="text-[#00f0ff]">X</span>oo<span className="text-[#ff7b00]">AI</span>
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted -mt-0.5">
          Enterprise Systems
        </span>
      </div>
    </Link>
  );
}
