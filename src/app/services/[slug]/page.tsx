import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { services, getService } from "@/data/services";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const item = getService((await params).slug);
  return item ? { title: `${item.name} | NexooAI Services`, description: item.description } : {};
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const item = getService((await params).slug);
  if (!item) notFound();

  return (
    <main>
      <PageHero
        eyebrow={`Engineering Service / ${item.index}`}
        title={item.name}
        description={item.description}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="/contact" className="button-primary">
            Talk About Your Project ↗
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary" className="font-mono text-xs">
            ← All Services
          </ButtonLink>
        </div>
      </PageHero>

      {/* Visual Service Blueprint & Deliverables */}
      <Section className="border-y border-white/8 bg-[#090b08]/80">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Deliverables & Scope */}
            <div>
              <p className="eyebrow">Production Deliverables</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                What this engagement includes
              </h2>
              <ul className="mt-8 space-y-4">
                {item.deliverables.map((value) => (
                  <li
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#10120f] p-4 text-base sm:text-lg text-white"
                    key={value}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check size={16} />
                    </div>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Service Visual Architecture Card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0e100d] p-3 shadow-2xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#090b08]">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b08]/90 via-[#090b08]/30 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/75 px-3 py-1.5 backdrop-blur-md">
                  <div className="relative h-4 w-4 overflow-hidden rounded-full">
                    <Image src="/images/nexooai-logo.png" alt="NexooAI" fill sizes="16px" className="object-contain" />
                  </div>
                  <span className="font-mono text-[10px] text-white">
                    NexooAI Engineering Unit / {item.index}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Intended Outcome & Consultation CTA */}
      <Section>
        <Container>
          <div className="rounded-[2.2rem] border border-white/10 bg-gradient-to-b from-white/[.04] to-transparent p-8 sm:p-14">
            <span className="eyebrow">Intended Business Outcome</span>
            <h2 className="mt-4 max-w-3xl text-3xl sm:text-5xl font-semibold tracking-[-.04em] leading-tight text-white">
              {item.outcome}
            </h2>
            <p className="mt-6 max-w-2xl text-base text-muted leading-relaxed">
              Every NexooAI service engagement is customized to your exact operational workflows, technology infrastructure, and delivery milestones.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact" className="button-primary">
                Book Technical Audit
              </ButtonLink>
              <a
                href="https://wa.me/919788033234?text=Hello%20NexooAI%2C%20I%20want%20to%20discuss%20service%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="button border border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                Chat on WhatsApp ↗
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
