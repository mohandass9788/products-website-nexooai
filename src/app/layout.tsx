import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { brand } from "@/config/brand";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothExperience } from "@/components/animations/smooth-experience";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: `${brand.name} — ${brand.tagline}`, template: `%s — ${brand.name}` },
  description: brand.heroDescription,
  openGraph: { title: brand.name, description: brand.heroDescription, type: "website" },
  twitter: { card: "summary_large_image", title: brand.name, description: brand.heroDescription },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body><SmoothExperience/><a className="skip-link" href="#main-content">Skip to content</a><Header/><div id="main-content">{children}</div><Footer/></body></html>;
}
