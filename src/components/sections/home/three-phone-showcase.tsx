"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Hand,
  Check,
} from "lucide-react";

export interface MobileScreen {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  badge: string;
  accent: string;
  image: string;
  description: string;
  features: string[];
}

export const mobileScreens: MobileScreen[] = [
  {
    id: "welcome",
    step: "01 / ONBOARDING",
    title: "Secure Member Onboarding",
    subtitle: "Biometric & Dynamic OTP Login",
    badge: "Identity Core",
    accent: "#00f0ff",
    image: "/images/mobile/app-welcome.webp",
    description:
      "Instant onboarding supporting 6 regional languages, lightning SMS OTP auto-fetch, and biometric pin authentication.",
    features: [
      "Biometric Face/Touch ID",
      "Multi-Language (EN/TA/TE/HI/MAL)",
      "Instant KYC Verification",
      "Zero-Latency OTP Fetch",
    ],
  },
  {
    id: "dashboard",
    step: "02 / PORTFOLIO",
    title: "Live Member Dashboard",
    subtitle: "Realtime Metal Rates & Instant Pay",
    badge: "Flagship Core",
    accent: "#efc87a",
    image: "/images/mobile/app-dashboard.webp",
    description:
      "Real-time metal rate ticker (Gold 22K/24K & Silver), active chit passbooks, investment growth metrics, and 1-tap UPI checkout.",
    features: [
      "Live Market Metal Feeds",
      "Interactive Digital Passbook",
      "Sub-Second UPI / QR Pay",
      "Instant PDF Receipts",
    ],
  },
  {
    id: "schemes",
    step: "03 / CHIT ENGINE",
    title: "Chit Schemes & Savings Vault",
    subtitle: "Flexible Monthly Weight Plans",
    badge: "Wealth Growth",
    accent: "#a855f7",
    image: "/images/mobile/app-schemes.webp",
    description:
      "Explore and enroll into gold & silver savings schemes with automated monthly bonus calculations and tenure tracking.",
    features: [
      "Weight & Value Schemes",
      "Bonus & Dividend Calculator",
      "Automated Monthly Auto-Debit",
      "Maturity Gold Redemption",
    ],
  },
];

interface ThreePhoneShowcaseProps {
  className?: string;
}

