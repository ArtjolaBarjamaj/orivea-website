"use client";

import { useState } from "react";
import ProductGrid from "../components/sections/home/ServicesGrid";
import "../lib/hero-bg.css";
import DesciptionGrid from "../components/sections/home/DesciptionGrid";
import BrandInfoGrid from "../components/sections/home/BrandInfoGrid";
import BestSellersGrid from "../components/sections/home/ProductesGrid";
import { Button } from "../components/ui/button";

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(product: any) {
    setCart([...cart, product]);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <section className="hero-bg mobile-home-bg relative w-full min-h-[84svh] md:min-h-[760px] flex items-center px-5 sm:px-8 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="pt-10 relative z-10 w-full max-w-[560px]">
          <p className="mb-7 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
            Born in Morocco
          </p>
          <h1 className="mb-7 text-[2.4rem] leading-[1.02] sm:text-5xl md:text-6xl font-serif italic text-white mb-6 drop-shadow-lg">
            Born in Morocco,
            <br />
            made for skin
          </h1>
          <p className="mb-8 max-w-[36ch] text-base sm:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed drop-shadow">
            Ancient botanical secrets refined through modern science. Discover a ritual that honors your skin&apos;s natural intelligence.
          </p>
          <Button className="h-auto w-full sm:w-auto bg-[#0B1117] text-white text-sm sm:text-base font-semibold uppercase tracking-[0.12em] px-8 py-4 rounded-none shadow-md hover:bg-[#111c27] transition-colors duration-300">
            Shop The Collection
          </Button>
        </div>
      </section>
      <ProductGrid />
      {/* <DesciptionGrid></DesciptionGrid> */}
      <BrandInfoGrid></BrandInfoGrid>
      <BestSellersGrid />
    </div>
  );
}