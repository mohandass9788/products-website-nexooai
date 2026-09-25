import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/config/brand";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { services } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

export function Footer(){return <footer className="border-t border-white/10 bg-[#050604] pt-20"><Container>
 <div className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-[1.3fr_2fr] lg:grid-cols-[1.4fr_3fr]"><div><Logo/><p className="mt-6 max-w-xs text-sm leading-6 text-muted">{brand.tagline}</p><a className="mt-6 inline-flex items-center gap-2 text-sm text-accent" href={`mailto:${brand.email}`}>{brand.email}<ArrowUpRight size={14}/></a></div>
 <div className="grid grid-cols-2 gap-9 sm:grid-cols-4"><FooterGroup title="Products" items={products.slice(0,6).map(p=>({label:p.shortName,href:`/products/${p.slug}`}))}/><FooterGroup title="Solutions" items={solutions.slice(0,5).map(s=>({label:s.label,href:`/solutions/${s.slug}`}))}/><FooterGroup title="Services" items={services.slice(0,5).map(s=>({label:s.name,href:`/services/${s.slug}`}))}/><FooterGroup title="Company" items={[{label:"About",href:"/about"},{label:"Industries",href:"/industries"},{label:"Contact",href:"/contact"},{label:"Privacy (placeholder)",href:"#"},{label:"Terms (placeholder)",href:"#"}]}/></div></div>
 <div className="flex flex-col gap-5 py-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {brand.name}. Placeholder company information.</p><div className="flex gap-5">{brand.socials.map(item=><a key={item.label} href={item.href}>{item.label}</a>)}</div></div>
 </Container></footer>}
function FooterGroup({title,items}:{title:string;items:{label:string;href:string}[]}){return <div><p className="mb-4 text-xs font-semibold">{title}</p><ul className="space-y-3 text-xs text-muted">{items.map(item=><li key={item.label}><Link className="transition-colors hover:text-white" href={item.href}>{item.label}</Link></li>)}</ul></div>}
