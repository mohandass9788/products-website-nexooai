export type ProductCategory = "Business" | "Retail" | "Jewellery" | "Commerce" | "Hospitality" | "Operations" | "Enterprise";

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  tagline: string;
  shortDescription: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  screenshots: string[];
  features: string[];
  benefits: string[];
  industries: string[];
  useCases: string[];
  relatedProducts: string[];
  ctaText: string;
  accent: string;
};

export type Solution = { slug:string; name:string; label:string; description:string; challenge:string; productSlugs:string[]; stages:string[]; accent:string; image?:string };
export type Service = { slug:string; name:string; index:string; description:string; deliverables:string[]; outcome:string; accent?:string; image?:string };
export type Industry = { slug:string; name:string; description:string; challenges:string[]; capabilities:string[]; productSlugs:string[]; accent:string; image?:string };
