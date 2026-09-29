"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Globe,
  Pause,
  Play,
} from "lucide-react";
import { products } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

// 3-letter high-tech badge acronym map
const codeMap: Record<string, string> = {
  "estimate-app": "EST",
  "gold-silver-chit-fund": "CHT",
  "local-shop-billing": "BIL",
  "retail-pos": "POS",
  "ecommerce-web": "WEB",
  "ecommerce-mobile": "MOB",
  hrm: "HRM",
  crm: "CRM",
  "end-to-end-solution": "ERP",
  "hotel-management": "HTL",
  "restaurant-billing": "RES",
  "parking-management": "PRK",
  "railway-lounge-billing": "LNG",
};

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

  // Detect when section is visible in viewport so auto-rotation only runs when visible
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

  // Smooth Auto-Play Loop: Gently rotates through all 13 products every 4.2s
  useEffect(() => {
    if (!isAutoPlaying || isHovered || !isInView) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalProducts);
    }, 4200);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, isInView, totalProducts]);

  const handleSelectProduct = (index: number) => {
    setActiveIndex(index);
    // Pause auto-rotation for 7s when user manually interacts
    setIsHovered(true);
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 7000);
  };

  const handleNext = () => {
    handleSelectProduct((activeIndex + 1) % totalProducts);
  };

  const handlePrev = () => {
    handleSelectProduct((activeIndex - 1 + totalProducts) % totalProducts);
  };

  // Centered Wheel Rotation:
  // Base angle for node 0 is 270deg (12 o'clock / Apex focus position).
  // Each node i is at (270 + i * stepAngle)deg.
  // Rotating the container by -(activeIndex * stepAngle) locks the active node precisely at 270deg (12 o'clock Apex)!
  const wheelRotation = -(activeIndex * stepAngle);

  return (
    <section
      ref={sectionRef}
      id="product-universe"
      className="universe-section relative border-y border-white/8 bg-[#040711] py-20 lg:py-28 overflow-hidden"
    >
      {/* Dynamic central ambient glow that shifts color with active product */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full opacity-20 blur-[160px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activeProduct.accent || "#00f0ff"}, transparent 70%)`,
        }}
      />

      <Container className="relative z-10 w-full max-w-[1520px] px-4 sm:px-8 lg:px-12">
        {/* Header Row */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="02 / Product Universe"
            title="One Core. Many Possibilities."
            body="A centralized orbital architecture powering 13 synchronized enterprise systems around NeXooAI's unified core engine."
          />

          {/* Quick Controls: Auto-Orbit Toggle, Counter & Prev/Next */}
          <div className="flex items-center gap-4 self-start md:self-end">
            {/* Auto-Play Toggle Chip */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-muted backdrop-blur-md hover:border-[#00f0ff]/50 hover:text-white transition-all cursor-pointer shadow-lg"
              title={isAutoPlaying ? "Click to Pause Auto-Rotation" : "Click to Resume Auto-Rotation"}
            >
              {isAutoPlaying && !isHovered ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-[#00f0ff] animate-ping" />
                  <span className="text-white font-medium">Auto-Orbiting</span>
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-all hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] active:scale-95 cursor-pointer shadow-md"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next product"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-all hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 hover:text-[#00f0ff] active:scale-95 cursor-pointer shadow-md"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Category & Product Pill Filter Bar */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
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

        {/* ============================================================ */}
        {/* CENTERPIECE: Centered Gyroscope Orbiting Wheel               */}
        {/* ============================================================ */}
        <div
          className="mt-12 flex flex-col items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Outer Wheel Container */}
          <div className="relative aspect-square w-full max-w-[480px] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[680px] p-4">
            {/* Concentric Decorative Radar / HUD Rings */}
            <div className="absolute inset-[3%] rounded-full border border-white/8 pointer-events-none" />
            <div className="absolute inset-[15%] rounded-full border border-dashed border-white/12 animate-[spin_160s_linear_infinite] pointer-events-none" />
            <div className="absolute inset-[28%] rounded-full border border-white/6 pointer-events-none" />
            <div className="absolute inset-[40%] rounded-full border border-dashed border-white/10 animate-[spin_90s_linear_infinite_reverse] pointer-events-none" />

            {/* Radar Angle Markings */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#00f0ff] tracking-widest font-semibold pointer-events-none">
              ▲ 270° APEX FOCUS
            </span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[8px] text-white/30 tracking-wider pointer-events-none">
              000° E
            </span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/30 tracking-wider pointer-events-none">
              090° S
            </span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[8px] text-white/30 tracking-wider pointer-events-none">
              180° W
            </span>

            {/* Apex 12 O'Clock Focus Reticle & Laser Beam */}
            <div className="absolute top-[8%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none">
              <div
                className="h-12 w-12 rounded-full border-2 border-[#00f0ff] bg-[#00f0ff]/15 shadow-[0_0_35px_#00f0ff] flex items-center justify-center animate-pulse"
              >
                <div className="h-3 w-3 rounded-full bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]" />
              </div>
              {/* Laser connecting from apex node down to central core */}
              <div className="w-[2px] h-24 bg-gradient-to-b from-[#00f0ff] to-transparent opacity-80" />
            </div>

            {/* Central Glowing NeXooAI OS Core */}
            <div
              className="absolute inset-[36%] grid place-items-center rounded-full border text-center transition-all duration-700 z-10 backdrop-blur-xl"
              style={{
                borderColor: `${activeProduct.accent || "#00f0ff"}66`,
                backgroundColor: "#050814f0",
                boxShadow: `0 0 60px ${activeProduct.accent || "#00f0ff"}33, inset 0 0 30px ${activeProduct.accent || "#00f0ff"}22`,
              }}
            >
              <div className="flex flex-col items-center p-3">
                <div className="relative mb-2 h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-2xl border border-white/20 bg-black/80 p-1 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <Image
                    src="/images/nexooai-logo.png"
                    alt="NeXooAI Core"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <span
                  className="font-mono text-[9px] uppercase tracking-[.26em] font-bold"
                  style={{ color: activeProduct.accent || "#00f0ff" }}
                >
                  NeXooAI OS
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-white font-semibold mt-0.5">
                  Core Engine
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-[#00f0ff]/90 block mt-1 tracking-wider">
                  360° SYNCHRONIZED
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
                // Base angle: 270deg (12 o'clock Apex)
                // At activeIndex = index, net angle = 270deg
                const nodeBaseAngle = 270 + index * stepAngle;
                const rad = (nodeBaseAngle * Math.PI) / 180;
                const radiusPercent = 42; // distance from center (percent)
                const x = 50 + radiusPercent * Math.cos(rad);
                const y = 50 + radiusPercent * Math.sin(rad);
                const isCurrent = index === activeIndex;

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
                        ? "z-30 scale-110 rounded-full border-2 font-bold px-3 py-1.5 text-xs shadow-2xl"
                        : "z-20 rounded-full border border-white/15 bg-[#070c1a]/95 text-white/70 hover:border-[#00f0ff]/60 hover:text-white px-2.5 py-1 text-[10px] font-mono hover:scale-110"
                    }`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-50%, -50%) rotate(${counterRotation}deg)`,
                      borderColor: isCurrent ? (p.accent || "#00f0ff") : "rgba(255,255,255,0.15)",
                      backgroundColor: isCurrent ? `${p.accent || "#00f0ff"}25` : "#070c1ae6",
                      color: isCurrent ? "#ffffff" : "rgba(255,255,255,0.75)",
                      boxShadow: isCurrent
                        ? `0 0 25px ${p.accent || "#00f0ff"}88, inset 0 0 10px ${p.accent || "#00f0ff"}44`
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
                        {p.shortName}
                      </span>
                      <span
                        className="rounded px-1 py-0.2 text-[8px] font-mono uppercase"
                        style={{
                          backgroundColor: isCurrent ? `${p.accent || "#00f0ff"}44` : "rgba(255,255,255,0.1)",
                          color: isCurrent ? "#ffffff" : "rgba(255,255,255,0.6)",
                        }}
                      >
                        {code}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick HUD Orbit Subtitle */}
          <div className="mt-4 flex items-center gap-3 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff]" />
            <span>Apex Locked Active System:</span>
            <span
              className="font-bold tracking-wider"
              style={{ color: activeProduct.accent || "#00f0ff" }}
            >
              {activeProduct.name} ({String(activeIndex + 1).padStart(2, "0")}/{String(totalProducts).padStart(2, "0")})
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ACTIVE PRODUCT HERO SPOTLIGHT CARD (Directly below orbit)    */}
        {/* ============================================================ */}
        <div
          className="mt-12 mx-auto w-full max-w-[1240px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0a1024] to-[#040813] p-6 shadow-2xl transition-all duration-500 sm:p-8 md:p-10 hover:border-white/25"
            style={{
              boxShadow: `0 25px 70px -20px ${activeProduct.accent || "#00f0ff"}28`,
            }}
          >
            {/* Top Bar with Category, Module Number & Live Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span
                  className="rounded-full px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
                  style={{
                    backgroundColor: `${activeProduct.accent || "#00f0ff"}22`,
                    color: activeProduct.accent || "#00f0ff",
                    border: `1px solid ${activeProduct.accent || "#00f0ff"}44`,
                  }}
                >
                  {activeProduct.category}
                </span>
                <span className="font-mono text-xs text-muted">
                  System Architecture {String(activeIndex + 1).padStart(2, "0")} / {String(totalProducts).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-muted">
                <span
                  className="h-2 w-2 rounded-full animate-pulse transition-colors duration-300"
                  style={{ backgroundColor: activeProduct.accent || "#00f0ff" }}
                />
                <span className="text-white font-medium">Active in NeXooAI OS</span>
              </div>
            </div>

            {/* Split Content: Left Details + Right Interactive Product Mockup */}
            <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
              {/* Left Column: Product Info & Highlights */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {activeProduct.name}
                  </h3>
                  <p
                    className="mt-2 font-mono text-sm sm:text-base font-semibold"
                    style={{ color: activeProduct.accent || "#00f0ff" }}
                  >
                    {activeProduct.tagline}
                  </p>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted line-clamp-3">
                    {activeProduct.description}
                  </p>

                  {/* 4 Key Enterprise Capabilities */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeProduct.features.slice(0, 4).map((f) => (
                      <div
                        key={f}
                        className="flex items-start gap-2.5 rounded-xl border border-white/6 bg-white/[0.03] p-3 backdrop-blur-sm"
                      >
                        <div
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: `${activeProduct.accent || "#00f0ff"}25`,
                            color: activeProduct.accent || "#00f0ff",
                          }}
                        >
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="text-xs text-white/90 leading-tight font-medium">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Links */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <ButtonLink
                    href={`/products/${activeProduct.slug}`}
                    variant="primary"
                    className="group flex items-center gap-2 px-6 py-3 text-sm font-semibold"
                  >
                    <span>Explore Full System</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </ButtonLink>
                  <ButtonLink
                    href="/contact"
                    variant="secondary"
                    className="px-5 py-3 text-sm font-medium"
                  >
                    Request Enterprise Demo
                  </ButtonLink>
                </div>
              </div>

              {/* Right Column: High-Tech Software Screenshot Mockup */}
              <div className="relative mx-auto w-full max-w-[540px]">
                {/* Ambient Glow behind the mockup */}
                <div
                  className="pointer-events-none absolute -inset-2 rounded-2xl opacity-40 blur-xl transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle, ${activeProduct.accent || "#00f0ff"}, transparent 70%)`,
                  }}
                />

                {/* Mockup Frame with Glassmorphism */}
                <div
                  className="relative overflow-hidden rounded-2xl border bg-[#050914] p-2.5 transition-all duration-500 shadow-2xl"
                  style={{
                    borderColor: `${activeProduct.accent || "#00f0ff"}44`,
                  }}
                >
                  {/* Top Window Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500/80" />
                      <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                      <span className="h-2 w-2 rounded-full bg-green-500/80" />
                    </div>
                    <span className="font-mono text-[10px] text-muted">
                      nexooai.os / {activeProduct.slug}
                    </span>
                    <div className="flex items-center gap-1">
                      <Globe size={11} className="text-muted" />
                      <span className="font-mono text-[9px] text-[#00f0ff]">v2.6</span>
                    </div>
                  </div>

                  {/* High Quality UI Mockup Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-black/60">
                    <Image
                      src={activeProduct.heroImage}
                      alt={activeProduct.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 540px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority={activeIndex === 0}
                    />

                    {/* Gradient Overlay for high-tech HUD feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-transparent to-transparent opacity-60" />

                    {/* Floating Bottom Badge inside Screenshot */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/10 bg-black/75 px-3 py-2 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <Cpu size={14} style={{ color: activeProduct.accent || "#00f0ff" }} />
                        <span className="font-mono text-xs font-medium text-white">
                          NeXooAI Unified Integration
                        </span>
                      </div>
                      <span
                        className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold"
                        style={{
                          backgroundColor: `${activeProduct.accent || "#00f0ff"}25`,
                          color: activeProduct.accent || "#00f0ff",
                        }}
                      >
                        100% READY
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
