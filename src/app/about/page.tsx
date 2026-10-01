import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Globe2,
  Sparkles,
  Users,
  Terminal,
  Cpu,
  ArrowRight,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Company & Team | About NexooAI",
  description:
    "Learn about NexooAI — the enterprise technology partner engineering next-generation retail POS, jewellery chit schemes, mobile commerce, and cloud operating systems.",
};

const stats = [
  { value: "13+", label: "Proprietary Software Engines" },
  { value: "45+", label: "Enterprise Deployments" },
  { value: "0.4s", label: "Peak Counter Billing Latency" },
  { value: "99.9%", label: "Cloud Uptime & SLA Guarantee" },
];

const teamMembers = [
  {
    name: "G Mohandass",
    role: "Founder & Chief Solutions Architect",
    specialty: "Distributed Systems, POS Architecture & Cloud Infrastructure",
    bio: "Pioneering unified business architectures that bridge high-speed retail counters, jewellery chit engines, and resilient multi-tenant cloud backbones.",
    accent: "#00f0ff",
    code: "FOUNDER-01",
  },
  {
    name: "G Sudhakar",
    role: "Co-Founder & Director of Enterprise Sales",
    specialty: "Commercial Partnerships, Retail POS Deployments & Client Strategy",
    bio: "Leading commercial partnerships, large-scale multi-branch store rollouts, and ensuring seamless operational onboarding for retail and jewellery clients.",
    accent: "#efc87a",
    code: "FOUNDER-02",
  },
  {
    name: "Product Design Core",
    role: "Head of UI/UX & Design Systems",
    specialty: "High-Fidelity Cyberpunk Aesthetics & Micro-interactions",
    bio: "Crafting sensory, ergonomic interfaces that make complex enterprise workflows fast, intuitive, and visually breathtaking.",
    accent: "#ff9fbd",
    code: "DSGN-03",
  },
  {
    name: "Vertical Solutions Lab",
    role: "Lead Hardware & Retail Integration",
    specialty: "Hardware Interfacing, Barcodes, Weigh Scales & Offline Sync",
    bio: "Engineering bulletproof cashier ergonomics, thermal printer drivers, and real-time ledger synchronization under festive peak loads.",
    accent: "#7ce8c5",
    code: "OPS-04",
  },
];

