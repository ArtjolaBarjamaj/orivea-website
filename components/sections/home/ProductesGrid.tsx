import React from "react";
import Image from "next/image";
import FassiPowder from "../../../assets/public/nila_fassi_powder.png";
import TbrimaMask from "../../../assets/public/tbira_mask.png";
import AkerFassiMask from "../../../assets/public/aker_fasi_mask.png";
import NilaMask from "../../../assets/public/nila_mask.png";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

const bestSellers = [
  {
    title: "Liquid Gold Argan",
    price: "$72.00",
    image: FassiPowder,
    rating: 5,
    badge: "NEW",
  },
  {
    title: "Rhassoul Clay Mask",
    price: "$58.00",
    image: TbrimaMask,
    rating: 5,
  },
  {
    title: "Damask Rose Mist",
    price: "$42.00",
    image: AkerFassiMask,
    rating: 5,
    badge: "POPULAR",
  },
  {
    title: "Nilotica Shea Balm",
    price: "$35.00",
    image: NilaMask,
    rating: 5,
  },
];

const BestSellersGrid = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.2);

  return (
    <section ref={ref} className={`reveal-section bg-[#f8f4f1] px-4 py-10 w-full mx-auto ${isVisible ? "is-visible" : ""}`}>
      <div className="mb-4">
        <p className="anim-fade-up text-[10px] uppercase tracking-[0.18em] text-[#b49c7a] mb-1">Best Sellers</p>
        <h2 className="anim-fade-up anim-delay-1 font-serif italic text-[1.35rem] sm:text-2xl text-[#2f251d] mb-1 leading-tight">The Essentials</h2>
        <a href="#" className="anim-fade-up anim-delay-2 text-[11px] uppercase tracking-[0.14em] text-[#1a3a5a] underline underline-offset-4 hover:text-[#5f432c] font-medium">Shop All Products</a>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-6">
        {bestSellers.map((product, idx) => (
          <div
            key={product.title}
            className={`anim-fade-up flex flex-col items-start p-3 ${idx === 0 ? "anim-delay-1" : idx === 1 ? "anim-delay-2" : "anim-delay-3"}`}
          >
            {/* Image with badge and flat bg */}
            <div className="anim-hover-lift relative w-[100%] h-[110px] bg-[#e5e1db] mb-2 flex items-center justify-center">
              {product.badge && (
                <span className="absolute left-2 top-2 bg-[#222] text-[9px] text-white px-2 py-[2px] font-semibold uppercase tracking-wider" style={{borderRadius:0}}>
                  {product.badge}
                </span>
              )}
              <Image
                src={product.image}
                alt={product.title}
                width={90}
                height={80}
                className="object-contain w-[90px] h-[80px]"
                priority
              />
            </div>
            {/* Info */}
            <h3 className="text-[13px] font-serif text-[#2f251d] font-semibold leading-tight mb-1 mt-1">{product.title}</h3>
            <div className="text-[12px] text-[#7c6c5c] font-medium mb-1">{product.price}</div>
            <div className="flex items-center gap-[2px] mb-1">
              {Array.from({ length: product.rating }).map((_, i) => (
                <span key={i} className="text-[#b49c7a] text-xs">★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="anim-fade-up anim-delay-3 border border-[#b49c7a] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5f432c] transition-colors hover:bg-[#ede6de]"
        >
          View All Productes
        </button>
      </div>
    </section>
  );
};

export default BestSellersGrid;