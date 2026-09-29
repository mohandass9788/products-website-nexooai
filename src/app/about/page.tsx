import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ShieldCheck, Zap, Globe2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About NexooAI",
  description:
    "Learn about NexooAI — an enterprise software and technology partner specializing in high-performance digital ecosystems, AI-driven automation, and industry-grade solutions.",
};

const process = [
  {
    step: "01",
    title: "Deep Domain Discovery",
    desc: "We dissect your exact operating reality, workflows, and edge cases before writing a single line of code.",
  },
  {
    step: "02",
    title: "High-Fidelity Architecture",
    desc: "From database schemas to low-latency APIs and resilient offline-first UX, we engineer for longevity.",
  },
  {
    step: "03",
    title: "Resilient Engineering",
    desc: "Strict type safety, modern CI/CD, isolated multi-tenant architectures, and enterprise security standards.",
  },
  {
    step: "04",
    title: "Continuous Evolution",
    desc: "Deployment is just day one. We stay closely aligned to support your growth, scale, and feature expansion.",
  },
];

const highlights = [
  {
    icon: Zap,
    title: "Ultra-Fast Operations",
    desc: "Sub-second counter POS and billing experiences engineered for high-volume retail environments.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Grade Reliability",
    desc: "Multi-tenant cloud infrastructure with automated backups, strict tenant isolation, and 99.9% uptime.",
  },
  {
    icon: Globe2,
    title: "Omnichannel Continuity",
    desc: "Seamless synchronization across mobile apps, web storefronts, desktop counters, and admin portals.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About NexooAI"
        title="Technology built around how modern businesses truly operate."
        description="NexooAI is a software engineering partner and product studio. We create unified software ecosystems that empower jewellery businesses, retail networks, hospitality groups, and fast-growing enterprises to scale with confidence."
      />

      <Section className="border-y border-white/8">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Our Vision</p>
              <h2 className="section-title mt-5">
                Make complex business workflows feel fast, unified, and effortlessly scalable.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-muted">
              <p>
                At NexooAI, we believe that software should never force a business to compromise its real-world workflows. The best systems adapt to the rhythm of your team, eliminate repetitive operational friction, and provide total clarity across every transaction.
              </p>
              <p>
                From specialized gold scheme management and high-throughput retail billing to custom mobile apps and enterprise ERPs, our platform suite is built on modern distributed architectures designed to perform reliably under pressure.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-accent/40"
                >
                  <div className="inline-flex rounded-xl border border-accent/20 bg-accent/10 p-3 text-accent">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <p className="eyebrow">Our Engineering Approach</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-4">
            {process.map((item) => (
              <div
                className="flex flex-col justify-between min-h-64 bg-[#0b0d0a] p-6 transition-colors hover:bg-[#10130e]"
                key={item.title}
              >
                <span className="font-mono text-xs font-semibold text-accent">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-.03em]">{item.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 sm:p-12 lg:grid lg:grid-cols-[1.2fr_.8fr] lg:gap-12 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1 text-xs font-medium text-accent">
                <Sparkles size={13} />
                End-to-End Technology Journey
              </span>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-.04em] sm:text-5xl">
                Strategy. Design. Scalable Software. Lifelong Support.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                Whether you need to launch a flagship customer mobile app, automate custom billing operations, or modernize your entire enterprise stack, NexooAI is ready to engineer the solution.
              </p>
            </div>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row lg:mt-0 lg:flex-col lg:items-end">
              <ButtonLink href="/contact" className="w-full sm:w-auto text-center">
                Partner with NexooAI
              </ButtonLink>
              <ButtonLink
                href="/products"
                className="w-full sm:w-auto text-center border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                Browse All Products
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
