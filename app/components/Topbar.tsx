"use client";

import Link from "next/link";

export default function Topbar() {
    return (
        <nav
            className="topbar-custom sticky top-0 z-50 w-full flex items-center justify-between px-8 py-4"
        >
            <div className="flex items-center gap-4">
                <img
                    className="topbar-logo"
                    src="/abstract_female_logo_traced_no_background.svg"
                    alt="Orivea Logo"
                    width={90}
                    height={90}
                />
                <span className="topbar-title text-white text-3xl font-light italic tracking-widest font-serif drop-shadow-sm">Orivea Glow</span>
            </div>
            <div className="topbar-links flex gap-12 items-center">
                <Link href="/" className="text-white text-lg font-light border-b-2 border-white pb-1">Home</Link>
                <Link href="/productes" className="text-white text-lg font-light hover:underline underline-offset-8 decoration-2 decoration-white">Productes</Link>
                <Link href="/about" className="text-white text-lg font-light hover:underline underline-offset-8 decoration-2 decoration-white">About</Link>
                <Link href="/contact" className="text-white text-lg font-light hover:underline underline-offset-8 decoration-2 decoration-white">Contact</Link>
            </div>
            <div>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9v9m-6-9v9m-6-9h12" />
                </svg>
            </div>
        </nav>
    );
}