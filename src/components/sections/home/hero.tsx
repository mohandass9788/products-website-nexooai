import { ArrowDown, Layers3, Zap, ShieldCheck, Activity } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductVisual } from "@/components/ui/product-visual";

export function Hero() {
  return (
    <section className="hero-section relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-36 sm:pb-20 lg:items-center lg:pb-0">
      <div className="hero-grid" />

      {/* Cyber ambient glows based on NexooAI logo gradients */}
      <div className="pointer-events-none absolute right-[-5%] top-[10%] h-[600px] w-[600px] rounded-full bg-[#00f0ff]/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-10%] top-[40%] h-[500px] w-[500px] rounded-full bg-[#a855f7]/10 blur-[140px]" />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div className="hero-copy">
            {/* NexooAI Identity Pill with glowing brain badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 backdrop-blur-xl shadow-[0_0_25px_rgba(0,240,255,0.15)] mb-6">
              <div className="relative h-4 w-4 overflow-hidden rounded-full">
                <Image
                  src="/images/nexooai-logo.png"
                  alt="NexooAI"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#00f0ff]">
                NexooAI Enterprise Operating System
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h1 className="display-title">
              Intelligent Software{" "}
              <br />
              <span className="gradient-text-nexoo">Built Around Your Operating Reality.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
              From specialized jewellery chit schemes and sub-second retail checkout to omnichannel e-commerce and full-scale enterprise ERPs — NexooAI engineers the digital infrastructure for modern businesses.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="#showcase" className="button-primary gap-2">
                <span>Explore Product Matrix</span>
                <span className="text-black">↗</span>
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" className="gap-2">
                <span>Book Architecture Demo</span>
              </ButtonLink>
            </div>

            {/* Quick Live Telemetry Badges */}
            <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 font-mono text-xs text-muted">
                <Zap size={14} className="text-[#00f0ff]" />
                <span className="text-white font-medium">0.4s</span> Checkout Latency
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-muted">
                <ShieldCheck size={14} className="text-[#a855f7]" />
                <span className="text-white font-medium">99.98%</span> System Uptime
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-muted">
                <Activity size={14} className="text-[#ff7b00]" />
                <span className="text-white font-medium">100%</span> Multi-Tenant Isolation
              </div>
            </div>
          </div>

          <div className="hero-scene relative min-h-[420px] lg:min-h-[560px]">
            {/* Main macOS Styled Command Center */}
            <div className="absolute inset-[6%_0_0_2%] rotate-[1.5deg] transition-transform duration-700 hover:rotate-0">
              <ProductVisual
                label="Enterprise Business OS"
                accent="#00f0ff"
                imageSrc="/images/products/hero-business-os.webp"
                tagline="Multi-Store Realtime Dashboard"
                badge="OS Core"
                className="h-full shadow-2xl shadow-black/90 border-white/15"
              />
            </div>

            {/* Floating Live Telemetry Badge 1 */}
            <div className="floating-panel -left-3 top-8 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-white/15">
              <div className="h-2 w-2 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="font-mono text-xs text-white">13 Production Applications</span>
            </div>

            {/* Floating Live Telemetry Badge 2 */}
            <div className="floating-panel bottom-12 right-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-white/15">
              <Layers3 size={14} className="text-[#a855f7]" />
              <span className="font-mono text-xs text-white">Autonomous Core Engine</span>
            </div>

            {/* Mini Mobile App Companion Preview */}
            <div className="absolute -right-4 top-24 w-32 rounded-[2rem] border border-white/15 bg-[#0a0f1e]/90 p-2.5 shadow-2xl backdrop-blur-xl sm:w-44">
              <div className="relative h-56 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#060913]">
                <Image
                  src="/images/products/ecommerce-mobile.webp"
                  alt="Mobile Commerce"
                  fill
                  className="object-cover opacity-85"
                  sizes="180px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-[#040711]/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block rounded px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider bg-[#00f0ff]/20 text-[#00f0ff]">
                    Mobile Native
                  </span>
                  <p className="mt-1 text-xs font-semibold text-white">
                    Live Member Sync
                  </p>
                  <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                    <span className="block h-full w-4/5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted lg:absolute lg:bottom-8">
          <ArrowDown size={14} className="animate-bounce text-[#00f0ff]" />
          Scroll to explore architecture
        </div>
      </Container>
    </section>
  );
}
