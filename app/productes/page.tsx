"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { catalogProducts, getLocalizedProductDescription, getLocalizedProductName, resolveCatalogImage } from "@/lib/catalog";
import { useLanguage } from "@/contexts/LanguageContext";

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { totalItems } = useCart();
  const { lang } = useLanguage();
  const isSq = lang === "sq";
  const productsPerPage = 4;

  const normalizedProducts = useMemo(
    () => catalogProducts,
    []
  );

  const totalPages = Math.max(1, Math.ceil(normalizedProducts.length / productsPerPage));
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return normalizedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [currentPage, normalizedProducts]);

  return (
    <section className="min-h-screen bg-[#f6f0eb] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center md:mb-10">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8f6f52]">{isSq ? "Produktet Tona" : "Our Products"}</p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-[#2f251d] md:text-5xl">{isSq ? "Të Gjitha Produktet" : "All Products"}</h1>
          <p className="mx-auto mt-3 max-w-[60ch] text-sm text-[#6f655b] md:text-base">
            {isSq
              ? "Eksploro koleksionin tonë të plotë të kuruar për ritualet e përditshme të kujdesit të lëkurës."
              : "Explore our complete collection curated for daily skincare rituals."}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#7e5e42]">{isSq ? "Produkte në shportë" : "Items in cart"}: {totalItems}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {paginatedProducts.map((product) => (
            <article key={product.id} className="bg-transparent">
              <div className="relative mb-3 aspect-square w-full overflow-hidden bg-[#e6e1dc] p-4">
                <div className="relative h-full w-full">
                  <Image
                    src={resolveCatalogImage(product.image)}
                    alt={getLocalizedProductName(product, lang)}
                    fill
                    sizes="(max-width: 768px) 45vw, 23vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <h2 className="font-serif text-[1.05rem] leading-tight text-[#2f251d] md:text-[1.2rem]">{getLocalizedProductName(product, lang)}</h2>
              <p className="mt-1 text-sm text-[#6f655b]">{formatPrice(product.price)}</p>
              <p className="mt-2 min-h-[3.25rem] text-xs leading-relaxed text-[#6f655b] md:text-[13px]">
                {getLocalizedProductDescription(product, lang)}
              </p>
              <div>
                <Link
                  href={`/productes/${product.id}`}
                  className="mt-2 inline-block text-[10px] uppercase tracking-[0.12em] text-[#7e5e42] underline underline-offset-4 hover:text-[#5f432c]"
                >
                  {isSq ? "Shiko produktin" : "View product"}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-10">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border border-[#7e5e42] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7e5e42] transition-colors hover:bg-[#7e5e42] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSq ? "Mbrapa" : "Previous"}
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`min-w-9 border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                  currentPage === page
                    ? "border-[#7e5e42] bg-[#7e5e42] text-white"
                    : "border-[#7e5e42] text-[#7e5e42] hover:bg-[#7e5e42] hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="border border-[#7e5e42] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7e5e42] transition-colors hover:bg-[#7e5e42] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSq ? "Tjetra" : "Next"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}