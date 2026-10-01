"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Monitor,
  Pause,
  Play,
  Smartphone,
  Hand,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

// High-tech 3-letter badge acronym map & display names
const productMeta: Record<string, { code: string; label: string }> = {
  "estimate-app": { code: "EST", label: "Estimate App" },
  "gold-silver-chit-fund": { code: "CHT", label: "Chit Fund" },
  "local-shop-billing": { code: "BIL", label: "Shop Billing" },
  "retail-pos": { code: "POS", label: "Retail POS" },
  "ecommerce-web": { code: "WEB", label: "Commerce Web" },
  "ecommerce-mobile": { code: "MOB", label: "Commerce Mobile" },
  hrm: { code: "HRM", label: "HRM Suite" },
  crm: { code: "CRM", label: "CRM Cloud" },
  "end-to-end-solution": { code: "ERP", label: "Enterprise ERP" },
  "hotel-management": { code: "HTL", label: "Hotel Management" },
  "restaurant-billing": { code: "RES", label: "Restaurant POS" },
  "parking-management": { code: "PRK", label: "Parking System" },
  "railway-lounge-billing": { code: "LNG", label: "Lounge Billing" },
};

// 3 Mobile App Screens for Side-by-Side Mockup Experience (Branded NexooAI)
const mobileDeckScreens = [
  {
    id: "welcome",
    label: "01 Onboarding",
    title: "Welcome & Auth",
    subtitle: "Biometric & OTP Login",
    image: "/images/mobile/app-welcome.webp",
    accent: "#00f0ff",
    badge: "Identity Core",
  },
  {
    id: "dashboard",
    label: "02 Dashboard",
    title: "Live Portfolio",
    subtitle: "Metal Ticker & Passbook",
    image: "/images/mobile/app-dashboard.webp",
    accent: "#efc87a",
    badge: "Flagship Core",
  },
  {
    id: "schemes",
    label: "03 Schemes",
    title: "Chit Savings",
    subtitle: "Weight & Value Plans",
    image: "/images/mobile/app-schemes.webp",
    accent: "#a855f7",
    badge: "Wealth Vault",
  },
];

