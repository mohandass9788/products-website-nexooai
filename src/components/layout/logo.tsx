import Link from "next/link";
import { brand } from "@/config/brand";
export function Logo(){return <Link href="/" className="group flex items-center gap-3" aria-label={`${brand.name} home`}><span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-[10px] font-bold text-accent transition-transform group-hover:rotate-12">{brand.shortName}</span><span className="text-xs font-semibold tracking-[.15em]">{brand.name}</span></Link>}
