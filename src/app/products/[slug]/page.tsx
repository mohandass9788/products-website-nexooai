import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { products, getProduct } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ProductVisual } from "@/components/ui/product-visual";

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getProduct(slug);
  return item
    ? { title: item.name, description: item.shortDescription }
    : {};
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getProduct(slug);
  if (!item) notFound();
  const related = item.relatedProducts.map(getProduct).filter(Boolean);

  return (
    <main>
      <section className="relative overflow-hidden pb-20 pt-40 sm:pt-48">
        <div className="page-orb" style={{ background: item.accent }} />
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow">
                {item.category} / {item.shortName}
              </p>
              <h1 className="mt-6 text-[clamp(3.5rem,7vw,7.2rem)] leading-[.9] tracking-[-.07em]">
                {item.heroTitle}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
                {item.heroDescription}
              </p>
              <ButtonLink href="/contact" className="mt-9">
                {item.ctaText}
              </ButtonLink>
            </div>
            <ProductVisual
              label={item.shortName}
              accent={item.accent}
              imageSrc={item.heroImage}
              tagline={item.tagline}
              badge={item.category}
            />
          </div>
        </Container>
      </section>

      <Section className="border-y border-white/8">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
            <p className="eyebrow">Overview</p>
            <div>
              <h2 className="max-w-4xl text-4xl leading-tight tracking-[-.05em] sm:text-6xl">
                {item.tagline}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                {item.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <p className="eyebrow">Product views</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {item.screenshots.map((shot, index) => (
              <ProductVisual
                key={shot}
                label={shot}
                accent={item.accent}
                imageSrc={item.heroImage}
                tagline={shot}
                badge={`View 0${index + 1}`}
                variant={index === 1 ? "phone" : "dashboard"}
                className={index === 1 ? "lg:-mt-8" : ""}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#0a0c09]">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Key features</p>
              <h2 className="section-title mt-5">Focused where it matters.</h2>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {item.features.map((feature, index) => (
                <div className="flex items-center gap-5 py-5" key={feature}>
                  <span className="font-mono text-[10px] text-muted">
                    0{index + 1}
                  </span>
                  <p className="text-xl">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[1.6rem] border border-white/10 p-7 sm:p-10">
              <p className="eyebrow">How it helps</p>
              <ul className="mt-10 space-y-5">
                {item.benefits.map((benefit) => (
                  <li className="flex items-start gap-3 text-xl" key={benefit}>
                    <Check
                      className="mt-1 shrink-0 text-accent"
                      size={18}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 p-7 sm:p-10">
              <p className="eyebrow">Use cases</p>
              <ul className="mt-10 space-y-5">
                {item.useCases.map((useCase) => (
                  <li className="border-b border-white/10 pb-5 text-xl" key={useCase}>
                    {useCase}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted">
                Relevant industries: {item.industries.join(", ")}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-white/8">
        <Container>
          <p className="eyebrow">Related products</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {related.map(
              (product) =>
                product && (
                  <Link
                    className="group rounded-[1.5rem] border border-white/10 p-7 transition-colors hover:border-accent/40"
                    href={`/products/${product.slug}`}
                    key={product.slug}
                  >
                    <span className="text-sm text-muted">{product.category}</span>
                    <div className="mt-8 flex items-end justify-between">
                      <h3 className="text-3xl tracking-[-.04em]">
                        {product.name}
                      </h3>
                      <ArrowUpRight className="text-muted group-hover:text-accent" />
                    </div>
                  </Link>
                )
            )}
          </div>
          <div className="mt-20 rounded-[2rem] bg-accent px-7 py-14 text-black sm:p-16">
            <h2 className="max-w-4xl text-5xl leading-[.95] tracking-[-.06em] sm:text-7xl">
              See where {item.shortName} could fit.
            </h2>
            <ButtonLink href="/contact" className="mt-8 !bg-black !text-white">
              Start a conversation
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
