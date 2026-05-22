"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import ProductByIdView from "@/components/sections/productes/ProductByIdView";
import { useCart } from "@/contexts/CartContext";
import {
  catalogProducts,
  resolveCatalogImage,
  productById,
  type CatalogProduct,
} from "@/lib/catalog";

export default function ProductByIdPage() {
  const params = useParams<{ id?: string | string[] }>();
  const { addItem, totalItems } = useCart();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const productId = rawId ?? "";

  const product = useMemo(() => {
    return productById.get(productId);
  }, [productId]);

  const relatedProducts = useMemo(() => {
    return catalogProducts.filter((item) => item.id !== productId).slice(0, 4);
  }, [productId]);

  function addToCart(item: CatalogProduct) {
    const resolvedImage = resolveCatalogImage(item.image);

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: typeof resolvedImage === "string" ? resolvedImage : undefined,
    });
  }

  if (!product) {
    return (
      <section className="min-h-screen bg-[#f6f0eb] px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-3xl text-[#2f251d]">Product not found</h1>
        </div>
      </section>
    );
  }

  const imageSrc = resolveCatalogImage(product.image);

  function resolveImage(item: CatalogProduct) {
    return resolveCatalogImage(item.image);
  }

  return (
    <ProductByIdView
      product={product}
      imageSrc={imageSrc}
      cartCount={totalItems}
      onAddToCart={addToCart}
      relatedProducts={relatedProducts}
      resolveImage={resolveImage}
    />
  );
}
