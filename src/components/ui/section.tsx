import { cn } from "@/lib/utils";
export function Section({className,children,id}:React.PropsWithChildren<{className?:string;id?:string}>){return <section id={id} className={cn("relative py-24 sm:py-32 lg:py-40",className)}>{children}</section>}
