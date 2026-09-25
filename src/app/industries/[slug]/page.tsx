import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight,Check } from "lucide-react";
import { industries,getIndustry } from "@/data/industries";
import { getProduct } from "@/data/products";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
export const dynamicParams=false;export function generateStaticParams(){return industries.map(({slug})=>({slug}))}
export async function generateMetadata({params}:PageProps<"/industries/[slug]">):Promise<Metadata>{const item=getIndustry((await params).slug);return item?{title:item.name,description:item.description}:{};}
export default async function IndustryPage({params}:PageProps<"/industries/[slug]">){const item=getIndustry((await params).slug);if(!item)notFound();const related=item.productSlugs.map(getProduct).filter(Boolean);return <main><PageHero eyebrow="Industry" title={item.name} description={item.description}><ButtonLink className="mt-9" href="/contact">Discuss your context</ButtonLink></PageHero><Section className="border-y border-white/8"><Container><div className="grid gap-12 lg:grid-cols-2"><div><p className="eyebrow">Common challenges</p><ul className="mt-8 space-y-5">{item.challenges.map(value=><li className="flex items-start gap-3 text-2xl" key={value}><Check className="mt-1 text-accent" size={18}/>{value}</li>)}</ul></div><div className="rounded-[1.5rem] border border-white/10 p-8"><p className="eyebrow">Capability flow</p><div className="mt-10 flex flex-wrap gap-3">{item.capabilities.map((value,index)=><div className="flex items-center gap-3" key={value}><span className="rounded-full border border-white/15 px-4 py-2 text-sm">{value}</span>{index<item.capabilities.length-1&&<span className="text-muted">→</span>}</div>)}</div></div></div></Container></Section><Section><Container><p className="eyebrow">Relevant products</p><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{related.map(product=>product&&<Link className="group rounded-[1.4rem] border border-white/10 p-6" href={`/products/${product.slug}`} key={product.slug}><h2 className="mt-10 text-2xl">{product.name}</h2><p className="mt-3 text-sm leading-6 text-muted">{product.shortDescription}</p><ArrowUpRight className="mt-8 group-hover:text-accent" size={18}/></Link>)}</div></Container></Section></main>}