const values = [
  {
    icon: Zap,
    title: "Sub-Second Response",
    desc: "Speed is a core feature. We optimize every database query and UI render so cashiers and customers never wait.",
    accent: "#d8ff5f",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Data Compromise",
    desc: "Every transaction, gold scheme ledger, and customer payment record is cryptographically secured with multi-tenant isolation.",
    accent: "#00f0ff",
  },
  {
    icon: Globe2,
    title: "Omnichannel Continuity",
    desc: "Store POS, mobile apps, customer web portals, and executive telemetry operate on a single synchronized truth.",
    accent: "#b9a0ff",
  },
  {
    icon: Cpu,
    title: "Future-Proof Architecture",
    desc: "Engineered on modern decoupled frameworks that scale from single boutique counters to national multi-branch chains.",
    accent: "#ff8067",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="Company / About NexooAI"
        title="We engineer technology around how modern businesses truly operate."
        description="NexooAI is a specialized enterprise product studio and technology partner. We build unified software ecosystems that empower retail networks, jewellery houses, hospitality groups, and ambitious businesses to scale without operational friction."
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="/contact" className="button-primary">
            Partner With Our Team ↗
          </ButtonLink>
          <ButtonLink href="/products" variant="secondary" className="font-mono text-xs">
            Explore Software Suite
          </ButtonLink>
        </div>
      </PageHero>

      {/* Metrics Rail */}
      <section className="border-y border-white/8 bg-[#090b08] py-12">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-white/10 pl-5">
                <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  {stat.value}
                </span>
                <p className="mt-2 text-xs sm:text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Engineering Workspace / Command Center Showcase */}
      <Section className="border-b border-white/8">
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-[#0e121a] to-[#07090e] p-6 sm:p-12 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-[#00f0ff] mb-3">
                  <Terminal size={14} />
                  <span>NexooAI Engineering Command Hub</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
                  Where Production-Grade Software Is Forged.
                </h2>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted leading-relaxed">
                  Our multidisciplinary engineering teams blend rigorous systems architecture, hardware-level POS integration, and sleek mobile design to build systems that never fail under festive peak loads.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Active Development Lab</span>
                </div>
              </div>
            </div>

            {/* Visual Lab Showcase Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#090b08]">
                <Image
                  src="/images/solutions/retail-business.jpg"
                  alt="Retail Lab"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b08] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-mono text-[10px] uppercase text-[#7ce8c5]">
                    Hardware & POS Testing Lab
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Sub-second barcode scanners, thermal printers, and weight-scale telemetry.
                  </p>
                </div>
              </div>

              <div className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#090b08]">
                <Image
                  src="/images/solutions/jewellery-business.jpg"
                  alt="Jewellery Engineering"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b08] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-mono text-[10px] uppercase text-[#efc87a]">
                    Gold Scheme FinTech Studio
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Real-time bullion rates feed, digital chit ledger security, and member passbooks.
                  </p>
                </div>
              </div>

              <div className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#090b08]">
                <Image
                  src="/images/solutions/enterprise-e2e.webp"
                  alt="Cloud Architecture"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b08] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-mono text-[10px] uppercase text-[#d8ff5f]">
                    Enterprise Cloud Node
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Zero-downtime microservices, encrypted offline queues, and instant backups.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Leadership & Engineering Core Team Section */}
      <Section className="border-b border-white/8">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-accent">
                <Users size={14} />
                <span>Multidisciplinary Engineering Talent</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
                The Architects & Builders Behind NexooAI.
              </h2>
            </div>
            <p className="text-sm text-muted max-w-md">
              A tight-knit collective of veteran systems architects, mobile developers, and vertical industry specialists committed to engineering software that outlasts trends.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {teamMembers.map((member) => (
              <div
                key={member.code}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0c0f0c] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/30"
              >
                {/* Ambient glow */}
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-30"
                  style={{ background: member.accent }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                      style={{
                        backgroundColor: `${member.accent}15`,
                        color: member.accent,
                        border: `1px solid ${member.accent}33`,
                      }}
                    >
                      {member.code}
                    </span>
                    <div className="relative h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/images/nexooai-logo.png"
                        alt="NexooAI"
                        fill
                        sizes="16px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-white group-hover:text-accent transition-colors">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs" style={{ color: member.accent }}>
                    {member.role}
                  </p>
                  <p className="mt-3 text-xs text-muted/90 uppercase tracking-wider font-mono">
                    Specialty: {member.specialty}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {member.bio}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/8 pt-4 font-mono text-xs text-muted">
                  <span className="flex items-center gap-1.5 text-white/90">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Production Architecture Certified</span>
                  </span>
                  <span className="text-[10px] text-muted">NexooAI Core</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Core Engineering Pillars */}
      <Section className="border-b border-white/8">
        <Container>
          <p className="eyebrow">Our Core Principles</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-white max-w-3xl">
            What makes our software foundations different.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-[1.6rem] border border-white/10 bg-[#0e100d] p-6 transition-all duration-300 hover:border-white/25 hover:-translate-y-1"
                >
                  <div
                    className="inline-flex rounded-xl p-3 mb-4"
                    style={{
                      backgroundColor: `${val.accent}15`,
                      color: val.accent,
                      border: `1px solid ${val.accent}33`,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{val.title}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Final Callout to Action */}
      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-gradient-to-b from-[#0a0f24] to-[#040711] p-8 sm:p-14 text-center shadow-2xl">
            <h2 className="mx-auto max-w-3xl text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Ready to collaborate with an engineering partner who understands your operational reality?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted">
              Connect directly with our solutions architects. We provide an architectural roadmap and proof-of-concept for your business within 48 hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/contact" className="button-primary">
                Book Architecture Consultation ↗
              </ButtonLink>
              <ButtonLink
                href="/solutions"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                Explore Solutions
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
