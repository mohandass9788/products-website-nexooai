import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { services,getService } from "@/data/services";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
export const dynamicParams=false;
export function generateStaticParams(){return services.map(({slug})=>({slug}))}
export async function generateMetadata({params}:PageProps<"/services/[slug]">):Promise<Metadata>{const item=getService((await params).slug);return item?{title:item.name,description:item.description}:{};}
export default async function ServicePage({params}:PageProps<"/services/[slug]">){const item=getService((await params).slug);if(!item)notFound();return <main><PageHero eyebrow={`Service / ${item.index}`} title={item.name} description={item.description}><ButtonLink className="mt-9" href="/contact">Talk about your project</ButtonLink></PageHero><Section className="border-y border-white/8"><Container><div className="grid gap-14 lg:grid-cols-2"><div><p className="eyebrow">What it can include</p><ul className="mt-8 space-y-5">{item.deliverables.map(value=><li className="flex items-center gap-3 text-2xl" key={value}><Check className="text-accent" size={19}/>{value}</li>)}</ul></div><div className="rounded-[1.7rem] border border-white/10 bg-white/[.025] p-8 sm:p-12"><p className="eyebrow">Intended outcome</p><h2 className="mt-10 text-4xl leading-tight tracking-[-.05em] sm:text-5xl">{item.outcome}</h2><p className="mt-6 text-sm leading-6 text-muted">The exact engagement, scope and deliverables would be defined with your team during discovery.</p></div></div></Container></Section></main>}
