"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Layers, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

export function ProductUniverseShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isManualRef = useRef(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeProduct = products[activeIndex] || products[0];

  // Listen exclusively to GSAP ScrollTrigger's pinned scrub event with zero listener conflicts
  useEffect(() => {
    const handleStep = (e: Event) => {
      if (isManualRef.current) return;
      const customEvent = e as CustomEvent<{ progress: number }>;
      const progress = Math.max(0, Math.min(0.999, customEvent.detail?.progress ?? 0));
      const newIndex = Math.min(
        products.length - 1,
        Math.floor(progress * products.length)
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener("universe-scroll-step", handleStep);
    return () => {
      window.removeEventListener("universe-scroll-step", handleStep);
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    };
  }, []);

  const handleSelectProduct = (index: number) => {
    setActiveIndex(index);
    isManualRef.current = true;
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    // Allow user to explore manually; re-enable scroll sync after 3.5s of idle
    manualTimeoutRef.current = setTimeout(() => {
      isManualRef.current = false;
    }, 3500);
  };

  const handleNext = () => {
    handleSelectProduct((activeIndex + 1) % products.length);
  };

  const handlePrev = () => {
    handleSelectProduct((activeIndex - 1 + products.length) % products.length);
  };

  return (
    <section
      id="product-universe"
      className="universe-section relative border-y border-white/8 bg-[#090b08] py-24 sm:py-32"
    >
      {/* Dynamic ambient background glow that shifts color with active product */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full opacity-25 blur-[140px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activeProduct.accent || "#d8ff5f"}, transparent 70%)`,
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="02 / Product universe"
            title="One Core. Many Possibilities."
            body="Scroll or click to explore each application powered by our unified business core engine."
          />

          {/* Quick Counter & Nav Buttons */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <span className="font-mono text-sm tracking-widest text-muted">
              <strong className="text-white font-medium text-lg">
                {String(activeIndex + 1).padStart(2, "0")}
              </strong>{" "}
              / {String(products.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous product"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-all hover:border-accent hover:bg-accent/10 hover:text-accent active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next product"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition-all hover:border-accent hover:bg-accent/10 hover:text-accent active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Quick Pill Bar */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-4 pt-1 scrollbar-none">
          {products.map((p, index) => {
            const isCurrent = index === activeIndex;
            return (
              <button
                key={p.slug}
                onClick={() => handleSelectProduct(index)}
                className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs transition-all duration-300 ${
                  isCurrent
                    ? "border-accent bg-accent/15 text-white shadow-[0_0_18px_rgba(216,255,95,0.25)]"
                    : "border-white/10 bg-[#121510] text-muted hover:border-white/25 hover:text-white"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-150"
                  style={{
                    backgroundColor: isCurrent ? (p.accent || "#d8ff5f") : "rgba(255,255,255,0.3)",
                    boxShadow: isCurrent ? `0 0 8px ${p.accent || "#d8ff5f"}` : "none",
                  }}
                />
                {p.shortName}
              </button>
            );
          })}
        </div>

        {/* Main Stage: Orbit Ring Visual on Left + Persistent Showcase Card on Right */}
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          {/* Left: Interactive Radial Engine Visual */}
          <div className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-none">
            {/* Outer Decorative Rings */}
            <div className="absolute inset-[4%] rounded-full border border-white/10" />
            <div className="absolute inset-[18%] rounded-full border border-dashed border-white/15 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-[32%] rounded-full border border-white/10" />

            {/* Central Core Pulse */}
            <div
              className="absolute inset-[38%] grid place-items-center rounded-full border text-center transition-all duration-500"
              style={{
                borderColor: `${activeProduct.accent || "#d8ff5f"}66`,
                backgroundColor: `${activeProduct.accent || "#d8ff5f"}12`,
                boxShadow: `0 0 50px ${activeProduct.accent || "#d8ff5f"}22`,
              }}
            >
              <div>
                <span
                  className="mx-auto mb-2 block h-2.5 w-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: activeProduct.accent || "#d8ff5f" }}
                />
                <p
                  className="font-mono text-[9px] uppercase tracking-[.25em]"
                  style={{ color: activeProduct.accent || "#d8ff5f" }}
                >
                  Core Engine
                </p>
                <strong className="mt-1 block text-sm sm:text-base font-semibold tracking-tight text-white">
                  Nexoo AI OS
                </strong>
                <span className="font-mono text-[9px] text-muted block mt-0.5">
                  Synchronized
                </span>
              </div>
            </div>

            {/* Orbital Nodes positioned dynamically around the ring */}
            {products.map((p, index) => {
              const total = products.length;
              const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
              const radius = 43; // percentage from center
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const isCurrent = index === activeIndex;

              return (
                <button
                  key={p.slug}
                  onClick={() => handleSelectProduct(index)}
                  aria-label={`Select ${p.name}`}
                  className={`universe-node absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${
                    isCurrent
                      ? "scale-110 border-white bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.6)] z-20 font-semibold px-3 py-1.5 text-[11px]"
                      : "border-white/12 bg-[#0e110c] text-muted hover:border-white/30 hover:text-white px-2.5 py-1 text-[9px] sm:text-[10px]"
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {p.shortName}
                </button>
              );
            })}
          </div>

          {/* Right: Persistent Showcase Container (Does NOT unmount, smoothly crossfades) */}
          <div
            className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#131610] to-[#0a0c09] p-6 shadow-2xl transition-all duration-500 sm:p-8 hover:border-white/25"
            style={{
              boxShadow: `0 20px 60px -20px ${activeProduct.accent || "#d8ff5f"}22`,
            }}
          >
            {/* Top Bar with Category, Number & Live Status */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300"
                  style={{
                    backgroundColor: `${activeProduct.accent || "#d8ff5f"}22`,
                    color: activeProduct.accent || "#d8ff5f",
                    border: `1px solid ${activeProduct.accent || "#d8ff5f"}44`,
                  }}
                >
                  {activeProduct.category}
                </span>
                <span className="font-mono text-xs text-muted">
                  Direction {String(activeIndex + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
                <span
                  className="h-2 w-2 rounded-full animate-pulse transition-colors duration-300"
                  style={{ backgroundColor: activeProduct.accent || "#d8ff5f" }}
                />
                Active Capability
              </div>
            </div>

            {/* Product Title & Tagline */}
            <div className="mt-6 min-h-[90px]">
              <h3 className="text-3xl font-medium tracking-tight text-white sm:text-4xl transition-all duration-300">
                {activeProduct.name}
              </h3>
              <p className="mt-2 text-base font-normal text-muted max-w-xl transition-all duration-300">
                {activeProduct.tagline}
              </p>
            </div>

            {/* Crossfading Preloaded Image Stack: Ultra-smooth, zero flicker */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#060805]">
              {/* Fake Mac Window Bar */}
              <div className="flex h-9 items-center justify-between border-b border-white/8 bg-[#0d100c] px-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {activeProduct.name} · Preview
                </span>
                <span
                  className="h-2 w-2 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: activeProduct.accent || "#d8ff5f" }}
                />
              </div>

              {/* Multi-layered Crossfade Image Container */}
              <div className="relative h-[250px] sm:h-[320px] w-full overflow-hidden bg-[#060805]">
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
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={idx < 5}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c09] via-transparent to-transparent opacity-75" />
                    </div>
                  );
                })}

                {/* Persistent Glassmorphic Focus Pill inside image */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl border border-white/12 bg-black/70 p-3 backdrop-blur-md">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted block">
                      Operational Focus
                    </span>
                    <span className="text-xs font-medium text-white line-clamp-1">
                      {activeProduct.shortDescription}
                    </span>
                  </div>
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
                    style={{
                      backgroundColor: `${activeProduct.accent || "#d8ff5f"}26`,
                      color: activeProduct.accent || "#d8ff5f",
                    }}
                  >
                    <Sparkles size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features List */}
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {activeProduct.features.slice(0, 4).map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 rounded-lg border border-white/6 bg-white/[.02] px-3 py-2 text-xs text-muted"
                >
                  <Check
                    size={14}
                    style={{ color: activeProduct.accent || "#d8ff5f" }}
                    className="shrink-0 transition-colors duration-300"
                  />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <ButtonLink
                href={`/products/${activeProduct.slug}`}
                className="gap-2"
              >
                <span>Explore {activeProduct.shortName}</span>
                <ArrowRight size={16} />
              </ButtonLink>

              <div className="flex items-center gap-2 text-xs text-muted font-mono">
                <Layers size={14} />
                <span>Industries: {activeProduct.industries.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
