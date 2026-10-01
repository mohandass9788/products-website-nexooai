import type { Metadata } from "next";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Briefcase,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { brand } from "@/config/brand";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Contact & Direct Executive Support | NexooAI",
  description:
    "Direct contact lines with NexooAI leadership: G Mohandass (Founder & Solutions Architect) and G Sudhakar (Enterprise Sales Director). Email: nexooai@gmail.com.",
};

const leaders = [
  {
    name: "G Mohandass",
    role: "Founder & Chief Solutions Architect",
    focus: "Technical Architecture, Software Engines & Strategic Consulting",
    phone: "+91 97880 33234",
    rawPhone: "9788033234",
    email: "nexooai@gmail.com",
    badge: "Direct Architecture & Fast Response",
    accent: "#00f0ff",
    timing: "Mon - Sat: 9:00 AM – 8:00 PM IST",
    waMessage: "Hello Mohandass sir, I would like to consult on NexooAI software architecture.",
  },
  {
    name: "G Sudhakar",
    role: "Co-Founder & Director of Enterprise Sales",
    focus: "Retail POS Deployments, Commercial Partnerships & Client Success",
    phone: "+91 98403 19606",
    rawPhone: "9840319606",
    email: "nexooai@gmail.com",
    badge: "Sales & Solution Commercials",
    accent: "#efc87a",
    timing: "Mon - Sat: 9:30 AM – 7:30 PM IST",
    waMessage: "Hello Sudhakar sir, I want to discuss software licensing, POS pricing, and commercial plans.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Direct Leadership Contact"
        title="Speak directly with our founding architects & team."
        description="No call center intermediaries or endless ticket queues. Connect directly with G Mohandass and G Sudhakar to discuss your software architecture, POS setup, or commercial rollout."
      />

      <Section className="!pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1.35fr] lg:items-start">
            {/* Left Column: Direct Founder Contacts */}
            <div className="space-y-6">
              {/* Quick WhatsApp Action Banner */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-[#0a0f24] to-[#040711] p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="relative h-4 w-4 overflow-hidden rounded-full">
                    <Image src="/images/nexooai-logo.png" alt="NexooAI" fill sizes="16px" className="object-contain" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#00f0ff]">
                    Fastest Response Channel
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  Instant WhatsApp & Direct Line
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Reach out immediately to <strong>G Mohandass</strong> on WhatsApp or phone for prompt technical guidance.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/919788033234?text=Hello%20Mohandass%20sir%2C%20I%20would%20like%20to%20consult%20on%20NexooAI%20software%20architecture."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button flex-1 justify-center bg-emerald-500 hover:bg-emerald-400 text-black font-semibold flex items-center gap-2 text-sm"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp: 97880 33234</span>
                  </a>

                  <a
                    href="tel:+919788033234"
                    className="button flex-1 justify-center border border-white/15 bg-white/5 text-white hover:bg-white/10 flex items-center gap-2 text-sm"
                  >
                    <Phone size={15} />
                    <span>Call Mohandass</span>
                  </a>
                </div>
              </div>

              {/* Two Direct Contact Cards */}
              <div className="space-y-4">
                {leaders.map((leader) => (
                  <div
                    key={leader.name}
                    className="group rounded-2xl border border-white/10 bg-[#0d100c] p-6 transition-all duration-300 hover:border-white/25 hover:-translate-y-1"
                    style={{ "--card-accent": leader.accent } as React.CSSProperties}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                        style={{
                          backgroundColor: `${leader.accent}15`,
                          color: leader.accent,
                          border: `1px solid ${leader.accent}33`,
                        }}
                      >
                        {leader.badge}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px] text-muted">
                        <Clock size={12} />
                        {leader.timing}
                      </span>
                    </div>

                    <div className="mt-4 flex items-start gap-3.5">
                      <div
                        className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold font-mono text-sm"
                        style={{
                          backgroundColor: `${leader.accent}15`,
                          color: leader.accent,
                          border: `1px solid ${leader.accent}33`,
                        }}
                      >
                        {leader.name.split(" ")[1]?.slice(0, 2) || "NX"}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-[var(--card-accent)] transition-colors">
                          {leader.name}
                        </h4>
                        <p className="text-xs font-mono font-medium text-white/90">
                          {leader.role}
                        </p>
                        <p className="mt-2 text-xs text-muted leading-relaxed">
                          {leader.focus}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/8 pt-4 font-mono text-xs">
                      <a
                        href={`tel:${leader.phone.replace(/\s+/g, "")}`}
                        className="text-white hover:text-accent flex items-center gap-1.5 transition-colors"
                      >
                        <Phone size={13} className="text-accent" />
                        <span className="font-semibold">{leader.phone}</span>
                      </a>
                      <span className="text-white/20">•</span>
                      <a
                        href={`https://wa.me/91${leader.rawPhone}?text=${encodeURIComponent(leader.waMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1.5"
                      >
                        <MessageSquare size={13} />
                        <span>Chat WhatsApp</span>
                      </a>
                      <span className="text-white/20">•</span>
                      <a
                        href={`mailto:${leader.email}`}
                        className="text-muted hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Mail size={13} />
                        <span>{leader.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Official Email & Location */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent border border-white/10">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-muted block text-[10px] uppercase">Central Inquiries</span>
                    <a href="mailto:nexooai@gmail.com" className="text-white font-semibold hover:underline">
                      nexooai@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent border border-white/10">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-muted block text-[10px] uppercase">Headquarters</span>
                    <span className="text-white font-medium">{brand.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Proposal & Enquiry Form */}
            <div>
              <div className="mb-4">
                <span className="eyebrow">Project Specifications</span>
                <h3 className="mt-1 text-2xl font-semibold text-white">
                  Send Your Project Brief
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Share your requirements. Mohandass and Sudhakar will review your workflows and revert with a blueprint.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
