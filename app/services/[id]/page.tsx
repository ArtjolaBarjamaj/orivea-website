"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import {
  catalogServices,
  getProductsByServiceId,
  resolveCatalogImage,
  type CatalogProduct,
} from "@/lib/catalog";

function buildProductHref(product: CatalogProduct) {
  return `/productes/${product.id}`;
}

function formatPrice(price: number) {
  return `Lek ${price.toFixed(2)}`;
}

export default function ServiceProductsPage() {
  const params = useParams<{ id?: string | string[] }>();
  const { totalItems } = useCart();
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
            serviceName: item.name,
            product: firstProduct,
          };
        }

        return {
          serviceId: item.id,
          serviceName: item.name,
          product: {
            id: `placeholder-${item.id}`,
            name: `${item.name} Essentials`,
            description: item.description,
            price: 0,
            image: item.image,
            serviceIds: [item.id],
          } as CatalogProduct,
        };
      });
  }, [allServices, serviceId, serviceProductsMap]);

  if (!service) {
    return (
      <section className="min-h-screen bg-[#f6f0eb] px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-3xl text-[#2f251d]">Service not found</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f6f0eb] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center md:mb-10">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8f6f52]">Our Service</p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-[#2f251d] md:text-5xl">{service.name}</h1>
          <p className="mx-auto mt-3 max-w-[60ch] text-sm text-[#6f655b] md:text-base">{service.description}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#7e5e42]">Items in shport: {totalItems}</p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-sm bg-white/70 p-6 text-center text-[#6f655b]">
            No products added for this service yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {products.map((product) => (
              <article key={product.id} className="bg-transparent">
                <Link href={buildProductHref(product)} className="block">
                  <div className="relative mb-3 aspect-square w-full overflow-hidden bg-[#e6e1dc] p-4">
                    <div className="relative h-full w-full">
                      <Image
                        src={resolveCatalogImage(product.image)}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 45vw, 23vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </Link>
                <Link href={buildProductHref(product)} className="font-serif text-[1.05rem] leading-tight text-[#2f251d] hover:text-[#5f432c] md:text-[1.2rem]">
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-[#6f655b]">{formatPrice(product.price)}</p>
                <p className="mt-2 min-h-[3.25rem] text-xs leading-relaxed text-[#6f655b] md:text-[13px]">
                  {product.description}
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 md:mt-16">
          <div className="mb-5 text-center md:mb-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#8f6f52]">Discover More</p>
            <h2 className="mt-2 font-serif text-2xl text-[#2f251d] md:text-4xl">You may be interested in</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {suggestedProducts.map((entry) => (
              <article key={`${entry.serviceId}-${entry.product.id}`} className="bg-transparent pb-4">
                <Link href={buildProductHref(entry.product)} className="block">
                  <div className="relative mb-3 aspect-square w-full overflow-hidden bg-[#e6e1dc] p-4">
                    <div className="relative h-full w-full">
                      <Image
                        src={resolveCatalogImage(entry.product.image)}
                        alt={entry.product.name}
                        fill
                        sizes="(max-width: 768px) 45vw, 18vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </Link>
                <Link href={buildProductHref(entry.product)} className="font-serif text-[1rem] leading-tight text-[#2f251d] hover:text-[#5f432c] md:text-[1.1rem]">
                  {entry.product.name}
                </Link>
                <p className="mt-1 text-sm text-[#6f655b]">
                  {entry.product.price > 0 ? formatPrice(entry.product.price) : "Coming soon"}
                </p>
                <p className="mt-2 min-h-[3rem] text-xs leading-relaxed text-[#6f655b] md:text-[13px]">
                  {entry.product.description}
                </p>
                <div className="mt-1 flex items-center gap-3">
                  <Link
                    href={buildProductHref(entry.product)}
                    className="text-[10px] uppercase tracking-[0.12em] text-[#7e5e42] underline underline-offset-4 hover:text-[#5f432c]"
                  >
                    Shiko produktin
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}