export function ThreePhoneShowcase({
  className = "",
}: ThreePhoneShowcaseProps) {
  // Start with Phone 1 (Dashboard) as default focused center phone
  const [activeIndex, setActiveIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeScreen = mobileScreens[activeIndex] || mobileScreens[1];

  // Scroll to selected phone
  const scrollToPhone = useCallback((index: number) => {
    setActiveIndex(index);
    const container = scrollRef.current;
    const target = phoneRefs.current[index];
    if (!container || !target) return;

    const containerWidth = container.clientWidth;
    const targetLeft = target.offsetLeft;
    const targetWidth = target.clientWidth;

    // Center the target phone in the container
    const scrollTarget = targetLeft - (containerWidth / 2) + (targetWidth / 2);
    container.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: "smooth",
    });
  }, []);

  // Update active index based on scroll position
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    phoneRefs.current.forEach((el, index) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.clientWidth / 2;
      const distance = Math.abs(containerCenter - elCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  }, [activeIndex]);

  // Center initial phone on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToPhone(1);
    }, 200);
    return () => clearTimeout(timer);
  }, [scrollToPhone]);

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      // Snap to closest phone
      handleScroll();
    }
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Ambient Glow matching active screen accent */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full opacity-25 blur-[140px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activeScreen.accent}, transparent 70%)`,
        }}
      />

      {/* Top Controls Bar: Step Indicators & Prev/Next Chevrons */}
      <div className="relative z-20 mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        {/* Left: Interactive Screen Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {mobileScreens.map((s, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={s.id}
                onClick={() => scrollToPhone(idx)}
                className={`group flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? "border-white/40 bg-white/10 text-white shadow-lg"
                    : "border-white/10 bg-black/40 text-muted hover:border-white/20 hover:text-white"
                }`}
                style={{
                  borderColor: isCurrent ? s.accent : undefined,
                  boxShadow: isCurrent ? `0 0 16px ${s.accent}44` : undefined,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: s.accent,
                    boxShadow: isCurrent ? `0 0 8px ${s.accent}` : "none",
                  }}
                />
                <span className="font-semibold">{s.title.split(" ")[1] || s.title}</span>
                <span className="text-[10px] opacity-60">({s.step.split("/")[0].trim()})</span>
              </button>
            );
          })}
        </div>

        {/* Right: Swipe Tip & Chevrons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-muted">
            <Hand size={13} className="text-[#00f0ff] animate-pulse" />
            <span>Swipe or drag side-by-side</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollToPhone(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous mobile screen"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollToPhone(Math.min(mobileScreens.length - 1, activeIndex + 1))}
              disabled={activeIndex === mobileScreens.length - 1}
              aria-label="Next mobile screen"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3 PHONES SIDE-BY-SIDE INTERACTIVE SWIPE / SCROLL TRACK   */}
      {/* ======================================================== */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`relative z-10 flex items-center justify-start lg:justify-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 sm:py-6 px-4 sm:px-6 cursor-grab active:cursor-grabbing scrollbar-none select-none`}
        style={{
          perspective: "1200px",
        }}
      >
        {mobileScreens.map((screen, idx) => {
          const isFocused = idx === activeIndex;
          return (
            <div
              key={screen.id}
              ref={(el) => {
                phoneRefs.current[idx] = el;
              }}
              onClick={() => scrollToPhone(idx)}
              className={`group/phone relative shrink-0 snap-center transition-all duration-500 cursor-pointer ${
                isFocused
                  ? "scale-100 sm:scale-105 z-20 opacity-100"
                  : "scale-90 sm:scale-95 z-10 opacity-75 hover:opacity-95 hover:scale-100"
              }`}
            >
              {/* Outer Phone Hardware Frame (iPhone 16 Titanium Aesthetic) */}
              <div
                className="relative w-[260px] sm:w-[280px] md:w-[290px] aspect-[9/19] rounded-[3rem] p-2.5 shadow-2xl transition-all duration-500"
                style={{
                  background: "linear-gradient(145deg, #2a3142, #0e121d 40%, #060911)",
                  boxShadow: isFocused
                    ? `0 25px 60px -15px ${screen.accent}55, 0 0 35px ${screen.accent}33, inset 0 1px 2px rgba(255,255,255,0.4)`
                    : "0 20px 40px -10px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.2)",
                  border: `2px solid ${isFocused ? screen.accent : "rgba(255,255,255,0.15)"}`,
                }}
              >
                {/* Physical Titanium Edge Buttons */}
                {/* Volume Up */}
                <span className="absolute -left-[4px] top-24 h-8 w-[3px] rounded-l bg-white/30" />
                {/* Volume Down */}
                <span className="absolute -left-[4px] top-36 h-8 w-[3px] rounded-l bg-white/30" />
                {/* Power Button */}
                <span className="absolute -right-[4px] top-28 h-12 w-[3px] rounded-r bg-white/30" />

                {/* Inner Screen Bezel */}
                <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-black border border-white/10">
                  {/* Dynamic Island Pill */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 flex h-4 w-20 items-center justify-between rounded-full bg-black px-2 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-[#050505] border border-white/10" />
                    <span className="h-2 w-2 rounded-full bg-[#0d1424] border border-blue-500/30" />
                  </div>

                  {/* Status Bar Indicators */}
                  <div className="absolute top-2 left-5 right-5 z-30 flex items-center justify-between text-[9px] font-mono text-white/80 pointer-events-none">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                      <span className="text-[8px] font-bold">5G</span>
                      <div className="h-2 w-3 rounded-xs border border-white/80 p-0.2">
                        <div className="h-full w-2 bg-white" />
                      </div>
                    </div>
                  </div>

                  {/* High Quality Real App Screenshot Image */}
                  <div className="relative h-full w-full">
                    <Image
                      src={screen.image}
                      alt={screen.title}
                      fill
                      sizes="300px"
                      priority={idx === 1}
                      className="object-cover object-top transition-transform duration-700 group-hover/phone:scale-[1.03]"
                    />

                    {/* Subtle High-Tech Gradient Lighting Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Glass Specular Sheen (Curved Highlight Across Screen) */}
                    <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/10 blur-xl" />

                    {/* Bottom Dynamic Floating Caption Inside Phone */}
                    <div className="absolute bottom-3 left-3 right-3 z-30 rounded-xl border border-white/15 bg-black/85 p-2.5 backdrop-blur-md transition-all">
                      <div className="flex items-center justify-between">
                        <span
                          className="font-mono text-[9px] font-bold uppercase tracking-wider"
                          style={{ color: screen.accent }}
                        >
                          {screen.badge}
                        </span>
                        <span className="rounded-full bg-white/10 px-1.5 py-0.5 font-mono text-[8px] text-white/80">
                          {screen.step.split("/")[0].trim()}
                        </span>
                      </div>
                      <p className="mt-1 font-sans text-xs font-semibold text-white truncate">
                        {screen.title}
                      </p>
                      <p className="font-mono text-[9px] text-muted truncate">
                        {screen.subtitle}
                      </p>
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-40 h-1 w-24 rounded-full bg-white/50" />
                  </div>
                </div>
              </div>

              {/* Floor Mirror Reflection Glow */}
              <div
                className="mx-auto mt-2 h-4 w-3/4 rounded-full opacity-40 blur-md transition-all duration-500"
                style={{
                  backgroundColor: isFocused ? screen.accent : "transparent",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* DETAILED ACTIVE SCREEN HIGHLIGHT CARD                     */}
      {/* ======================================================== */}
      <div className="relative z-10 mt-6 rounded-2xl border border-white/10 bg-[#060a16]/90 p-5 sm:p-6 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left: Active Screen Narrative */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span
                className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${activeScreen.accent}25`,
                  color: activeScreen.accent,
                  border: `1px solid ${activeScreen.accent}44`,
                }}
              >
                {activeScreen.step}
              </span>
              <span className="font-mono text-xs text-muted">
                Screen {activeIndex + 1} of 3 • Native iOS & Android Engine
              </span>
            </div>

            <h4 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
              {activeScreen.title}
            </h4>
            <p
              className="mt-1 font-mono text-xs sm:text-sm font-medium"
              style={{ color: activeScreen.accent }}
            >
              {activeScreen.subtitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {activeScreen.description}
            </p>

            {/* Feature Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {activeScreen.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 text-xs text-white/90"
                >
                  <Check size={12} style={{ color: activeScreen.accent }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quick Screen Switcher Thumbnails */}
          <div className="flex sm:flex-col gap-2 shrink-0 self-start lg:self-center">
            {mobileScreens.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => scrollToPhone(idx)}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left font-mono text-xs transition-all cursor-pointer ${
                  idx === activeIndex
                    ? "border-white/30 bg-white/10 text-white shadow-md"
                    : "border-white/5 bg-black/40 text-muted hover:border-white/15 hover:text-white"
                }`}
                style={{
                  borderColor: idx === activeIndex ? s.accent : undefined,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: s.accent }}
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-[11px]">{s.title}</span>
                  <span className="text-[9px] text-muted">{s.badge}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
