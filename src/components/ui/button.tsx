import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
type Props=React.ComponentProps<typeof Link>&{variant?:"primary"|"secondary"|"text"};
export function ButtonLink({className,children,variant="primary",...props}:Props){return <Link className={cn("button",`button-${variant}`,className)} {...props}><span>{children}</span><ArrowUpRight aria-hidden="true" size={16}/></Link>}
