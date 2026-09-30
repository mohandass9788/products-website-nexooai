import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, MoveRight, Sparkles, TrendingUp, Smartphone } from "lucide-react";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductVisual } from "@/components/ui/product-visual";
import { ButtonLink } from "@/components/ui/button";
import { ProductUniverseShowcase } from "./product-universe-showcase";

import { ThreePhoneShowcase } from "./three-phone-showcase";

export function ProductUniverse() {
  return (
    <>
      <ProductUniverseShowcase />
      <div id="mobile-app-suite" className="relative border-b border-white/8 bg-[#040711] py-16 lg:py-24 overflow-hidden">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-[.24em] text-[#00f0ff]">
                <Smartphone size={14} />
                <span>03 / Mobile App Suite • Native iOS & Android</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Three Synchronized Native App Experiences.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
                Step into the hands of your customers. Explore the end-to-end mobile flow side-by-side — frictionless onboarding, real-time portfolio telemetry, and automated chit investment plans.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-muted backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-medium">Production Store Build</span>
              </div>
              <ButtonLink
                href="/products/ecommerce-mobile"
                variant="secondary"
                className="font-mono text-xs"
              >
                <span>Mobile Architecture ↗</span>
              </ButtonLink>
            </div>
          </div>

          <ThreePhoneShowcase />
        </Container>
      </div>
    </>
  );
}

export function FeaturedProducts() {
  const featured = [products[7], products[1], products[4]]; // CRM, Chit Fund, E-commerce Web
  return (
    <Section>
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="03 / Featured products"
            title="Built for the work that moves business."
          />
          <ButtonLink href="/products" variant="secondary">
            View all products
          </ButtonLink>
        </div>
        <div className="mt-20 space-y-28">
          {featured.map((product, index) => (
            <article
              key={product.slug}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <div className={index % 2 ? "lg:order-2" : ""}>
                <p className="eyebrow">
                  {product.category} / 0{index + 1}
                </p>
                <h3 className="mt-5 text-4xl font-medium tracking-[-.05em] sm:text-6xl text-white">
                  {product.name}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted">
                  {product.description}
                </p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {product.features.slice(0, 4).map((feature) => (
                    <li
                      className="flex items-center gap-2 text-sm text-foreground/90"
                      key={feature}
                    >
                      <Check className="text-accent shrink-0" size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  className="mt-8"
                  href={`/products/${product.slug}`}
                  variant="text"
                >
                  Explore {product.shortName}
                </ButtonLink>
              </div>
              <ProductVisual
                label={product.shortName}
                accent={product.accent}
                imageSrc={product.heroImage}
                tagline={product.tagline}
                badge={product.category}
                variant={index === 2 ? "phone" : "dashboard"}
                className={index % 2 ? "lg:order-1" : ""}
              />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ProductRail() {
  return (
    <section className="capabilities-rail-section relative overflow-hidden border-y border-white/8 bg-[#090a08] py-20 lg:py-28">
      {/* Header Container */}
      <Container className="mb-10 sm:mb-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="04 / Capabilities"
            title="A system for every side of the business."
            body="Explore our end-to-end software ecosystem engineered for retail, jewellery, hospitality, commerce, and enterprise operations."
          />

          {/* Interactive Progress Indicator */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-muted">
              <span>Progress</span>
              <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/15">
                <div className="rail-progress-bar h-full w-[8%] rounded-full bg-accent transition-all duration-150" />
              </div>
              <span className="rail-count text-white font-semibold">01 / 13</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Horizontal Scrolling Track - Edge-to-edge without container clipping */}
      <div className="capabilities-track flex gap-6 px-6 sm:px-10 lg:px-16 w-max will-change-transform max-lg:overflow-x-auto max-lg:snap-x max-lg:w-full max-lg:pb-6">
        {products.map((product, index) => (
          <Link
            href={`/products/${product.slug}`}
            key={product.slug}
            className="group relative flex h-[430px] w-[320px] sm:w-[380px] shrink-0 max-lg:snap-start flex-col justify-between rounded-[1.8rem] border border-white/10 bg-[#10120f] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_12px_40px_-15px_rgba(216,255,95,0.2)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                  {product.category}
                </span>
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")} / 13
                </span>
              </div>

              {/* Real Product Image Preview in Card */}
              <div className="relative mt-5 h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-[#090b08]">
                <Image
                  src={product.heroImage || "/images/products/estimate-app.webp"}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10120f] via-transparent to-transparent opacity-60" />
                <div
                  className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] backdrop-blur-md"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.75)",
                    color: product.accent || "#d8ff5f",
                    border: `1px solid ${product.accent || "#d8ff5f"}44`,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: product.accent || "#d8ff5f" }}
                  />
                  {product.shortName}
                </div>
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-[-.03em] text-white group-hover:text-accent transition-colors">
                {product.name}
              </h3>
              <p className="mt-2 text-xs leading-5 text-muted line-clamp-2">
                {product.shortDescription}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3.5">
              <span className="font-mono text-xs text-muted group-hover:text-white transition-colors">
                Explore product
              </span>
              <ArrowRight
                className="text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
                size={16}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="05 / Industries"
          title="Industry context changes everything."
          body="We connect product capability to the operating realities of each business."
        />
        <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {industries.map((industry, index) => (
            <Link
              href={`/industries/${industry.slug}`}
              key={industry.slug}
              className="industry-row group grid gap-4 py-7 sm:grid-cols-[.3fr_1fr_1fr_auto] sm:items-center"
            >
              <span className="font-mono text-xs text-muted">
                0{index + 1}
              </span>
              <h3
                className="text-3xl tracking-[-.04em] transition-colors group-hover:text-[var(--row-accent)]"
                style={{ "--row-accent": industry.accent } as React.CSSProperties}
              >
                {industry.name}
              </h3>
              <p className="text-sm leading-6 text-muted">
                {industry.capabilities.join(" · ")}
              </p>
              <MoveRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const stages = ["Discover", "Design", "Develop", "Integrate", "Deploy", "Scale"];
export function EndToEnd() {
  return (
    <Section className="overflow-hidden bg-[#d8ff5f] text-[#0a0c08]">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[.18em]">
          06 / End-to-end
        </p>
        <h2 className="section-title mt-5 max-w-5xl">
          From first idea to lasting momentum.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-black/60">
          One technology partner can hold the full picture—from understanding the
          opportunity to evolving what ships.
        </p>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-black/15 bg-black/15 sm:grid-cols-3 lg:grid-cols-6">
          {stages.map((stage, index) => (
            <div className="e2e-stage bg-[#d8ff5f] p-5 sm:min-h-44" key={stage}>
              <span className="font-mono text-[10px] text-black/50">
                0{index + 1}
              </span>
              <h3 className="mt-16 text-xl font-medium tracking-tight">
                {stage}
              </h3>
            </div>
          ))}
        </div>
        <ButtonLink
          href="/solutions/enterprise-e2e"
          className="mt-10 !bg-black !text-white"
        >
          Explore the journey
        </ButtonLink>
      </Container>
    </Section>
  );
}

export function Services() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="07 / Services"
          title="Capability, all the way through."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-2">
          {services.map((service) => (
            <Link
              href={`/services/${service.slug}`}
              key={service.slug}
              className="group bg-[#0b0d0a] p-6 transition-colors hover:bg-[#11150e] sm:p-9"
            >
              <span className="font-mono text-[10px] text-accent">
                {service.index}
              </span>
              <h3 className="mt-8 text-2xl tracking-[-.04em] sm:text-3xl">
                {service.name}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
                {service.description}
              </p>
              <MoveRight
                className="mt-7 transition-transform group-hover:translate-x-2"
                size={18}
              />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function Proof() {
  return (
    <Section className="border-y border-white/8">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <SectionHeading
            eyebrow="08 / Why us"
            title="The whole system, considered."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                "Business-first",
                "We begin with the operation, customer and outcome—not a predetermined tool.",
              ],
              [
                "Designed together",
                "Strategy, experience and engineering decisions stay connected.",
              ],
              [
                "Built to evolve",
                "Reusable foundations leave room for changing requirements.",
              ],
              [
                "Clear partnership",
                "Visible process and direct collaboration keep the work understandable.",
              ],
            ].map(([title, body]) => (
              <div className="rounded-[1.4rem] border border-white/10 p-6" key={title}>
                <span className="mb-10 block h-2 w-2 rounded-full bg-accent" />
                <h3 className="text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function Work() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="09 / Selected work"
          title="Space for the stories that prove it."
          body="Proven deployment stories with real operations, customer impact and business outcomes."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* Case Study 1: Jewellery Scheme Digitization */}
          <div className="group relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#0d100c] p-8 shadow-2xl transition-all duration-500 hover:border-white/25">
            <Image
              src="/images/case-studies/jewellery-transformation.webp"
              alt="Jewellery Digitization"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b08] via-[#090b08]/70 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                  Case Study / 01
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
                  <TrendingUp size={14} className="text-accent" />
                  +340% Member Growth
                </span>
              </div>

              <div className="mt-40">
                <span className="font-mono text-xs uppercase tracking-widest text-[#efc87a]">
                  Jewellery Retail & Chit Fund
                </span>
                <h3 className="mt-2 max-w-lg text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Digitizing 45+ jewellery retail branches with real-time gold chit savings.
                </h3>
                <p className="mt-4 max-w-md text-sm text-muted">
                  Replaced manual ledger records with a centralized cloud scheme engine, mobile member passbooks, and instant payment settlement.
                </p>
                <div className="mt-6 flex items-center gap-2 font-mono text-xs text-accent">
                  <span>Read case study</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 2: Retail Multi-Store POS Scale */}
          <div className="group relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#0d100c] p-8 shadow-2xl transition-all duration-500 hover:border-white/25">
            <Image
              src="/images/case-studies/retail-scale.webp"
              alt="Retail POS Scale"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b08] via-[#090b08]/70 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                  Case Study / 02
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
                  <Sparkles size={14} className="text-accent" />
                  0.4s Billing Speed
                </span>
              </div>

              <div className="mt-40">
                <span className="font-mono text-xs uppercase tracking-widest text-[#70d7ff]">
                  Modern High-Street Retail POS
                </span>
                <h3 className="mt-2 text-3xl font-medium tracking-tight text-white">
                  Multi-counter POS & live inventory sync across modern high-street stores.
                </h3>
                <p className="mt-4 text-sm text-muted">
                  Zero counter queues during festive peaks, sub-second barcode scans, and unified warehouse stock visibility.
                </p>
                <div className="mt-6 flex items-center gap-2 font-mono text-xs text-accent">
                  <span>Read case study</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section className="overflow-hidden pt-6 pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-gradient-to-b from-[#0a0f24] via-[#070b18] to-[#040711] px-6 py-20 text-center sm:px-14 sm:py-28 shadow-2xl">
          {/* Ambient Cyber Neon Orbs */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] rounded-full bg-gradient-to-r from-[#00f0ff]/20 via-[#a855f7]/20 to-[#ff7b00]/20 blur-[120px]" />

          {/* Logo Emblem Badge */}
          <div className="relative mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 backdrop-blur-xl">
            <div className="relative h-4 w-4 overflow-hidden rounded-full">
              <Image src="/images/nexooai-logo.png" alt="NexooAI" fill sizes="16px" className="object-contain" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#00f0ff]">
              Direct Architect Consultation
            </span>
          </div>

          <h2 className="mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.02]">
            Ready to Engineer Your Next{" "}
            <span className="gradient-text-nexoo">Digital Breakthrough?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
            Connect directly with a NexooAI solutions architect. We will audit your current operational bottlenecks, calculate implementation timelines, and present a live proof-of-concept within 48 hours.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/contact" className="button-primary gap-2">
              <span>Book Architecture Consultation</span>
              <span className="text-black">↗</span>
            </ButtonLink>

            <a
              href="https://wa.me/919876543210?text=Hello%20NexooAI%2C%20I%20want%20to%20schedule%20a%20product%20architecture%20demo."
              target="_blank"
              rel="noopener noreferrer"
              className="button border border-white/15 bg-white/5 text-white hover:bg-white/10 flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-white/8 pt-8 font-mono text-xs text-muted">
            <span>✓ Zero Obligation Review</span>
            <span>✓ Production-Ready Blueprints</span>
            <span>✓ Fixed-Price Milestones</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
