import type { Metadata } from "next";
import { Mail,MapPin,Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
export const metadata:Metadata={title:"Contact",description:"Start a conversation about your product, platform or software project."};
export default function ContactPage(){return <main><PageHero eyebrow="Contact" title="Let’s make the next move clear." description="Tell us what you are building, improving or trying to understand. The details below are placeholders until real company contact information is provided."/><Section className="!pt-0"><Container><div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><div className="space-y-8 pt-4"><ContactItem icon={<Mail/>} label="Email" value={brand.email}/><ContactItem icon={<Phone/>} label="Phone" value={brand.phone}/><ContactItem icon={<MapPin/>} label="Location" value={brand.address}/></div><ContactForm/></div></Container></Section></main>}
function ContactItem({icon,label,value}:{icon:React.ReactNode;label:string;value:string}){return <div className="flex gap-4 border-b border-white/10 pb-7"><span className="text-accent">{icon}</span><div><p className="eyebrow !text-[.58rem]">{label}</p><p className="mt-2 text-lg">{value}</p></div></div>}
