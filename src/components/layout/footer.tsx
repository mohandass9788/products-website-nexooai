import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import { brand } from "@/config/brand";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { services } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03060f] pt-16 sm:pt-20">
      <Container>
        {/* Main Footer Grid */}
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.3fr_3fr]">
          {/* Brand Info & Fast Contact */}
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {brand.heroDescription}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 font-mono text-xs">
              <a
                className="inline-flex items-center gap-2 text-[#00f0ff] hover:underline"
                href={`mailto:${brand.email}`}
              >
                <Mail size={13} />
                <span>{brand.email}</span>
                <ArrowUpRight size={12} />
              </a>

              <div className="flex flex-col gap-1">
                <a
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                  href={`tel:${brand.phone}`}
                >
                  <Phone size={13} />
                  <span>{brand.phone} (Mohandass)</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                  href={`tel:${brand.phoneSecondary}`}
                >
                  <Phone size={13} />
                  <span>{brand.phoneSecondary} (Sudhakar)</span>
                </a>
              </div>

              <span className="flex items-center gap-2 text-muted">
                <MapPin size={13} />
                <span>{brand.address}</span>
              </span>
            </div>

            {/* Quick WhatsApp Action in Footer */}
            <div className="mt-6">
              <a
                href="https://wa.me/919788033234?text=Hello%20NexooAI%2C%20I%20want%20to%20schedule%20a%20product%20architecture%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WhatsApp: 97880 33234 ↗</span>
              </a>
            </div>
          </div>

          {/* 4 Clean Columns: Products, Solutions, Services, Navigation */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <FooterGroup
              title="Products"
              items={products.slice(0, 5).map((p) => ({
                label: p.shortName,
                href: `/products/${p.slug}`,
              }))}
              viewAllHref="/products"
              viewAllLabel="All 13 Products →"
            />

            <FooterGroup
              title="Solutions"
              items={solutions.slice(0, 5).map((s) => ({
                label: s.label,
                href: `/solutions/${s.slug}`,
              }))}
              viewAllHref="/solutions"
              viewAllLabel="All Solutions →"
            />

            <FooterGroup
              title="Services"
              items={services.slice(0, 5).map((s) => ({
                label: s.name,
                href: `/services/${s.slug}`,
              }))}
              viewAllHref="/services"
              viewAllLabel="All Services →"
            />

            <FooterGroup
              title="Company"
              items={[
                { label: "About Us & Team", href: "/about" },
                { label: "Industries", href: "/industries" },
                { label: "Mobile App Suite", href: "/#mobile-app-suite" },
                { label: "Contact & Support", href: "/contact" },
              ]}
              viewAllHref="/contact"
              viewAllLabel="Get in Touch →"
            />
          </div>
        </div>

        {/* Bottom Legal & Social Row */}
        <div className="flex flex-col gap-4 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} {brand.name} Technologies. All rights reserved.</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-white/20" />
            <span className="font-mono text-[11px] text-emerald-400">
              ● Production Systems Operational
            </span>
          </div>

          <div className="flex items-center gap-5">
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
  viewAllHref,
  viewAllLabel,
}: {
  title: string;
  items: { label: string; href: string }[];
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
        {title}
      </p>
      <ul className="space-y-2.5 text-xs text-muted">
        {items.map((item) => (
          <li key={item.label}>
            <Link className="transition-colors hover:text-[#00f0ff]" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
        {viewAllHref && viewAllLabel && (
          <li className="pt-1">
            <Link
              href={viewAllHref}
              className="font-mono text-[11px] text-accent hover:underline block"
            >
              {viewAllLabel}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
