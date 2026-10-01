import type { Metadata } from "next";
import { services } from "@/data/services";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CollectionCard } from "@/components/ui/collection-card";

export const metadata: Metadata = {
  title: "Services | NexooAI",
  description:
    "Strategy, design, development, integration, deployment and ongoing engineering support services.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Engineering & Services"
        title="One team across the technology journey."
        description="From the first product decision to ongoing evolution, our service directions are designed to stay connected."
      />
      <Section className="!pt-0">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((item) => (
              <CollectionCard
                key={item.slug}
                href={`/services/${item.slug}`}
                index={item.index}
                eyebrow="Capability"
                title={item.name}
                description={item.description}
                accent={item.accent || "#70d7ff"}
                image={item.image}
              />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
