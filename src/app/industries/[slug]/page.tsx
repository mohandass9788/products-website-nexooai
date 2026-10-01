import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { industries, getIndustry } from "@/data/industries";
import { getProduct } from "@/data/products";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const item = getIndustry((await params).slug);
  return item ? { title: `${item.name} Industry Solutions | NexooAI`, description: item.description } : {};
}

export default async function IndustryPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const item = getIndustry((await params).slug);
  if (!item) notFound();

  const related = item.productSlugs.map(getProduct).filter(Boolean);

  return (
    <main>
      <PageHero
        eyebrow={`${item.name} Sector Focus`}
        title={item.name}
        description={item.description}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="/contact" className="button-primary">
            Discuss Your Business Context ↗
          </ButtonLink>
          <ButtonLink href="/industries" variant="secondary" className="font-mono text-xs">
            ← All Industries
          </ButtonLink>
        </div>
      </PageHero>

      {/* Visual Blueprint & Challenges Section */}
      <Section className="border-y border-white/8 bg-[#090b08]/80">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Challenges & Capabilities */}
            <div>
              <p className="eyebrow">Sector Bottlenecks</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Core operational friction we eliminate
              </h2>

              <ul className="mt-8 space-y-4">
                {item.challenges.map((value) => (
                  <li
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#10120f] p-4 text-base sm:text-lg text-white"
                    key={value}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent mt-0.5">
                      <Check size={16} />
                    </div>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>

              {/* Capability Workflow Sequence */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">
                  End-to-End Capability Flow
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {item.capabilities.map((cap, index) => (
                    <div className="flex items-center gap-2" key={cap}>
                      <span
                        className="rounded-full px-3.5 py-1.5 font-mono text-xs backdrop-blur-md"
                        style={{
                          backgroundColor: `${item.accent}15`,
                          color: item.accent,
                          border: `1px solid ${item.accent}33`,
                        }}
                      >
                        {cap}
                      </span>
                      {index < item.capabilities.length - 1 && (
                        <span className="text-muted/60 text-xs font-mono">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Industry Blueprint Visual */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b08]/85 via-[#090b08]/30 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/75 px-3 py-1.5 backdrop-blur-md">
                  <div className="relative h-4 w-4 overflow-hidden rounded-full">
                    <Image src="/images/nexooai-logo.png" alt="NexooAI" fill sizes="16px" className="object-contain" />
                  </div>
                  <span className="font-mono text-[10px] text-white">
                    NexooAI Vertical Blueprint / {item.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Relevant Products Grid */}
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end mb-10">
            <div>
              <p className="eyebrow">Industry Solution Stack</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                Recommended Software Engines
              </h3>
            </div>
            <Link
              href="/products"
              className="font-mono text-xs text-accent hover:underline flex items-center gap-1.5"
            >
              <span>View Full Product Directory</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(
              (product) =>
                product && (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className="group relative flex flex-col justify-between rounded-[1.5rem] border border-white/10 bg-[#0e100d] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/30"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase text-accent">
                          {product.category}
                        </span>
                        <div className="relative h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <Image src="/images/nexooai-logo.png" alt="NexooAI" fill sizes="14px" className="object-contain" />
                        </div>
                      </div>

                      <div className="relative mt-4 h-32 w-full overflow-hidden rounded-xl border border-white/10 bg-[#090b08]">
                        <Image
                          src={product.heroImage}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <h4 className="mt-4 text-xl font-semibold text-white group-hover:text-accent transition-colors">
                        {product.name}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-3">
                      <span className="font-mono text-xs text-muted group-hover:text-white transition-colors">
                        Explore Engine
                      </span>
                      <ArrowUpRight
                        className="text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                        size={16}
                      />
                    </div>
                  </Link>
                )
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
