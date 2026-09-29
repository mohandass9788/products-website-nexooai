import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, MoveRight, Sparkles, TrendingUp } from "lucide-react";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductVisual } from "@/components/ui/product-visual";
import { ButtonLink } from "@/components/ui/button";
import { ProductUniverseShowcase } from "./product-universe-showcase";

export function ProductUniverse() {
  return <ProductUniverseShowcase />;
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
    <Section className="border-y border-white/8 bg-[#090a08]">
      <Container>
        <SectionHeading
          eyebrow="04 / Capabilities"
          title="A system for every side of the business."
        />
        <div className="product-rail -mx-5 mt-14 flex snap-x gap-4 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          {products.map((product, index) => (
            <Link
              href={`/products/${product.slug}`}
              key={product.slug}
              className="group min-h-[380px] w-[82vw] max-w-[390px] shrink-0 snap-start rounded-[1.6rem] border border-white/10 bg-[#10120f] p-6 transition-all hover:-translate-y-1 hover:border-white/25 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow !text-[.6rem]">{product.category}</span>
                  <span className="font-mono text-[10px] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Real Product Image Preview in Card */}
                <div className="relative mt-6 h-36 w-full overflow-hidden rounded-xl border border-white/10 bg-[#090b08]">
                  <Image
                    src={product.heroImage || "/images/products/estimate-app.webp"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="340px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10120f] via-transparent to-transparent opacity-60" />
                  <div
                    className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[9px] backdrop-blur-md"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.65)",
                      color: product.accent || "#d8ff5f",
                      border: `1px solid ${product.accent || "#d8ff5f"}33`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: product.accent || "#d8ff5f" }}
                    />
                    {product.shortName}
                  </div>
                </div>

                <h3 className="mt-5 text-2xl tracking-[-.04em] text-white group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted line-clamp-2">
                  {product.shortDescription}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
                <span className="font-mono text-xs text-muted">Learn more</span>
                <ArrowRight
                  className="text-muted transition-all group-hover:translate-x-1 group-hover:text-accent"
                  size={18}
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
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
    <Section className="overflow-hidden pt-6">
      <Container>
        <div className="cta-panel relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-20 text-center sm:px-12 sm:py-28">
          <p className="eyebrow">Ready when you are</p>
          <h2 className="mx-auto mt-5 max-w-5xl text-[clamp(3rem,7vw,7rem)] leading-[.9] tracking-[-.065em]">
            Let’s build what your business needs next.
          </h2>
          <div className="mt-9 flex justify-center">
            <ButtonLink href="/contact">Start a conversation</ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
