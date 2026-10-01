import type { Metadata } from "next";
import { solutions } from "@/data/solutions";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CollectionCard } from "@/components/ui/collection-card";

export const metadata: Metadata = {
  title: "Solutions | NexooAI",
  description:
    "Connected technology solutions shaped for specific industries, retail ecosystems, and business workflows.",
};

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Solutions Portfolio"
        title="Products become powerful when they work together."
        description="Solution directions connect the right capabilities around an industry, workflow or growth ambition."
      />
      <Section className="!pt-0">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {solutions.map((item, index) => (
              <CollectionCard
                key={item.slug}
                href={`/solutions/${item.slug}`}
                index={String(index + 1).padStart(2, "0")}
                eyebrow={item.label}
                title={item.name}
                description={item.description}
                accent={item.accent}
                image={item.image}
              />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
