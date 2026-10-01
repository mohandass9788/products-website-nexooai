import type { Metadata } from "next";
import { industries } from "@/data/industries";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CollectionCard } from "@/components/ui/collection-card";

export const metadata: Metadata = {
  title: "Industries | NexooAI",
  description:
    "Tailored technology systems and workflows for jewellery, retail, restaurants, hospitality, ecommerce, transportation, and enterprise.",
};

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Target Sectors"
        title="Technology with the right industry context."
        description="Deep vertical understanding turns a fragmented collection of software features into an operational system that your teams genuinely love using."
      />
      <Section className="!pt-0">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {industries.map((item, index) => (
              <CollectionCard
                key={item.slug}
                href={`/industries/${item.slug}`}
                index={String(index + 1).padStart(2, "0")}
                eyebrow="Industry Domain"
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
