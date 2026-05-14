"use client";

import { useState } from "react";
import Topbar from "./components/Topbar";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import "./hero-bg.css";
import DesciptionGrid from "./components/DesciptionGrid";
import BrandInfoGrid from "./components/BrandInfoGrid";

const products = [
  {
    id: 1,
    name: "Krem Hidratues Trupi",
    description: "Krem i pasur me vitamina për lëkurë të butë dhe të ushqyer.",
    price: "900 Lekë",
    image: "/krem.jpg",
  },
  {
    id: 2,
    name: "Scrub Natyral",
    description: "Scrub me përbërës natyralë për lëkurë të pastër dhe të freskët.",
    price: "700 Lekë",
    image: "/scrub.jpg",
  },
  {
    id: 3,
    name: "Vaj Trupi Relaksues",
    description: "Vaj aromatik për masazh dhe relaksim të lëkurës.",
    price: "1200 Lekë",
    image: "/vaj.jpg",
  },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(product: any) {
    setCart([...cart, product]);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <section className="hero-bg w-full min-h-[500px] flex flex-col justify-center pl-24 py-30">
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
    </div>
  );
}