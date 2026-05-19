"use client";

import { useState } from "react";


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

export default function Contact() {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(product: any) {
    setCart([...cart, product]);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      
      test

    </div>
  );
}