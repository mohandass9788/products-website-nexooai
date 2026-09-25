import type { Metadata } from "next";
import { industries } from "@/data/industries";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CollectionCard } from "@/components/ui/collection-card";
export const metadata:Metadata={title:"Industries",description:"Technology directions for jewellery, retail, restaurants, hospitality, ecommerce, transportation and enterprise."};
export default function IndustriesPage(){return <main><PageHero eyebrow="Industries" title="Technology with the right context." description="Industry understanding helps turn a set of features into a coherent operating experience."/><Section className="!pt-0"><Container><div className="grid gap-4 md:grid-cols-2">{industries.map((item,index)=><CollectionCard key={item.slug} href={`/industries/${item.slug}`} index={String(index+1).padStart(2,"0")} eyebrow="Industry" title={item.name} description={item.description} accent={item.accent}/>)}</div></Container></Section></main>}
