import { Hero } from "@/components/sections/home/hero";
import { CorePillars } from "@/components/sections/home/core-pillars";
import { ProductUniverse, Industries, Work, FinalCta } from "@/components/sections/home/home-sections";
import { ArchitectureMoat } from "@/components/sections/home/architecture-moat";

export default function Home() {
  return (
    <main>
      <Hero />
      <CorePillars />
      <div id="showcase">
        <ProductUniverse />
      </div>
      <ArchitectureMoat />
      <Industries />
      <Work />
      <FinalCta />
    </main>
  );
}
