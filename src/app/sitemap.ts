import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/solutions",
    "/services",
    "/industries",
    "/about",
    "/contact",
  ];
  const paths = [
    ...staticRoutes,
    ...products.map((i) => `/products/${i.slug}`),
    ...solutions.map((i) => `/solutions/${i.slug}`),
    ...services.map((i) => `/services/${i.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
  ];
  return paths.map((path) => ({
    url: `${brand.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.7 : 1,
  }));
}
