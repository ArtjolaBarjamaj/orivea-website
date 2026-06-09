import React from "react";
import Image from "next/image";
import Link from "next/link";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";
import { getFeaturedHomeProducts, resolveCatalogImage, getLocalizedProductNameById } from "@/lib/catalog";
import { useLanguage } from "@/contexts/LanguageContext";

const bestSellers = getFeaturedHomeProducts().map((product, index) => ({
  id: product.id,
  title: product.name,
  price: `Lek ${Math.round(product.price).toLocaleString()}`,
  image: resolveCatalogImage(product.image),
  rating: 5,
  badge: index === 0 ? "NEW" : index === 2 ? "POPULAR" : undefined,
}));

const BestSellersGrid = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.2);
  const { lang } = useLanguage();
  const isSq = lang === "sq";

  return (
    <section ref={ref} className={`reveal-section bg-[#f8f4f1] w-full py-10 md:py-14 ${isVisible ? "is-visible" : ""}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
        <div className="mb-4">
          <p className="anim-fade-up text-[10px] uppercase tracking-[0.18em] text-[#b49c7a] mb-1">{isSq ? "Më Të Shiturat" : "Best Sellers"}</p>
          <h2 className="anim-fade-up anim-delay-1 font-serif italic text-[1.35rem] sm:text-2xl text-[#2f251d] mb-1 leading-tight">{isSq ? "Thelbësoret" : "The Essentials"}</h2>
          <Link href="/productes" className="anim-fade-up anim-delay-2 text-[11px] uppercase tracking-[0.14em] text-[#1a3a5a] underline underline-offset-4 hover:text-[#5f432c] font-medium">{isSq ? "Shiko Të Gjitha Produktet" : "Shop All Products"}</Link>
        </div>
      <div className="mx-auto mt-6 grid max-w-[1020px] grid-cols-2 gap-x-6 gap-y-8">
        {bestSellers.map((product, idx) => (
          <Link
            href={`/productes/${product.id}`}
            key={product.title}
            className={`anim-fade-up group flex flex-col items-start p-3 ${idx === 0 ? "anim-delay-1" : idx === 1 ? "anim-delay-2" : "anim-delay-3"}`}
          >
            {/* Image with badge and flat bg */}
            <div className="anim-hover-lift relative aspect-[3/3] w-full overflow-hidden bg-[#e5e1db] mb-2 md:aspect-[4/3]">
              {product.badge && (
                <span className="absolute left-2 top-2 bg-[#222] text-[9px] text-white px-2 py-[2px] font-semibold uppercase tracking-wider" style={{borderRadius:0}}>
                  {product.badge}
                </span>
              )}
              <div className="relative w-[80%] h-[80%] mx-auto mt-[12.5%]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            {/* Info */}
            <span className="text-[13px] font-serif text-[#2f251d] font-semibold leading-tight mb-1 mt-1 transition-colors group-hover:text-[#5f432c]">{getLocalizedProductNameById(product.id, product.title, lang)}</span>
            <div className="text-[12px] text-[#7c6c5c] font-medium mb-1">{product.price}</div>
            <div className="flex items-center gap-[2px] mb-1">
              {Array.from({ length: product?.rating ?? 0 }).map((_, i) => (
                <span key={i} className="text-[#b49c7a] text-xs">★</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/productes"
            className="anim-fade-up anim-delay-3 border border-[#b49c7a] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5f432c] transition-colors hover:bg-[#ede6de]"
          >
            {isSq ? "Shiko Të Gjitha Produktet" : "View All Productes"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellersGrid;