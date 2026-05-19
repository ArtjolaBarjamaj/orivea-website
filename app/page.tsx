"use client";

import { useState } from "react";
import ProductGrid from "../components/sections/home/ServicesGrid";
import "../lib/hero-bg.css";
import DesciptionGrid from "../components/sections/home/DesciptionGrid";
import BrandInfoGrid from "../components/sections/home/BrandInfoGrid";
import BestSellersGrid from "../components/sections/home/ProductesGrid";

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(product: any) {
    setCart([...cart, product]);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <section className="hero-bg w-full min-h-[500px] flex flex-col justify-center px-6 md:pl-24 md:pr-0 py-30">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-serif italic text-white mb-6 drop-shadow-lg leading-tight">
            Born in Moraco <br />made for skin
          </h1>
          <p className="text-2xl text-white mb-8 drop-shadow">Luxurious &amp; Natural Skincare Products</p>
          <button className="bg-white/60 text-white text-xl font-semibold px-10 py-3 rounded shadow hover:bg-white/80 transition">Shop Now</button>
        </div>
      </section>
      <ProductGrid addToCart={addToCart} cart={cart} />
      <DesciptionGrid></DesciptionGrid>
      <BrandInfoGrid></BrandInfoGrid>
      <BestSellersGrid />
    </div>
  );
}