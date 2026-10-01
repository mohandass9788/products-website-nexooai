"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { navigation } from "@/config/brand";
import { productsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Determine if a navigation link is active based on current path
  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300 sm:px-5",
        scrolled ? "pt-3" : "pt-5 sm:pt-7"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-[1380px] rounded-full border px-4 transition-all duration-300 sm:px-6",
          scrolled
            ? "border-white/12 bg-[#050814]/90 py-2.5 shadow-2xl shadow-black/60 backdrop-blur-xl"
            : "border-white/10 bg-[#060a18]/50 py-3.5 backdrop-blur-md"
        )}
      >
        <div className="flex items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => {
              const active = item.label === "Products" ? pathname.startsWith("/products") : isItemActive(item.href);

              return item.label === "Products" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMega(true)}
                  onMouseLeave={() => setMega(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                      active
                        ? "border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                        : "border border-transparent text-muted hover:text-white hover:border-white/10 hover:bg-white/5"
                    )}
                    aria-expanded={mega}
                    aria-haspopup="true"
                    onClick={() => setMega(!mega)}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-pulse" />}
                    <span>{item.label}</span>
                    <ChevronDown size={13} className={cn("transition-transform duration-200", mega && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[min(940px,85vw)] -translate-x-[22%] pt-4"
                      >
                        <div className="mega-panel grid grid-cols-4 gap-x-8 gap-y-6 rounded-[1.8rem] border border-white/12 bg-[#070b18]/98 p-8 shadow-2xl backdrop-blur-2xl">
                          {productsByCategory.map((group) => (
                            <div key={group.category}>
                              <p className="eyebrow mb-3 !text-[.6rem] !text-[#00f0ff]">{group.category}</p>
                              <ul className="space-y-2.5">
                                {group.products.map((product) => {
                                  const isCurrentProduct = pathname === `/products/${product.slug}`;
                                  return (
                                    <li key={product.slug}>
                                      <Link
                                        onClick={() => setMega(false)}
                                        className="group block"
                                        href={`/products/${product.slug}`}
                                      >
                                        <span
                                          className={cn(
                                            "block text-sm font-medium transition-colors",
                                            isCurrentProduct
                                              ? "text-[#00f0ff]"
                                              : "text-white group-hover:text-[#00f0ff]"
                                          )}
                                        >
                                          {product.name}
                                        </span>
                                        <span className="mt-0.5 line-clamp-1 block text-[11px] text-muted">
                                          {product.shortDescription}
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                    active
                      ? "border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                      : "border border-transparent text-muted hover:text-white hover:border-white/10 hover:bg-white/5"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-pulse" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <ButtonLink
              href="/contact"
              className="!min-h-9 !px-5 !py-2 text-xs font-semibold button-primary"
            >
              Book Architecture Demo
            </ButtonLink>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="mobile-menu"
            className="fixed inset-0 top-0 -z-10 overflow-y-auto bg-[#040711] px-6 pb-8 pt-28 lg:hidden"
          >
            <motion.nav
              initial="closed"
              animate="open"
              variants={{ closed: {}, open: { transition: { staggerChildren: 0.04 } } }}
              className="flex flex-col"
              aria-label="Mobile navigation"
            >
              {navigation.map((item) => {
                const active = item.label === "Products" ? pathname.startsWith("/products") : isItemActive(item.href);

                return (
                  <motion.div
                    variants={{ closed: { opacity: 0, y: 12 }, open: { opacity: 1, y: 0 } }}
                    key={item.href}
                  >
                    <Link
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between border-b border-white/10 py-4 text-2xl font-medium tracking-tight transition-colors",
                        active ? "text-[#00f0ff]" : "text-white hover:text-[#00f0ff]"
                      )}
                      href={item.href}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="flex items-center gap-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase text-[#00f0ff]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                          Active
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
            <ButtonLink
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 w-full button-primary text-center"
            >
              Book Architecture Demo
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
