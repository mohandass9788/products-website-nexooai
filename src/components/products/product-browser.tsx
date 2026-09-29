"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { productCategories, products } from "@/data/products";
import type { ProductCategory } from "@/types/content";
import { cn } from "@/lib/utils";

type Filter = "All" | ProductCategory;

export function ProductBrowser() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2" aria-label="Filter products">
        {(["All", ...productCategories] as Filter[]).map((item) => (
          <button
            key={item}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-xs transition-colors",
              filter === item
                ? "border-accent bg-accent text-black font-semibold"
                : "border-white/12 text-muted hover:border-white/30 hover:text-white"
            )}
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((product, index) => (
          <Link
            href={`/products/${product.slug}`}
            key={product.slug}
            className="group flex flex-col justify-between overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0e100d] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/30 hover:shadow-2xl"
            style={{
              boxShadow: `0 10px 40px -20px ${product.accent || "#d8ff5f"}22`,
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="eyebrow !text-[.62rem]">{product.category}</span>
                <span className="font-mono text-[10px] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Real Product Image Preview */}
              <div className="relative mt-5 h-44 w-full overflow-hidden rounded-2xl border border-white/8 bg-[#070906]">
                <Image
                  src={product.heroImage || "/images/products/estimate-app.webp"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e100d] via-transparent to-transparent opacity-60" />

                <div
                  className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] backdrop-blur-md"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: product.accent || "#d8ff5f",
                    border: `1px solid ${product.accent || "#d8ff5f"}40`,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: product.accent || "#d8ff5f" }}
                  />
                  {product.shortName}
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-medium tracking-tight text-white group-hover:text-accent transition-colors">
                {product.name}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {product.shortDescription}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
              <span className="font-mono text-xs text-muted group-hover:text-white transition-colors">
                Explore capabilities
              </span>
              <ArrowUpRight
                className="text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                size={22}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
