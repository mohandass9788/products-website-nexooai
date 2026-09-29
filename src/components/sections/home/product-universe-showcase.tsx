"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import { products } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

export function ProductUniverseShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalProducts = products.length; // 13
  const stepAngle = 360 / totalProducts; // ~27.692 deg
  const activeProduct = products[activeIndex] || products[0];

  // Detect when section is visible in viewport so auto-rotation only runs when user sees it
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth Auto-Play Loop: Gently rotates through all 13 products every 3.5s
  useEffect(() => {
    if (!isAutoPlaying || isHovered || !isInView) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalProducts);
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, isInView, totalProducts]);

  const handleSelectProduct = (index: number) => {
    setActiveIndex(index);
    // Pause auto-rotation for 6s when user clicks so they can read comfortably
    setIsHovered(true);
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 6000);
  };

  const handleNext = () => {
    handleSelectProduct((activeIndex + 1) % totalProducts);
  };

  const handlePrev = () => {
    handleSelectProduct((activeIndex - 1 + totalProducts) % totalProducts);
  };

  // Wheel rotation calculation:
  // Node base angle: 180 + i * stepAngle (180deg is 9 o'clock, pointing to left card).
  // Rotating the wheel by -(activeIndex * stepAngle) keeps the active node locked at 180deg (9 o'clock)!
  const wheelRotation = -(activeIndex * stepAngle);

  return (
    <section
      ref={sectionRef}
      id="product-universe"
      className="universe-section relative border-y border-white/8 bg-[#040711] py-20 lg:py-28 overflow-hidden"
    >
      {/* Dynamic ambient background glow that shifts color with active product */}
      <div
        className="pointer-events-none absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full opacity-20 blur-[150px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activeProduct.accent || "#00f0ff"}, transparent 70%)`,
        }}
      />

      <Container className="relative z-10 w-full max-w-[1440px]">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="02 / Product Universe"
            title="One Core. Many Possibilities."
            body="Explore 13 synchronized enterprise systems auto-cycling through NeXooAI's unified core engine."
          />

          {/* Quick Counter, Auto-Play Status & Nav Buttons */}
          <div className="flex items-center gap-4 self-start md:self-end">
            {/* Auto-Play Toggle Chip */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-xs text-muted backdrop-blur-md hover:border-[#00f0ff]/50 hover:text-white transition-all cursor-pointer"
              title={isAutoPlaying ? "Click to Pause Auto-Rotation" : "Click to Resume Auto-Rotation"}
            >
              {isAutoPlaying && !isHovered ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-[#00f0ff] animate-ping" />
                  <span className="text-white font-medium">Auto-Orbit</span>
                  <Pause size={12} className="text-muted" />
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-white/40" />
                  <span>Paused</span>
                  <Play size={12} className="text-[#00f0ff]" />
                </>
              )}
            </button>

            {/* Step Counter */}
            <span className="font-mono text-sm tracking-widest text-muted">
              <strong className="text-white font-medium text-lg">
                {String(activeIndex + 1).padStart(2, "0")}
              </strong>{" "}
              / {String(totalProducts).padStart(2, "0")}
            </span>

            {/* Prev / Next Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous product"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-all hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next product"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-all hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] active:scale-95 cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Category & Product Pill Bar */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {products.map((p, index) => {
            const isCurrent = index === activeIndex;
            return (
              <button
                key={p.slug}
                onClick={() => handleSelectProduct(index)}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? "border-[#00f0ff] bg-[#00f0ff]/15 text-white shadow-[0_0_18px_rgba(0,240,255,0.3)]"
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
                {p.shortName}
              </button>
            );
          })}
        </div>

        {/* Main Stage: Left Large Product Showcase + Right Rotating Orbital Dial */}
        <div
          className="mt-8 grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.35fr_1fr] lg:gap-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left: Large Product Showcase Card (Persistent, Crossfading UI) */}
          <div
            className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0a1024] to-[#040813] p-6 shadow-2xl transition-all duration-500 sm:p-8 hover:border-white/25"
            style={{
              boxShadow: `0 20px 60px -20px ${activeProduct.accent || "#00f0ff"}22`,
            }}
          >
            {/* Top Bar with Category, Number & Live Status */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300"
                  style={{
                    backgroundColor: `${activeProduct.accent || "#00f0ff"}22`,
                    color: activeProduct.accent || "#00f0ff",
                    border: `1px solid ${activeProduct.accent || "#00f0ff"}44`,
                  }}
                >
                  {activeProduct.category}
                </span>
                <span className="font-mono text-xs text-muted">
                  Module {String(activeIndex + 1).padStart(2, "0")} / {String(totalProducts).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
                <span
                  className="h-2 w-2 rounded-full animate-pulse transition-colors duration-300"
                  style={{ backgroundColor: activeProduct.accent || "#00f0ff" }}
                />
                <span className="text-white font-medium">Synchronized</span>
              </div>
            </div>

            {/* Product Title & Tagline */}
            <div className="mt-5 min-h-[75px]">
              <h3 className="text-3xl font-medium tracking-tight text-white sm:text-4xl transition-all duration-300">
                {activeProduct.name}
              </h3>
              <p className="mt-1.5 text-base font-normal text-muted max-w-xl transition-all duration-300">
                {activeProduct.tagline}
              </p>
            </div>

            {/* Crossfading Preloaded Image Stack: Ultra-smooth, zero flicker */}
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#060a15]">
              {/* Fake Mac Window Bar */}
              <div className="flex h-9 items-center justify-between border-b border-white/8 bg-[#090f20] px-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {activeProduct.name} · Live Dashboard
                </span>
                <span
                  className="h-2 w-2 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: activeProduct.accent || "#00f0ff" }}
                />
              </div>

              {/* Multi-layered Crossfade Image Container */}
              <div className="relative h-[250px] sm:h-[300px] xl:h-[340px] w-full overflow-hidden bg-[#040711]">
                {products.map((p, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <div
                      key={p.slug}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={p.heroImage || "/images/products/estimate-app.webp"}
                        alt={p.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        priority={idx < 5}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040813] via-[#040813]/25 to-transparent opacity-80" />
                    </div>
                  );
                })}

                {/* Persistent Glassmorphic Focus Pill inside image */}
                <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between rounded-xl border border-white/12 bg-[#040813]/85 p-3 backdrop-blur-md">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#00f0ff] block">
                      Operating Focus
                    </span>
                    <span className="text-xs font-medium text-white line-clamp-1">
                      {activeProduct.shortDescription}
                    </span>
                  </div>
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
                    style={{
                      backgroundColor: `${activeProduct.accent || "#00f0ff"}26`,
                      color: activeProduct.accent || "#00f0ff",
                    }}
                  >
                    <Sparkles size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features List */}
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {activeProduct.features.slice(0, 4).map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 rounded-lg border border-white/6 bg-white/[.02] px-3 py-2 text-xs text-muted"
                >
                  <Check
                    size={14}
                    style={{ color: activeProduct.accent || "#00f0ff" }}
                    className="shrink-0 transition-colors duration-300"
                  />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
              <ButtonLink
                href={`/products/${activeProduct.slug}`}
                className="gap-2"
              >
                <span>Explore {activeProduct.shortName}</span>
                <ArrowRight size={16} />
              </ButtonLink>

              <div className="flex items-center gap-2 text-xs text-muted font-mono">
                <Layers size={14} className="text-[#00f0ff]" />
                <span>Industries: {activeProduct.industries.join(", ")}</span>
              </div>
            </div>
          </div>

          {/* Right: Rotating Orbital Gyroscope / Radar Dial */}
          <div className="relative mx-auto flex flex-col items-center justify-center">
            {/* The Outer Dial Frame */}
            <div className="relative aspect-square w-full max-w-[450px] lg:max-w-[480px] xl:max-w-[520px] p-2">
              {/* Outer Radar Rings & Markings */}
              <div className="absolute inset-[1%] rounded-full border border-white/10" />
              <div className="absolute inset-[13%] rounded-full border border-dashed border-white/15 animate-[spin_120s_linear_infinite]" />
              <div className="absolute inset-[25%] rounded-full border border-white/8" />

              {/* Radar Degree Markings (HUD aesthetics) */}
              <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[8px] text-[#00f0ff]/60 tracking-wider">
                180° BEAM
              </span>
              <span className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/30 tracking-wider">
                270° N
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[8px] text-white/30 tracking-wider">
                000° E
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/30 tracking-wider">
                090° S
              </span>

              {/* 9 O'Clock Laser Focus Reticle (Points directly towards the left showcase card!) */}
              <div className="absolute left-[7%] top-1/2 -translate-y-1/2 z-30 flex items-center pointer-events-none">
                <div
                  className="h-11 w-11 -translate-x-1/2 rounded-full border-2 border-[#00f0ff] bg-[#00f0ff]/15 shadow-[0_0_30px_#00f0ff] flex items-center justify-center animate-pulse"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
                </div>
                {/* Laser beam connecting leftwards across the gap */}
                <div className="h-[2px] w-20 -translate-x-3 bg-gradient-to-l from-[#00f0ff] to-transparent opacity-90" />
              </div>

              {/* Central Glowing NeXooAI OS Core */}
              <div
                className="absolute inset-[36%] grid place-items-center rounded-full border text-center transition-all duration-700 z-10 backdrop-blur-md"
                style={{
                  borderColor: `${activeProduct.accent || "#00f0ff"}66`,
                  backgroundColor: "#050814ee",
                  boxShadow: `0 0 45px ${activeProduct.accent || "#00f0ff"}33`,
                }}
              >
                <div className="flex flex-col items-center p-2">
                  <div className="relative mb-1.5 h-8 w-8 overflow-hidden rounded-xl border border-white/20 bg-black/70 p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <Image
                      src="/images/nexooai-logo.png"
                      alt="NeXooAI Core"
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="font-mono text-[8px] uppercase tracking-[.24em] font-semibold"
                    style={{ color: activeProduct.accent || "#00f0ff" }}
                  >
                    NeXooAI OS
                  </span>
                  <span className="font-mono text-[9px] text-white font-medium">
                    Core Engine
                  </span>
                  <span className="font-mono text-[8px] text-[#00f0ff]/80 block mt-0.5">
                    360° Synchronized
                  </span>
                </div>
              </div>

              {/* Physical Rotating Ring Container */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                }}
              >
                {/* 13 Orbital Satellite Nodes positioned around the 360° circle */}
                {products.map((p, index) => {
                  // Node base angle: 180 + index * stepAngle
                  // So at activeIndex = index, net angle = 180 (9 o'clock)
                  const nodeBaseAngle = 180 + index * stepAngle;
                  const rad = (nodeBaseAngle * Math.PI) / 180;
                  const radiusPercent = 43; // distance from center (percent)
                  const x = 50 + radiusPercent * Math.cos(rad);
                  const y = 50 + radiusPercent * Math.sin(rad);
                  const isCurrent = index === activeIndex;

                  // 3-letter high-tech badge acronym
                  const codeMap: Record<string, string> = {
                    "estimate-app": "EST",
                    "gold-silver-chit-fund": "CHT",
                    "local-shop-billing": "BIL",
                    "retail-pos": "POS",
                    "ecommerce-web": "WEB",
                    "ecommerce-mobile": "MOB",
                    hrm: "HRM",
                    crm: "CRM",
                    "end-to-end": "ERP",
                    hotel: "HTL",
                    restaurant: "RES",
                    parking: "PRK",
                    lounge: "LNG",
                  };
                  const code = codeMap[p.slug] || p.shortName.slice(0, 3).toUpperCase();
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
                          ? "z-30 scale-110 rounded-full border-2 font-bold px-3.5 py-1.5 text-xs shadow-2xl"
                          : "z-20 rounded-full border border-white/15 bg-[#070c1a]/95 text-white/70 hover:border-[#00f0ff]/60 hover:text-white px-2 py-1 text-[9px] font-mono hover:scale-110"
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: `translate(-50%, -50%) rotate(${counterRotation}deg)`,
                        borderColor: isCurrent ? (p.accent || "#00f0ff") : undefined,
                        backgroundColor: isCurrent ? "#ffffff" : undefined,
                        color: isCurrent ? "#000000" : undefined,
                        boxShadow: isCurrent ? `0 0 30px ${p.accent || "#00f0ff"}` : undefined,
                      }}
                    >
                      {isCurrent ? (
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                          <span
                            className="h-2 w-2 rounded-full animate-ping"
                            style={{
                              backgroundColor: p.accent || "#00f0ff",
                            }}
                          />
                          <span>
                            {numStr} · {p.shortName}
                          </span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <span className="h-1 w-1 rounded-full bg-white/40" />
                          <span>{code}</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Status Ticker under the Orbit */}
            <div className="mt-4 flex items-center justify-between gap-4 w-full max-w-[450px] lg:max-w-[480px] xl:max-w-[520px] rounded-xl border border-white/8 bg-[#060a16] px-4 py-2.5 text-xs font-mono text-muted">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-[#00f0ff]" />
                <span className="text-white/90">
                  BEAM LOCK: <strong className="text-[#00f0ff]">{activeProduct.name}</strong>
                </span>
              </div>
              <span className="text-[#00f0ff] font-semibold">180° Focus</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
