"use client";

import { Zap, ShieldCheck, RefreshCw, Cpu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const moats = [
  {
    icon: Zap,
    metric: "0.4s Latency",
    title: "Sub-Second Counter Velocity",
    description:
      "High-throughput billing counters require zero hesitation. Our low-latency WebSocket engine and local memory caching process transactions, barcodes, and receipts in under 400ms.",
    accent: "#00f0ff",
  },
  {
    icon: ShieldCheck,
    metric: "100% Isolation",
    title: "Zero-Trust Multi-Tenant Architecture",
    description:
      "Every enterprise client operates with dedicated database schemas, isolated RabbitMQ message brokers, and hardened Docker container runtimes with zero shared risk.",
    accent: "#a855f7",
  },
  {
    icon: RefreshCw,
    metric: "Offline-First",
    title: "Continuous Counter Resiliency",
    description:
      "Internet dropouts never halt sales. Local counter caching ensures seamless offline operation that automatically reconciles with the cloud the moment connectivity returns.",
    accent: "#ff7b00",
  },
  {
    icon: Cpu,
    metric: "AI-Assisted",
    title: "Predictive Intelligence Core",
    description:
      "From forecasting seasonal gold demand and chit payment default risks to smart inventory reordering, NexooAI embeds machine learning directly into your daily ledger.",
    accent: "#38bdf8",
  },
];

const infrastructureSpecs = [
  { label: "Cloud Uptime", value: "99.98% SLA" },
  { label: "Deployment Speed", value: "< 30s Hot Rollouts" },
  { label: "Database Security", value: "AES-256 Encrypted" },
  { label: "Cross-Platform", value: "iOS, Android, Web & Desktop" },
];

export function ArchitectureMoat() {
  return (
    <section className="relative border-y border-white/8 bg-[#040711] py-24 sm:py-32 overflow-hidden">
      {/* Background cyber grid and ambient radial light */}
      <div className="pointer-events-none absolute right-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-[#a855f7]/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-5%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-[#00f0ff]/10 blur-[150px]" />

      <Container className="relative z-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="04 / Engineering Moat"
            title="Built on Zero-Compromise Cloud Architecture."
            body="Enterprise operations cannot afford downtime, lag, or data leaks. Here is how NexooAI guarantees uninterrupted scale."
          />
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {moats.map((moat) => {
            const Icon = moat.icon;
            return (
              <div
                key={moat.title}
                className="group relative flex flex-col justify-between rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a0f20] to-[#060a14] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/8 pb-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${moat.accent}1a`,
                        color: moat.accent,
                        border: `1px solid ${moat.accent}33`,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: moat.accent }}
                    >
                      {moat.metric}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">
                    {moat.title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-muted">
                    {moat.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/6 flex items-center gap-2 font-mono text-[10px] text-muted">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: moat.accent }}
                  />
                  <span>Enterprise Grade</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Infrastructure Specs Bar */}
        <div className="mt-14 rounded-[1.6rem] border border-white/10 bg-[#070b18]/80 p-6 sm:p-8 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {infrastructureSpecs.map((spec) => (
              <div key={spec.label} className="text-center sm:text-left">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted block">
                  {spec.label}
                </span>
                <strong className="mt-1 block text-lg sm:text-xl font-semibold text-white tracking-tight">
                  {spec.value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
