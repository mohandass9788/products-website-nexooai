import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { solutions,getSolution } from "@/data/solutions";
import { getProduct } from "@/data/products";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
export const dynamicParams=false;export function generateStaticParams(){return solutions.map(({slug})=>({slug}))}
export async function generateMetadata({params}:PageProps<"/solutions/[slug]">):Promise<Metadata>{const item=getSolution((await params).slug);return item?{title:item.name,description:item.description}:{};}
export default async function SolutionPage({params}:PageProps<"/solutions/[slug]">){const item=getSolution((await params).slug);if(!item)notFound();const related=item.productSlugs.map(getProduct).filter(Boolean);return <main><PageHero eyebrow={`${item.label} solution`} title={item.name} description={item.description}><ButtonLink className="mt-9" href="/contact">Discuss this solution</ButtonLink></PageHero><Section className="border-y border-white/8"><Container><div className="grid gap-12 lg:grid-cols-2"><div><p className="eyebrow">The context</p><h2 className="mt-5 text-4xl leading-tight tracking-[-.05em] sm:text-6xl">{item.challenge}</h2></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10">{item.stages.map((stage,index)=><div className="min-h-40 bg-[#0c0e0b] p-5" key={stage}><span className="font-mono text-[10px] text-muted">0{index+1}</span><p className="mt-16 text-xl">{stage}</p></div>)}</div></div></Container></Section><Section><Container><p className="eyebrow">Connected products</p><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{related.map(product=>product&&<Link className="group rounded-[1.4rem] border border-white/10 p-6" href={`/products/${product.slug}`} key={product.slug}><span className="text-xs text-muted">{product.category}</span><h3 className="mt-12 text-2xl">{product.name}</h3><p className="mt-3 text-sm leading-6 text-muted">{product.shortDescription}</p><ArrowUpRight className="mt-8 group-hover:text-accent" size={18}/></Link>)}</div></Container></Section></main>}
