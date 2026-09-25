"use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { ChevronDown,Menu,X } from "lucide-react";
import { AnimatePresence,motion } from "motion/react";
import { navigation } from "@/config/brand";
import { productsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header(){
 const [open,setOpen]=useState(false); const [mega,setMega]=useState(false); const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>24);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);
 useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
 return <header className={cn("fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300 sm:px-5",scrolled?"pt-3":"pt-5 sm:pt-7")}>
  <div className={cn("mx-auto max-w-[1380px] rounded-full border px-4 transition-all duration-300 sm:px-5",scrolled?"border-white/12 bg-[#0b0d0a]/90 py-2 shadow-2xl shadow-black/25 backdrop-blur-xl":"border-white/10 bg-black/20 py-3 backdrop-blur-md")}>
   <div className="flex items-center justify-between"><Logo/>
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
     {navigation.map((item)=>item.label==="Products"?<div key={item.href} className="relative" onMouseEnter={()=>setMega(true)} onMouseLeave={()=>setMega(false)}>
      <button className="flex items-center gap-1 rounded-full px-3 py-2 text-xs text-muted transition-colors hover:text-white" aria-expanded={mega} aria-haspopup="true" onClick={()=>setMega(!mega)}>{item.label}<ChevronDown size={13}/></button>
      <AnimatePresence>{mega&&<motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}} transition={{duration:.18}} className="absolute left-1/2 top-full w-[min(900px,80vw)] -translate-x-[22%] pt-4"><div className="mega-panel grid grid-cols-4 gap-x-8 gap-y-6 rounded-[1.6rem] border border-white/10 bg-[#0c0e0b]/98 p-7 shadow-2xl backdrop-blur-2xl">
       {productsByCategory.map((group)=><div key={group.category}><p className="eyebrow mb-3 !text-[.58rem]">{group.category}</p><ul className="space-y-2">{group.products.map((product)=><li key={product.slug}><Link onClick={()=>setMega(false)} className="group block" href={`/products/${product.slug}`}><span className="block text-sm text-white transition-colors group-hover:text-accent">{product.name}</span><span className="mt-0.5 line-clamp-1 block text-[11px] text-muted">{product.shortDescription}</span></Link></li>)}</ul></div>)}
      </div></motion.div>}</AnimatePresence>
     </div>:<Link className="rounded-full px-3 py-2 text-xs text-muted transition-colors hover:text-white" href={item.href} key={item.href}>{item.label}</Link>)}
    </nav>
    <div className="hidden lg:block"><ButtonLink href="/contact" className="!min-h-9 !px-4 !py-2">Request demo</ButtonLink></div>
    <button className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?"Close menu":"Open menu"}>{open?<X size={18}/>:<Menu size={18}/>}</button>
   </div>
  </div>
  <AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} id="mobile-menu" className="fixed inset-0 top-0 -z-10 overflow-y-auto bg-[#080a07] px-6 pb-8 pt-28 lg:hidden"><motion.nav initial="closed" animate="open" variants={{closed:{},open:{transition:{staggerChildren:.04}}}} className="flex flex-col" aria-label="Mobile navigation">{navigation.map((item)=><motion.div variants={{closed:{opacity:0,y:12},open:{opacity:1,y:0}}} key={item.href}><Link onClick={()=>setOpen(false)} className="block border-b border-white/10 py-4 text-3xl tracking-[-.04em]" href={item.href}>{item.label}</Link></motion.div>)}</motion.nav><ButtonLink href="/contact" onClick={()=>setOpen(false)} className="mt-8 w-full">Request demo</ButtonLink></motion.div>}</AnimatePresence>
 </header>
}
