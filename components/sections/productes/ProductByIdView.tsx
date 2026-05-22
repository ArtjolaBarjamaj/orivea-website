"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { getLocalizedProductDescription, getLocalizedProductName, getLocalizedProductUsage, resolveCatalogImage } from "@/lib/catalog";
import { useLanguage } from "@/contexts/LanguageContext";

type ProductItem = {
    id: string;
    name: string;
    description: string;
    fullDescription?: string;
    price: number;
    image: string;
    gallery?: string[];
    content?: string;
    usage?: string;
    serviceIds: string[];
};

type ProductByIdViewProps = {
    product: ProductItem;
    imageSrc: string | StaticImageData;
    cartCount: number;
    onAddToCart: (product: ProductItem) => void;
    relatedProducts: ProductItem[];
    resolveImage: (product: ProductItem) => string | StaticImageData;
};

function formatPrice(price: number) {
    return `Lek ${price.toFixed(2)}`;
}

export default function ProductByIdView({
    product,
    imageSrc,
    cartCount,
    onAddToCart,
    relatedProducts,
    resolveImage,
}: ProductByIdViewProps) {
    const { lang } = useLanguage();
    const isSq = lang === "sq";
    const gallery = product.gallery?.length ? product.gallery : [product.image, product.image, product.image];

    const ritualSteps = (getLocalizedProductUsage(product, lang) || (isSq
        ? "Ngroh një sasi të vogël në pëllëmbë. Aplikoje butësisht në lëkurë të pastër. Lëre të përthithet natyrshëm."
        : "Warm a small amount between palms. Apply gently on clean skin. Let it absorb naturally."))
        .split(".")
        .map((step) => step.trim())
        .filter(Boolean)
        .slice(0, 3);

    function handleAddToCart() {
        onAddToCart(product);
    }

    return (
        <section className="min-h-screen bg-[#ece8e3] px-3 py-6 md:px-8 md:py-10">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-5 flex items-center justify-between md:mb-8">
                    <Link
                        href="/productes"
                        className="text-[10px] uppercase tracking-[0.14em] text-[#5f5a53] underline underline-offset-4 hover:text-[#2d2a26]"
                    >
                        {isSq ? "Kthehu te produktet" : "Back to products"}
                    </Link>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#7e5e42]">{isSq ? "Produkte në shportë" : "Items in cart"}: {cartCount}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-[1.05fr_1fr] md:gap-10">
                    <div>
                        <div className="relative mb-2 aspect-[4/5] w-full overflow-hidden bg-[#ddd6ce]">
                            <Image
                                src={imageSrc}
                                alt={getLocalizedProductName(product, lang)}
                                fill
                                sizes="(max-width: 768px) 94vw, 48vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="relative aspect-[3/3] overflow-hidden bg-[#ddd6ce]">
                                <div className="relative mx-auto my-[10%] h-[80%] w-[80%]">
                                    <Image
                                        src={resolveCatalogImage(gallery[1] ?? gallery[0])}
                                        alt={`${getLocalizedProductName(product, lang)} preview 1`}
                                        fill
                                        sizes="(max-width: 768px) 46vw, 20vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="relative aspect-[3/3] overflow-hidden bg-[#ddd6ce]">
                                <div className="relative mx-auto my-[10%] h-[80%] w-[80%]">
                                    <Image
                                        src={resolveCatalogImage(gallery[2] ?? gallery[0])}
                                        alt={`${getLocalizedProductName(product, lang)} preview 2`}
                                        fill
                                        sizes="(max-width: 768px) 46vw, 20vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[430px] px-0 py-1 md:py-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8178]">{isSq ? "Trajtim Ushqyes" : "Nourishing Treatment"}</p>
                        <h1 className="mt-1 font-serif text-[2.35rem] leading-[1.02] text-[#2a241e] md:text-[2.8rem]">
                            {getLocalizedProductName(product, lang)}
                        </h1>
                        <p className="mt-2 font-serif text-[2rem] leading-none text-[#4a4138] md:text-[2.25rem]">{formatPrice(product.price)}</p>

                        <div className="mt-6 inline-flex rounded-md bg-[#dfd5cb] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a7561]">
                            {isSq ? "Me Burim Etik" : "Ethically Sourced"}
                        </div>

                        <div className="mt-6 border-t border-[#dfd8d0]" />

                        <div className="mt-6">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-[#403a35]">{isSq ? "Përshkrimi" : "Description"}</p>
                            {product.description && <p className="mt-3 text-[13px] leading-7 text-[#66615b] md:text-[14px]">{getLocalizedProductDescription(product, lang)}</p>}
                            {product.fullDescription && <p className="mt-3 text-[13px] leading-7 text-[#66615b] md:text-[14px]">{product.fullDescription}</p>}
                        </div>

                        <div className="mt-8">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-[#403a35]">{isSq ? "Përdorimi" : "Usage"}</p>
                            <ol className="mt-3 space-y-3.5">
                                {ritualSteps.map((step, index) => (
                                    <li key={index} className="grid grid-cols-[24px_1fr] items-start gap-2 text-[13px] leading-6 text-[#66615b] md:text-[14px]">
                                        <span className="text-[10px] tracking-[0.1em] text-[#8d857d]">{String(index + 1).padStart(2, "0")}</span>
                                        <span>{step}.</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="mt-8 inline-flex w-full items-center justify-center bg-[#121416] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#2a2e32]"
                        >
                            {isSq ? "Shto në shportë" : "Add to bag"}
                        </button>
                    </div>
                </div>

                <div className="mt-9 md:mt-12">
                    <h2 className="font-serif text-xl text-[#2f251d] md:text-2xl">{isSq ? "Mund të pëlqesh edhe" : "You may also like"}</h2>
                    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                        {relatedProducts.map((related) => (
                            <article key={related.id} className="bg-transparent">
                                <Link href={`/productes/${related.id}`} className="block">
                                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ddd6ce]">
                                        <Image
                                            src={resolveImage(related)}
                                            alt={getLocalizedProductName(related, lang)}
                                            fill
                                            sizes="(max-width: 768px) 45vw, 20vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </Link>
                                <h3 className="mt-2 font-serif text-sm leading-tight text-[#2f251d] md:text-base">{getLocalizedProductName(related, lang)}</h3>
                                <p className="mt-1 text-xs text-[#5e5a55]">{formatPrice(related.price)}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#dfd8d0] pt-4">
                    <Link
                        href="/productes"
                        className="text-[10px] uppercase tracking-[0.14em] text-[#5f5a53] underline underline-offset-4 hover:text-[#2d2a26]"
                    >
                        {isSq ? "Shiko të gjitha produktet" : "View all products"}
                    </Link>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#93877b]">|</span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#93877b]">{isSq ? "Më shumë informacion mund të shtohet më vonë" : "More info can be added later"}</span>
                </div>
            </div>
        </section>
    );
}
