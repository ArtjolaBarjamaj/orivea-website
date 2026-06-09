"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import ProductByIdView from "@/components/sections/productes/ProductByIdView";
import { useCart } from "@/contexts/CartContext";
import {
  catalogProducts,
  getLocalizedProductName,
  resolveCatalogImage,
  productById,
  type CatalogProduct,
} from "@/lib/catalog";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductByIdPage() {
  const params = useParams<{ id?: string | string[] }>();
  const { addItem, updateQuantity, removeItem, totalItems, items } = useCart();
  const { lang } = useLanguage();
  const isSq = lang === "sq";
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const productId = rawId ?? "";

  const product = useMemo(() => {
    return productById.get(productId);
  }, [productId]);

  const relatedProducts = useMemo(() => {
    return catalogProducts.filter((item) => item.id !== productId).slice(0, 4);
  }, [productId]);

  const currentProductQuantity = useMemo(() => {
    return items
      .filter((item) => item.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [items, productId]);

  function addToCart(item: CatalogProduct, quantity: number) {
    const safeQuantity = Math.max(0, quantity);
    const resolvedImage = resolveCatalogImage(item.image);
    const matchingItems = items.filter((cartItem) => cartItem.id === item.id);

    if (matchingItems.length === 0) {
      if (safeQuantity === 0) return;
      addItem({
        id: item.id,
        name: getLocalizedProductName(item, lang),
        price: item.price,
        image: typeof resolvedImage === "string" ? resolvedImage : undefined,
      }, safeQuantity);
      return;
    }

    const [firstMatch, ...duplicates] = matchingItems;
    if (safeQuantity === 0) {
      removeItem(firstMatch.key);
    } else {
      updateQuantity(firstMatch.key, safeQuantity);
    }

    // Keep one cart row per product id if duplicates exist from older entries.
    duplicates.forEach((entry) => removeItem(entry.key));
  }

  if (!product) {
    return (
      <section className="min-h-screen bg-[#f6f0eb] px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-3xl text-[#2f251d]">{isSq ? "Produkti nuk u gjet" : "Product not found"}</h1>
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
      currentProductQuantity={currentProductQuantity}
      onAddToCart={addToCart}
      relatedProducts={relatedProducts}
      resolveImage={resolveImage}
    />
  );
}
