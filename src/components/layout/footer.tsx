import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/config/brand";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { services } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03060f] pt-20">
      <Container>
        <div className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-[1.3fr_2fr] lg:grid-cols-[1.4fr_3fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-6 text-muted">
              {brand.heroDescription}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-[#00f0ff] hover:underline"
                href={`mailto:${brand.email}`}
              >
                {brand.email}
                <ArrowUpRight size={14} />
              </a>
              <span className="text-xs text-muted font-mono">{brand.address}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-9 sm:grid-cols-4">
            <FooterGroup
              title="Products"
              items={products.slice(0, 6).map((p) => ({
                label: p.shortName,
                href: `/products/${p.slug}`,
              }))}
            />
            <FooterGroup
              title="Solutions"
              items={solutions.slice(0, 5).map((s) => ({
                label: s.label,
                href: `/solutions/${s.slug}`,
              }))}
            />
            <FooterGroup
              title="Services"
              items={services.slice(0, 5).map((s) => ({
                label: s.name,
                href: `/services/${s.slug}`,
              }))}
            />
            <FooterGroup
              title="Company"
              items={[
                { label: "About NexooAI", href: "/about" },
                { label: "Industries", href: "/industries" },
                { label: "Contact Us", href: "/contact" },
                { label: "Careers", href: "/about" },
                { label: "Security & Privacy", href: "/about" },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {brand.name} Technologies. All rights reserved.</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/20" />
            <span className="hidden sm:inline-block font-mono text-[10px] text-muted">Intelligent Business Core OS</span>
          </p>
          <div className="flex items-center gap-6">
            {brand.socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterGroup({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
        {title}
      </p>
      <ul className="space-y-3 text-xs text-muted">
        {items.map((item) => (
          <li key={item.label}>
            <Link className="transition-colors hover:text-[#00f0ff]" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
