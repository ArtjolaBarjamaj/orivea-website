"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import {
  catalogServices,
  getProductsByServiceId,
  getLocalizedProductDescription,
  getLocalizedProductName,
  getLocalizedServiceDescription,
  getLocalizedServiceName,
  resolveCatalogImage,
  type CatalogProduct,
} from "@/lib/catalog";
import { useLanguage } from "@/contexts/LanguageContext";

function buildProductHref(product: CatalogProduct) {
  return `/productes/${product.id}`;
}

function formatPrice(price: number) {
  return `Lek ${price.toFixed(2)}`;
}

export default function ServiceProductsPage() {
  const params = useParams<{ id?: string | string[] }>();
  const router = useRouter();
  const { totalItems } = useCart();
  const { lang } = useLanguage();
  const isSq = lang === "sq";
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const serviceId = rawId ?? "";
  const allServices = catalogServices;

  const service = useMemo(() => {
    return allServices.find((item) => item.id === serviceId);
  }, [allServices, serviceId]);

  const products = useMemo(() => getProductsByServiceId(serviceId), [serviceId]);

  const serviceProductsMap = useMemo(() => {
    return new Map(allServices.map((item) => [item.id, getProductsByServiceId(item.id)]));
  }, [allServices]);

  const suggestedProducts = useMemo(() => {
    return allServices
      .filter((item) => item.id !== serviceId)
      .map((item) => {
        const firstProduct = serviceProductsMap.get(item.id)?.[0];

        if (firstProduct) {
          return {
            serviceId: item.id,
            serviceName: getLocalizedServiceName(item, lang),
            product: firstProduct,
          };
        }

        return {
          serviceId: item.id,
          serviceName: getLocalizedServiceName(item, lang),
          product: {
            id: `placeholder-${item.id}`,
            name: `${getLocalizedServiceName(item, lang)} ${isSq ? "Thelbësore" : "Essentials"}`,
            description: getLocalizedServiceDescription(item, lang),
            price: 0,
            image: item.image,
            serviceIds: [item.id],
          } as CatalogProduct,
        };
      });
  }, [allServices, isSq, lang, serviceId, serviceProductsMap]);

  if (!service) {
    return (
      <section className="min-h-screen bg-[#f6f0eb] px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-3xl text-[#2f251d]">{isSq ? "Shërbimi nuk u gjet" : "Service not found"}</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f6f0eb] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center md:mb-10">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8f6f52]">{isSq ? "Shërbimi Ynë" : "Our Service"}</p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-[#2f251d] md:text-5xl">{getLocalizedServiceName(service, lang)}</h1>
          <p className="mx-auto mt-3 max-w-[60ch] text-sm text-[#6f655b] md:text-base">{getLocalizedServiceDescription(service, lang)}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#7e5e42]">{isSq ? "Produkte në shportë" : "Items in cart"}: {totalItems}</p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-sm bg-white/70 p-6 text-center text-[#6f655b]">
            {isSq ? "Nuk ka ende produkte për këtë shërbim." : "No products added for this service yet."}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-6">
            {products.map((product) => (
              <article
                key={product.id}
                className="bg-transparent cursor-pointer"
                role="link"
                tabIndex={0}
                onClick={() => router.push(buildProductHref(product))}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    router.push(buildProductHref(product));
                  }
                }}
              >
                <div className="grid gap-1">
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
                  <span className="font-serif text-[1.05rem] leading-tight text-[#2f251d] transition-colors hover:text-[#5f432c] md:text-[1.2rem]">
                    {getLocalizedProductName(product, lang)}
                  </span>
                  <p className="mt-1 text-sm text-[#6f655b]">{formatPrice(product.price)}</p>
                  <p className="mt-2 min-h-[3.25rem] text-xs leading-relaxed text-[#6f655b] md:text-[13px]">
                    {getLocalizedProductDescription(product, lang)}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <Link
                      href={buildProductHref(product)}
                      className="text-[10px] uppercase tracking-[0.12em] text-[#7e5e42] underline underline-offset-4 hover:text-[#5f432c]"
                    >
                      {isSq ? "Shiko produktin" : "View product"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 md:mt-16">
          <div className="mb-5 text-center md:mb-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#8f6f52]">{isSq ? "Zbulo Më Shumë" : "Discover More"}</p>
            <h2 className="mt-2 font-serif text-2xl text-[#2f251d] md:text-4xl">{isSq ? "Mund të të interesojë" : "You may be interested in"}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {suggestedProducts.map((entry) => (
              <article key={`${entry.serviceId}-${entry.product.id}`} className="bg-transparent pb-4">
                <div
                  className="group block cursor-pointer"
                  role="link"
                  tabIndex={0}
                  onClick={() => router.push(buildProductHref(entry.product))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      router.push(buildProductHref(entry.product));
                    }
                  }}
                >
                  <div className="relative mb-3 aspect-square w-full overflow-hidden bg-[#e6e1dc] p-4">
                    <div className="relative h-full w-full">
                      <Image
                        src={resolveCatalogImage(entry.product.image)}
                        alt={getLocalizedProductName(entry.product, lang)}
                        fill
                        sizes="(max-width: 768px) 45vw, 18vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="font-serif text-[1rem] leading-tight text-[#2f251d] transition-colors group-hover:text-[#5f432c] md:text-[1.1rem]">
                    {getLocalizedProductName(entry.product, lang)}
                  </span>
                  <p className="mt-1 text-sm text-[#6f655b]">
                    {entry.product.price > 0 ? formatPrice(entry.product.price) : isSq ? "Së shpejti" : "Coming soon"}
                  </p>
                  <p className="mt-2 min-h-[3rem] text-xs leading-relaxed text-[#6f655b] md:text-[13px]">
                    {getLocalizedProductDescription(entry.product, lang)}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <Link
                      href={buildProductHref(entry.product)}
                      className="text-[10px] uppercase tracking-[0.12em] text-[#7e5e42] underline underline-offset-4 hover:text-[#5f432c]"
                    >
                      {isSq ? "Shiko produktin" : "View product"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}