import type { Metadata } from "next";
import { ProductBrowser } from "@/components/products/product-browser";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FinalCta } from "@/components/sections/home/home-sections";
export const metadata:Metadata={title:"Products",description:"Explore software product directions for business, retail, commerce, hospitality and operations."};
export default function ProductsPage(){return <main><PageHero eyebrow="Product universe" title="Technology for the way business really moves." description="Explore a growing product family spanning everyday operations, customer relationships, commerce and complete enterprise solutions."/><Section className="!pt-0"><Container><ProductBrowser/></Container></Section><FinalCta/></main>}
