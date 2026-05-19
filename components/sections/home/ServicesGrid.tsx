"use client";


import Image from "next/image";
import { useState } from "react";

export const products = [
    {
        id: 1,
        name: "Oils",
        description: "A blend of natural oils to nourish your skin.",
        price: "$29.00",
        image: "/serum.png",
        productes: [
            {
                id: 1,
                name: "Argan Oil 15ml",
                description: "A nourishing oil to hydrate and revitalize your skin.",
                price: "$29.00",
                image: "/mask1.jpg",
            },
            {
                id: 2,
                name: "Argan Oil 30ml",
                description: "A nourishing oil to hydrate and revitalize your skin.",
                price: "$29.00",
                image: "/mask1.jpg",
            }
        ]
    },
    {
        id: 2,
        name: "Powders",
        description: "A variety of natural powders for your skincare routine.",
        price: "$29.00",
        image: "/powder.png",
    },
    {
        id: 3,
        name: "Masks",
        description: "A variety of natural masks for your skincare routine.",
        price: "$29.00",
        image: "/oil.png",
        productes: [
            {
                id: 1,
                name: "Hydrating Mask",
                description: "A nourishing mask to hydrate and revitalize your skin.",
                price: "$29.00",
                image: "/mask1.jpg",
            }]
    },
    {
        id: 4,
        name: "Scrubs",
        description: "Exfoliate your skin gently.",
        price: "$19.00",
        image: "/scrub.jpg",
    },
    {
        id: 5,
        name: "Soaps",
        description: "Soothe and refresh your skin.",
        price: "$21.00",
        image: "/soap.jpg",
    },
];

export default function ProductGrid({ addToCart, cart }: any) {

    const [start, setStart] = useState(0);
    const visibleCount = 3;
    const canScrollLeft = start > 0;
    const canScrollRight = start + visibleCount < products.length;

    const handleLeft = () => {
        if (canScrollLeft) setStart(start - 1);
    };
    const handleRight = () => {
        if (canScrollRight) setStart(start + 1);
    };

    return (
        <section className="w-full py-10 px-4 bg-white flex flex-col items-center">
            <h2 className="text-4xl font-serif text-zinc-800 mb-10 text-center md:text-3xl sm:text-2xl">Our Services</h2>
            <div className="w-full max-w-6xl py-10 flex flex-col items-center justify-center gap-8 sm:py-6">
                <div
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full justify-items-center"
                >
                    {products.slice(start, start + visibleCount).map((product: any) => {
                        const usageMap: Record<number, string> = {
                            1: "Apply a few drops to clean skin every morning and night.",
                            2: "Gently massage onto face after cleansing, morning and evening.",
                            3: "Massage onto damp skin after showering for best results.",
                            4: "Use twice daily to cleanse your face before applying other products.",
                            5: "Apply with a cotton pad after cleansing to refresh and tone skin.",
                        };
                        const usage = usageMap[product.id] || "Use as directed.";
                        const count = cart?.filter((item: any) => item.id === product.id).length || 0;
                        return (
                            <div className="relative group cursor-help w-full min-w-0 max-w-xs" key={product.id}>
                                <div
                                    className="relative overflow-visible bg-white rounded-lg shadow p-4 md:p-8 flex flex-col items-center w-full max-w-xs overflow-hidden group"
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="object-cover rounded mb-4 w-full max-w-[90px] md:max-w-[180px]"
                                    />
                                    <div className="flex items-center gap-2 mb-2 w-full justify-center">
                                        <h3 className="text-base md:text-xl font-serif text-zinc-800 z-20 text-center">{product.name}</h3>
                                    </div>
                                    <span className="text-sm md:text-base text-zinc-700 mb-4 z-20 text-center">{product.description}</span>
                                    <div className="">
                                        <button
                                            style={{padding: '10px 20px !important' }}
                                            className="flex-1 p-3 md:p-5 bg-[#B0A69C] text-white rounded shadow hover:bg-[#a3927d] transition text-xs md:text-sm"
                                            onClick={() => addToCart(product)}
                                        >
                                            View Productes List
                                        </button>
                                        {count > 0 && (
                                            <span className="ml-2 px-3 py-2 bg-[#B0A69C] text-white rounded-full font-bold text-sm md:text-base min-w-[36px] text-center">
                                                {count}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className="pointer-events-none absolute left-1/2 top-full z-30 w-72 -translate-x-1/2 -mt-4 px-4 py-3 rounded-2xl shadow-xl border border-[#e5e2de] bg-white text-[#7c6c5c] text-center opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-in-out"
                                    style={{
                                        boxShadow: '0 8px 32px 0 rgba(176,166,156,0.18)',
                                    }}
                                >
                                    {/* Arrow (tail) */}
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center">
                                        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12C13.1046 12 24 0 24 0H0C0 0 10.8954 12 12 12Z" fill="white" stroke="#e5e2de" strokeWidth="1" />
                                        </svg>
                                    </span>
                                    <div className="flex items-center justify-center gap-2 mb-1 mt-2">
                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#B0A69C" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <circle cx="12" cy="16" r="1" />
                                        </svg>
                                        <span className="text-base font-semibold font-serif">Hint</span>
                                    </div>
                                    {product.productes && product.productes.length > 0 ? (
                                        <ul className="text-left mt-2">
                                            {product.productes.map((sub: any) => (
                                                <li key={sub.id} className="text-sm font-light leading-relaxed mb-1">
                                                    <span className="font-semibold">{sub.name}:</span> <span className="text-[#B0A69C]">{sub.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm font-light leading-relaxed">{usage}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* Butonat left/right jashtë grid-it, të qendruara */}
                <div className="flex justify-center items-center gap-8 mt-8">
                    <button
                        onClick={handleLeft}
                        disabled={!canScrollLeft}
                        className="bg-white/70 hover:bg-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Scroll left"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={handleRight}
                        disabled={!canScrollRight}
                        className="bg-white/70 hover:bg-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Scroll right"
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </section>
    );
}