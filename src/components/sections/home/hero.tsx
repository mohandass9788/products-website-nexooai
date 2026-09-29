import { ArrowDown, Layers3, Sparkles } from "lucide-react";
import Image from "next/image";
import { brand } from "@/config/brand";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductVisual } from "@/components/ui/product-visual";

export function Hero() {
  return (
    <section className="hero-section relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-36 sm:pb-20 lg:items-center lg:pb-0">
      <div className="hero-grid" />
      
      {/* Ambient glowing radial orb behind the hero scene */}
      <div className="pointer-events-none absolute right-[-5%] top-[15%] h-[550px] w-[550px] rounded-full bg-accent/10 blur-[130px]" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div className="hero-copy">
            <p className="eyebrow">{brand.tagline}</p>
            <h1 className="display-title mt-6">
              One Technology Partner.
              <br />
              <span className="text-accent">Every Business.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
              {brand.heroDescription}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/products">Explore products</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Talk to us
              </ButtonLink>
            </div>
          </div>

          <div className="hero-scene relative min-h-[420px] lg:min-h-[560px]">
            <div className="absolute inset-[6%_0_0_2%] rotate-[2deg] transition-transform duration-700 hover:rotate-0">
              <ProductVisual
                label="Enterprise Business OS"
                accent="#d8ff5f"
                imageSrc="/images/products/hero-business-os.webp"
                tagline="Multi-Store Realtime Dashboard"
                badge="OS Core"
                className="h-full shadow-2xl shadow-black/80"
              />
            </div>

            <div className="floating-panel left-[-10px] top-6 animate-pulse">
              <Sparkles size={14} className="text-accent" />
              <span>13 Connected Products</span>
            </div>

            <div className="floating-panel bottom-12 right-2">
              <Layers3 size={14} className="text-accent" />
              <span>Unified Business Core</span>
            </div>

            {/* Mobile Commerce Mini Preview */}
            <div className="absolute -right-4 top-20 w-32 rounded-[2rem] border border-white/12 bg-[#10130e]/90 p-2 shadow-2xl backdrop-blur-xl sm:w-40">
              <div className="relative h-52 overflow-hidden rounded-[1.4rem] border border-white/8 bg-[#0b0d0a]">
                <Image
                  src="/images/products/ecommerce-mobile.webp"
                  alt="Mobile Commerce"
                  fill
                  className="object-cover opacity-80"
                  sizes="160px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-accent">
                    Mobile App
                  </p>
                  <p className="text-xs font-semibold text-white">
                    Live Ordering
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10">
                    <span className="block h-full w-4/5 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted lg:absolute lg:bottom-8">
          <ArrowDown size={14} className="animate-bounce text-accent" />
          Scroll to explore
        </div>
      </Container>
    </section>
  );
}
