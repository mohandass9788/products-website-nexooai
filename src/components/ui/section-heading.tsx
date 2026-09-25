import { cn } from "@/lib/utils";
export function SectionHeading({eyebrow,title,body,className}: {eyebrow:string;title:string;body?:string;className?:string}){return <div className={cn("max-w-4xl",className)}><p className="eyebrow">{eyebrow}</p><h2 className="section-title mt-5">{title}</h2>{body&&<p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">{body}</p>}</div>}