export function ProductUniverseShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [userViewMode, setUserViewMode] = useState<"desktop" | "mobile" | null>(null);
  const [focusedMobilePhone, setFocusedMobilePhone] = useState(1);
  const [, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cardScrollRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const mobilePillScrollRef = useRef<HTMLDivElement>(null);

  const totalProducts = products.length; // 13
  const stepAngle = 360 / totalProducts; // ~27.692 deg
  const activeProduct = products[activeIndex] || products[0];

  const isMobileNativeProduct =
    activeProduct.slug === "ecommerce-mobile" ||
    activeProduct.slug === "gold-silver-chit-fund";

  // Automatically default to mobile view if a mobile product is chosen, unless overridden by user
  const currentViewMode =
    userViewMode !== null
      ? userViewMode
      : isMobileNativeProduct
      ? "mobile"
      : "desktop";

  // Keep activeIndexRef in sync
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Automatically keep active mobile pill scrolled into view
  useEffect(() => {
    if (mobilePillScrollRef.current) {
      const activeEl = mobilePillScrollRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [activeIndex]);

  // GSAP ScrollTrigger Pinned Stepping Experience ONLY FOR DESKTOP (>= 1024px)
  // Mobile uses fluid natural scrolling + touch swipe gestures (no scroll-trapping!)
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop Pinned Stepping
    mm.add("(min-width: 1024px)", () => {
      const el = sectionRef.current;
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=3200", // ~246px of natural scroll per product
        pin: true,
        pinSpacing: true,
        scrub: 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const rawProgress = self.progress;
          setScrollProgress(rawProgress);

          const newIndex = Math.min(
            totalProducts - 1,
            Math.max(0, Math.floor(rawProgress * totalProducts))
          );

          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }
        },
      });

      triggerRef.current = st;

      return () => {
        st.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [totalProducts]);

  // Direct selection helper: scrolls the window on desktop, updates state directly on mobile
  const handleSelectProduct = (index: number) => {
    setActiveIndex(index);
    if (typeof window !== "undefined" && window.innerWidth >= 1024 && triggerRef.current) {
      const st = triggerRef.current;
      const targetProgress = index / totalProducts + 0.02;
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % totalProducts;
    handleSelectProduct(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + totalProducts) % totalProducts;
    handleSelectProduct(prevIdx);
  };

  // Touch Swipe Handlers for Mobile (Swipe left = Next, Swipe right = Prev)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Helper to scroll the 3-phone track inside the card
  const scrollCardToPhone = (index: number) => {
    setFocusedMobilePhone(index);
    const container = cardScrollRef.current;
    if (!container) return;
    const target = container.children[index] as HTMLElement;
    if (target) {
      container.scrollTo({
        left: target.offsetLeft - container.clientWidth / 2 + target.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  // Optional Auto-Play toggle (scrolls window only on desktop)
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % totalProducts;
        if (typeof window !== "undefined" && window.innerWidth >= 1024 && triggerRef.current) {
          const st = triggerRef.current;
          const targetProgress = next / totalProducts + 0.02;
          const targetScroll = st.start + targetProgress * (st.end - st.start);
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
        return next;
      });
    }, 4200);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, totalProducts]);

  // Base angle for node 0 is 180deg on desktop (9 o'clock), rotating dynamically
  const wheelRotation = -(activeIndex * stepAngle);

  return (
    <section
      ref={sectionRef}
      id="product-universe"
      className="universe-section relative z-20 w-full bg-[#040711] border-y border-white/8 overflow-hidden py-5 sm:py-7 lg:py-6 lg:h-screen lg:min-h-[720px] lg:max-h-[1050px] flex flex-col justify-between"
    >
      {/* Dynamic central ambient glow that shifts color with active product */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] sm:h-[750px] w-[500px] sm:w-[750px] rounded-full opacity-20 blur-[140px] sm:blur-[160px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activeProduct.accent || "#00f0ff"}, transparent 70%)`,
        }}
      />

      <Container className="relative z-10 w-full max-w-[1720px] px-3 sm:px-6 lg:px-10 flex-1 flex flex-col justify-between overflow-hidden">
        {/* ============================================================ */}
        {/* TOP BAR: Compact Header, Step Counter & Controls             */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-2.5">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[.2em] text-[#00f0ff]">
              02 / Product Universe
            </span>
            <span className="text-white/20">|</span>
            <h2 className="text-sm sm:text-lg lg:text-2xl font-bold tracking-tight text-white truncate">
              One Core. Many Possibilities.
            </h2>
          </div>

          {/* Center Hint for Scroll-driven stepping (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="text-white/80">Scroll page to rotate systems</span>
            <span className="text-white/40">•</span>
            <span
              className="font-semibold"
              style={{ color: activeProduct.accent || "#00f0ff" }}
            >
              {activeProduct.name}
            </span>
          </div>

          {/* Right Controls: Auto-Play toggle, Step Counter, Prev/Next */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Auto-Orbit Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="hidden sm:flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-xs text-muted backdrop-blur-md hover:border-[#00f0ff]/50 hover:text-white transition-all cursor-pointer shadow-sm"
              title={isAutoPlaying ? "Pause Auto-Orbit" : "Play Auto-Orbit"}
            >
              {isAutoPlaying ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                  <span className="text-white font-medium">Auto-Orbit</span>
                  <Pause size={12} className="text-muted" />
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>Manual</span>
                  <Play size={12} className="text-[#00f0ff]" />
                </>
              )}
            </button>

            {/* Counter */}
            <div className="font-mono text-xs tracking-wider text-muted">
              <span className="text-sm sm:text-base font-bold text-white">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>{" "}
              / {String(totalProducts).padStart(2, "0")}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex gap-1">
              <button
                onClick={handlePrev}
                aria-label="Previous product"
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-all hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next product"
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-all hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] active:scale-95 cursor-pointer"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE CONTROLLER & SYSTEM RIBBON (Visible only on < lg)     */}
        {/* ============================================================ */}
        <div className="lg:hidden mt-2.5 mb-1 flex flex-col gap-2">
          {/* Active System Sub-Header & Swipe Hint */}
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <span
                className="rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${activeProduct.accent || "#00f0ff"}22`,
                  color: activeProduct.accent || "#00f0ff",
                  border: `1px solid ${activeProduct.accent || "#00f0ff"}55`,
                }}
              >
                {productMeta[activeProduct.slug]?.code || "SYS"}
              </span>
              <span className="text-xs font-semibold text-white truncate max-w-[200px]">
                {activeProduct.name}
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-muted">
              <Hand size={11} className="text-[#00f0ff] animate-pulse" />
              <span className="text-white/70">Swipe card left/right</span>
            </div>
          </div>

          {/* Horizontal System Navigation Ribbon */}
          <div
            ref={mobilePillScrollRef}
            className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x"
          >
            {products.map((p, index) => {
              const isCurrent = index === activeIndex;
              const meta = productMeta[p.slug] || {
                code: p.shortName.slice(0, 3).toUpperCase(),
                label: p.shortName,
              };
              const numStr = String(index + 1).padStart(2, "0");

              return (
                <button
                  key={p.slug}
                  onClick={() => handleSelectProduct(index)}
                  className={`snap-center shrink-0 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? "border text-white font-semibold shadow-md scale-102"
                      : "border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/25"
                  }`}
                  style={{
                    borderColor: isCurrent ? (p.accent || "#00f0ff") : undefined,
                    backgroundColor: isCurrent ? `${p.accent || "#00f0ff"}25` : undefined,
                    boxShadow: isCurrent ? `0 0 12px ${p.accent || "#00f0ff"}44` : undefined,
                  }}
                >
                  <span
                    className="text-[9px] opacity-70"
                    style={{ color: isCurrent ? (p.accent || "#00f0ff") : "inherit" }}
                  >
                    {numStr}
                  </span>
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN CONTAINER:                                               */}
        {/* ON MOBILE: FULL-WIDTH ACTIVE COMMAND CARD                     */}
        {/* ON DESKTOP: LEFT = CARD (col-6), RIGHT = ORBIT RADAR (col-6)  */}
        {/* ============================================================ */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="my-auto flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 xl:gap-10 items-center py-2 lg:py-4 overflow-hidden"
        >
          {/* ---------------------------------------------------------- */}
          {/* ORBITAL RADAR: SHOWN ONLY ON DESKTOP (lg:flex), HIDDEN MOBILE */}
          {/* ---------------------------------------------------------- */}
          <div className="hidden lg:flex w-full lg:col-span-6 xl:col-span-6 flex-col items-center justify-center order-2 overflow-hidden">
            {/* Outer Dial Container */}
            <div className="relative aspect-square w-full max-w-[460px] xl:max-w-[510px] 2xl:max-w-[560px] p-1 mx-auto overflow-hidden">
              {/* Concentric Decorative Radar / HUD Rings */}
              <div className="absolute inset-[3%] rounded-full border border-white/8 pointer-events-none" />
              <div className="absolute inset-[15%] rounded-full border border-dashed border-white/12 animate-[spin_160s_linear_infinite] pointer-events-none" />
              <div className="absolute inset-[28%] rounded-full border border-white/6 pointer-events-none" />
              <div className="absolute inset-[39%] rounded-full border border-dashed border-white/10 animate-[spin_90s_linear_infinite_reverse] pointer-events-none" />

              {/* Desktop 180° Laser Focus Reticle (Points left to card) */}
              <div className="hidden lg:flex absolute left-[6%] top-1/2 -translate-y-1/2 z-30 items-center pointer-events-none">
                <div
                  className="h-10 w-10 -translate-x-1/2 rounded-full border-2 flex items-center justify-center animate-pulse"
                  style={{
                    borderColor: activeProduct.accent || "#00f0ff",
                    backgroundColor: `${activeProduct.accent || "#00f0ff"}22`,
                    boxShadow: `0 0 25px ${activeProduct.accent || "#00f0ff"}88`,
                  }}
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: activeProduct.accent || "#00f0ff",
                      boxShadow: `0 0 10px ${activeProduct.accent || "#00f0ff"}`,
                    }}
                  />
                </div>
                <div
                  className="h-[2px] w-24 -translate-x-4 bg-gradient-to-l from-transparent via-[#00f0ff] to-[#00f0ff] opacity-90"
                  style={{
                    boxShadow: `0 0 12px ${activeProduct.accent || "#00f0ff"}`,
                  }}
                />
              </div>

              {/* Central Glowing NeXooAI OS Core */}
              <div
                className="absolute inset-[35%] grid place-items-center rounded-full border text-center transition-all duration-700 z-10 backdrop-blur-xl"
                style={{
                  borderColor: `${activeProduct.accent || "#00f0ff"}66`,
                  backgroundColor: "#050814f0",
                  boxShadow: `0 0 40px ${activeProduct.accent || "#00f0ff"}33, inset 0 0 20px ${activeProduct.accent || "#00f0ff"}22`,
                }}
              >
                <div className="flex flex-col items-center p-1.5 sm:p-2">
                  <div className="relative mb-0.5 sm:mb-1 h-7 w-7 sm:h-9 sm:w-9 overflow-hidden rounded-xl border border-white/20 bg-black/80 p-1 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                    <Image
                      src="/images/nexooai-logo.png"
                      alt="NeXooAI Core"
                      fill
                      sizes="36px"
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[.2em] font-bold"
                    style={{ color: activeProduct.accent || "#00f0ff" }}
                  >
                    NeXooAI OS
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-white font-semibold leading-none">
                    Core Engine
                  </span>
                  <span className="font-mono text-[7px] text-[#00f0ff]/90 mt-0.5 tracking-wider">
                    360° SYNC
                  </span>
                </div>
              </div>

              {/* Physical Rotating Ring Container */}
              <div
                className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                }}
              >
                {/* 13 Orbital Satellite Nodes positioned around 360° circle */}
                {products.map((p, index) => {
                  const nodeBaseAngle = 180 + index * stepAngle;
                  const rad = (nodeBaseAngle * Math.PI) / 180;
                  const radiusPercent = 37;
                  const x = 50 + radiusPercent * Math.cos(rad);
                  const y = 50 + radiusPercent * Math.sin(rad);
                  const isCurrent = index === activeIndex;

                  const meta = productMeta[p.slug] || {
                    code: p.shortName.slice(0, 3).toUpperCase(),
                    label: p.shortName,
                  };
                  const numStr = String(index + 1).padStart(2, "0");

                  // Counter-rotation so text on every node stays 100% upright and level!
                  const counterRotation = -wheelRotation;

                  return (
                    <button
                      key={p.slug}
                      onClick={() => handleSelectProduct(index)}
                      aria-label={`Select ${p.name}`}
                      className={`universe-node absolute transition-all duration-300 cursor-pointer ${
                        isCurrent
                          ? "z-30 scale-110 rounded-full border-2 font-bold px-3 py-1.5 text-xs shadow-2xl"
                          : "z-20 rounded-full border border-white/15 bg-[#070c1a]/95 text-white/70 hover:border-[#00f0ff]/60 hover:text-white px-2.5 py-1 text-[10px] font-mono hover:scale-108"
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: `translate(-50%, -50%) rotate(${counterRotation}deg)`,
                        borderColor: isCurrent ? (p.accent || "#00f0ff") : "rgba(255,255,255,0.15)",
                        backgroundColor: isCurrent ? `${p.accent || "#00f0ff"}28` : "#070c1ae6",
                        color: isCurrent ? "#ffffff" : "rgba(255,255,255,0.75)",
                        boxShadow: isCurrent
                          ? `0 0 20px ${p.accent || "#00f0ff"}88, inset 0 0 8px ${p.accent || "#00f0ff"}44`
                          : "none",
                      }}
                    >
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <span
                          className="font-mono text-[9px] opacity-70"
                          style={{ color: isCurrent ? (p.accent || "#00f0ff") : "inherit" }}
                        >
                          {numStr}
                        </span>
                        <span className="font-semibold tracking-wide">
                          {meta.label}
                        </span>
                        <span
                          className="rounded px-1 py-0.2 text-[8px] font-mono uppercase"
                          style={{
                            backgroundColor: isCurrent ? `${p.accent || "#00f0ff"}44` : "rgba(255,255,255,0.1)",
                            color: isCurrent ? "#ffffff" : "rgba(255,255,255,0.6)",
                          }}
                        >
                          {meta.code}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Orbit Subtitle */}
            <div className="mt-2 flex items-center justify-between gap-3 w-full max-w-[460px] rounded-lg border border-white/8 bg-[#060a16] px-3 py-1.5 font-mono text-xs text-muted">
              <div className="flex items-center gap-1.5 truncate">
                <Cpu size={12} className="text-[#00f0ff] shrink-0" />
                <span className="truncate">
                  ACTIVE: <strong style={{ color: activeProduct.accent || "#00f0ff" }}>{activeProduct.name}</strong>
                </span>
              </div>
              <span className="text-white/50 text-[11px]">
                360° Synchronized Core
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* ACTIVE SYSTEM COMMAND CARD: FULL WIDTH ON MOBILE, COL-1 DESKTOP */}
          {/* ---------------------------------------------------------- */}
          <div className="w-full lg:col-span-6 xl:col-span-6 flex flex-col justify-center order-1">
            <div
              className="relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-[#0a1024]/95 to-[#040813]/95 p-4 sm:p-5 xl:p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-white/25"
              style={{
                boxShadow: `0 15px 50px -15px ${activeProduct.accent || "#00f0ff"}25`,
              }}
            >
              {/* Card Window Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* macOS dots */}
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f56]/80" />
                    <span className="h-2 w-2 rounded-full bg-[#ffbd2e]/80" />
                    <span className="h-2 w-2 rounded-full bg-[#27c93f]/80" />
                  </div>
                  {/* Category Pill */}
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300"
                    style={{
                      backgroundColor: `${activeProduct.accent || "#00f0ff"}22`,
                      color: activeProduct.accent || "#00f0ff",
                      border: `1px solid ${activeProduct.accent || "#00f0ff"}44`,
                    }}
                  >
                    {activeProduct.category}
                  </span>
                  <span className="font-mono text-[10px] text-muted hidden sm:inline">
                    SYS {String(activeIndex + 1).padStart(2, "0")} / {String(totalProducts).padStart(2, "0")}
                  </span>
                </div>

                {/* Interactive View Switcher: Cloud Web vs 3-Phone Mobile Suite */}
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 p-0.5 shadow-inner">
                  <button
                    onClick={() => setUserViewMode("desktop")}
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] transition-all cursor-pointer ${
                      currentViewMode === "desktop"
                        ? "bg-white/15 text-white font-semibold shadow-sm"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    <Monitor size={10} />
                    <span>Cloud Web</span>
                  </button>
                  <button
                    onClick={() => setUserViewMode("mobile")}
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] transition-all cursor-pointer ${
                      currentViewMode === "mobile"
                        ? "bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 font-semibold shadow-[0_0_10px_rgba(0,240,255,0.25)]"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    <Smartphone size={10} />
                    <span>3-Phone Suite</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                  </button>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-1 sm:gap-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  {activeProduct.name}
                </h3>
                <span
                  className="font-mono text-xs font-semibold tracking-wide"
                  style={{ color: activeProduct.accent || "#00f0ff" }}
                >
                  {activeProduct.tagline}
                </span>
              </div>

              {/* Description */}
              <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
                {activeProduct.description}
              </p>

              {/* Key Features Chips */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {activeProduct.features.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1 rounded-md border border-white/8 bg-white/5 px-2 py-0.5 text-[10px] sm:text-[11px] text-white/80 font-mono"
                  >
                    <Check
                      size={11}
                      className="shrink-0"
                      style={{ color: activeProduct.accent || "#00f0ff" }}
                    />
                    <span>{f}</span>
                  </span>
                ))}
              </div>

              {/* ======================================================== */}
              {/* DISPLAY AREA: Cloud Web Image OR 3-Phone Mockup Deck      */}
              {/* ======================================================== */}
              {currentViewMode === "mobile" ? (
                /* --- 3-PHONE SIDE-BY-SIDE INTERACTIVE SWIPE / SCROLL DECK --- */
                <div className="relative mt-3 w-full h-[190px] sm:h-[230px] xl:h-[260px] rounded-xl overflow-hidden border border-[#00f0ff]/30 bg-[#050813] shadow-inner p-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2 border-b border-white/8 pb-1 px-1">
                    <div className="flex items-center gap-1">
                      {mobileDeckScreens.map((s, idx) => (
                        <button
                          key={s.id}
                          onClick={() => scrollCardToPhone(idx)}
                          className={`rounded-full px-2 py-0.5 font-mono text-[9px] transition-all cursor-pointer ${
                            idx === focusedMobilePhone
                              ? "bg-white/15 text-white font-bold border border-white/30"
                              : "text-muted hover:text-white"
                          }`}
                          style={{
                            borderColor: idx === focusedMobilePhone ? s.accent : undefined,
                            color: idx === focusedMobilePhone ? s.accent : undefined,
                          }}
                        >
                          {s.label.split(" ")[1]}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 font-mono text-[9px] text-muted">
                      <Hand size={10} className="text-[#00f0ff] animate-pulse" />
                      <span>Swipe 3 screens</span>
                    </div>
                  </div>

                  <div
                    ref={cardScrollRef}
                    className="flex items-center gap-3 overflow-x-auto scroll-smooth py-1 px-2 scrollbar-none snap-x snap-mandatory"
                  >
                    {mobileDeckScreens.map((s, idx) => {
                      const isFocused = idx === focusedMobilePhone;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setFocusedMobilePhone(idx)}
                          className={`shrink-0 snap-center transition-all duration-300 cursor-pointer ${
                            isFocused ? "scale-100 opacity-100" : "scale-90 opacity-70 hover:opacity-90"
                          }`}
                        >
                          <div
                            className="relative w-[95px] sm:w-[115px] aspect-[9/18.5] rounded-[1.4rem] p-1 shadow-xl transition-all"
                            style={{
                              background: "linear-gradient(145deg, #2a3142, #0e121d 40%, #060911)",
                              border: `1.5px solid ${isFocused ? s.accent : "rgba(255,255,255,0.15)"}`,
                              boxShadow: isFocused ? `0 0 15px ${s.accent}44` : "none",
                            }}
                          >
                            <div className="relative h-full w-full overflow-hidden rounded-[1.2rem] bg-black">
                              <Image
                                src={s.image}
                                alt={s.title}
                                fill
                                sizes="120px"
                                className="object-cover object-top"
                                priority
                              />
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                              <div className="absolute bottom-1 left-1 right-1 z-20 rounded bg-black/80 p-0.5 text-center">
                                <span
                                  className="block font-mono text-[7px] font-bold uppercase truncate"
                                  style={{ color: s.accent }}
                                >
                                  {s.title}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/8 pt-1 px-1 font-mono text-[8px] sm:text-[9px] text-muted">
                    <span className="text-white font-semibold truncate">
                      {mobileDeckScreens[focusedMobilePhone].title}: {mobileDeckScreens[focusedMobilePhone].subtitle}
                    </span>
                    <span
                      className="font-bold uppercase ml-2 shrink-0"
                      style={{ color: mobileDeckScreens[focusedMobilePhone].accent }}
                    >
                      {mobileDeckScreens[focusedMobilePhone].badge}
                    </span>
                  </div>
                </div>
              ) : (
                /* --- DEFAULT DESKTOP SYSTEM PREVIEW MOCKUP BOX --- */
                <div className="relative mt-3 w-full h-[170px] sm:h-[220px] xl:h-[260px] rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-inner group/img">
                  <Image
                    src={activeProduct.heroImage}
                    alt={activeProduct.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-2 transition-transform duration-700 group-hover/img:scale-102"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5" />
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/8 pt-2.5">
                <ButtonLink
                  href={`/products/${activeProduct.slug}`}
                  className="flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 font-mono text-xs font-semibold text-white transition-all shadow-md cursor-pointer"
                  style={{
                    backgroundColor: `${activeProduct.accent || "#00f0ff"}22`,
                    border: `1px solid ${activeProduct.accent || "#00f0ff"}55`,
                  }}
                >
                  <span>Explore Architecture</span>
                  <ArrowRight size={13} />
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  className="rounded-xl px-3.5 py-1.5 font-mono text-xs"
                >
                  Request Demo
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE PAGINATION INDICATOR BARS (Visible only on < lg)       */}
        {/* ============================================================ */}
        <div className="lg:hidden flex items-center justify-center gap-1 pt-2 pb-1">
          {products.map((p, index) => {
            const isCurrent = index === activeIndex;
            return (
              <button
                key={p.slug}
                onClick={() => handleSelectProduct(index)}
                aria-label={`Jump to system ${index + 1}`}
                className="h-1.5 transition-all duration-300 rounded-full cursor-pointer"
                style={{
                  width: isCurrent ? "24px" : "6px",
                  backgroundColor: isCurrent ? (activeProduct.accent || "#00f0ff") : "rgba(255,255,255,0.2)",
                  boxShadow: isCurrent ? `0 0 8px ${activeProduct.accent || "#00f0ff"}` : "none",
                }}
              />
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* BOTTOM PRODUCT PILLS RAIL: DESKTOP ONLY (Instant Access)     */}
        {/* ============================================================ */}
        <div className="hidden lg:block border-t border-white/8 pt-2">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {products.map((p, index) => {
              const isCurrent = index === activeIndex;
              const meta = productMeta[p.slug] || {
                code: p.shortName.slice(0, 3).toUpperCase(),
                label: p.shortName,
              };

              return (
                <button
                  key={p.slug}
                  onClick={() => handleSelectProduct(index)}
                  className={`group flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[11px] sm:text-xs transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "border-[#00f0ff] bg-[#00f0ff]/15 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                      : "border-white/10 bg-[#070c18] text-muted hover:border-white/25 hover:text-white"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-150"
                    style={{
                      backgroundColor: isCurrent ? (p.accent || "#00f0ff") : "rgba(255,255,255,0.3)",
                      boxShadow: isCurrent ? `0 0 8px ${p.accent || "#00f0ff"}` : "none",
                    }}
                  />
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
