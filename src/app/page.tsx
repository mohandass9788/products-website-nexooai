import { Hero } from "@/components/sections/home/hero";
import { EndToEnd, FeaturedProducts, FinalCta, Industries, ProductRail, ProductUniverse, Proof, Services, Work } from "@/components/sections/home/home-sections";

export default function Home() {
  return (
    <main><Hero/><ProductUniverse/><FeaturedProducts/><ProductRail/><Industries/><EndToEnd/><Services/><Proof/><Work/><FinalCta/></main>
  );
}
