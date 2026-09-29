"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Gem, Zap, Smartphone, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  {
    id: "jewellery",
    icon: Gem,
    eyebrow: "Pillar 01 · Specialization",
    title: "Jewellery & Digital Gold Cloud Suite",
    description:
      "A purpose-engineered ecosystem for gold, silver, and diamond jewelers. Digitizes savings schemes, passbooks, and counter valuation with automated daily metal rate feeds.",
    metrics: "+340% Scheme Growth",
    accent: "#efc87a",
    gradient: "from-[#efc87a]/20 via-transparent to-transparent",
    image: "/images/products/chit-fund.webp",
    features: [
      "Digital Gold & Silver Chit Schemes",
      "Customer Mobile Passbook & Online Pay",
      "Daily Rate Comparison & Exchange App",
      "Multi-Branch Vault & Ledger Reconciliation",
    ],
    primarySlug: "gold-silver-chit-fund",
    badge: "Jewellery Flagship",
  },
  {
    id: "retail-pos",
    icon: Zap,
    eyebrow: "Pillar 02 · Velocity",
    title: "High-Speed Retail & POS Cloud",
    description:
      "Sub-second counter checkout engineered for high-throughput retail stores. Built with offline-first resiliency, rapid barcode scanning, and multi-till reconciliation.",
    metrics: "0.4s Fast Checkout",
    accent: "#00f0ff",
    gradient: "from-[#00f0ff]/20 via-transparent to-transparent",
    image: "/images/products/retail-pos.webp",
    features: [
      "Sub-Second Touch & Barcode Billing",
      "Offline-First Continuous Counter Mode",
      "Integrated UPI, Card & Cash Tills",
      "Automated End-of-Day Reconciliation",
    ],
    primarySlug: "retail-pos",
    badge: "Counter Velocity",
  },
  {
    id: "commerce",
    icon: Smartphone,
    eyebrow: "Pillar 03 · Omnichannel",
    title: "Omnichannel Commerce & Mobile Apps",
    description:
      "Put your store into your customer's pocket. High-conversion mobile commerce apps and custom web storefronts synchronizing live catalog inventory and rewards.",
    metrics: "3.2x Repeat Orders",
    accent: "#a855f7",
    gradient: "from-[#a855f7]/20 via-transparent to-transparent",
    image: "/images/products/ecommerce-mobile.webp",
    features: [
      "Native iOS & Android Customer Apps",
      "Live Omnichannel Stock Synchronization",
      "Automated WhatsApp & Push Alerts",
      "Tiered Loyalty & Referral Rewards",
    ],
    primarySlug: "ecommerce-mobile",
    badge: "Mobile Continuity",
  },
  {
    id: "enterprise-os",
    icon: Layers,
    eyebrow: "Pillar 04 · Scale",
    title: "Enterprise Business OS & Workforce",
    description:
      "The unifying operating core connecting lead management, customer CRM, employee attendance, hotel reservations, and multi-entity financial accounting.",
    metrics: "99.98% Cloud Uptime",
    accent: "#ff7b00",
    gradient: "from-[#ff7b00]/20 via-transparent to-transparent",
    image: "/images/products/hero-business-os.webp",
    features: [
      "Centralized Multi-Store Telemetry",
      "Integrated CRM Lead & Sales Pipeline",
      "HRM Biometric Attendance & Payroll",
      "Multi-Tenant Zero-Trust Cloud Architecture",
    ],
    primarySlug: "end-to-end-solution",
    badge: "Autonomous Core",
  },
];

export function CorePillars() {
  return (
    <section className="relative border-y border-white/8 bg-[#050814] py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-[#00f0ff]/5 blur-[160px]" />

      <Container className="relative z-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="02 / Strategic Pillars"
            title="Engineered for the 4 Verticals We Dominate."
            body="Instead of fragmented software tools, NexooAI delivers cohesive operational platforms tailored to industry realities."
          />

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted">
            <Sparkles size={14} className="text-[#00f0ff]" />
            <span>Unified Architecture</span>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] border border-white/10 bg-gradient-to-b from-[#0a0f22] to-[#060a16] p-7 sm:p-9 shadow-2xl transition-all duration-500 hover:border-white/25 hover:shadow-[0_15px_60px_-15px_rgba(0,0,0,0.9)]"
              >
                {/* Top Corner Glow on Hover */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ backgroundColor: pillar.accent }}
                />

                <div>
                  {/* Header Row with Icon, Metric and Badge */}
                  <div className="flex items-center justify-between border-b border-white/8 pb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${pillar.accent}1a`,
                          color: pillar.accent,
                          border: `1px solid ${pillar.accent}33`,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted block">
                          {pillar.eyebrow}
                        </span>
                        <span
                          className="font-mono text-xs font-semibold"
                          style={{ color: pillar.accent }}
                        >
                          {pillar.badge}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white">
                      {pillar.metrics}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <div className="mt-6">
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {pillar.description}
                    </p>
                  </div>

                  {/* High-Resolution Live Mockup Preview */}
                  <div className="relative mt-6 h-52 sm:h-60 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#04060e]">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a16] via-transparent to-transparent opacity-70" />
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {pillar.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2 text-xs text-slate-300"
                      >
                        <CheckCircle2
                          size={14}
                          style={{ color: pillar.accent }}
                          className="shrink-0"
                        />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-5">
                  <Link
                    href={`/products/${pillar.primarySlug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#00f0ff]"
                  >
                    <span>Explore {pillar.badge} Architecture</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>

                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Production Ready
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
