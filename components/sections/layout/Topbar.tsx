"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, ShoppingCart, X } from "lucide-react";

const NAV_ITEMS = [
    { href: "/", label: "Home" },
    { href: "/productes", label: "Productes" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);
    const pathname = usePathname();

    const isActivePath = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const navClassName = (href: string, mobile = false) => {
        const sizeClass = mobile ? "text-sm sm:text-base" : "text-lg";
        return `text-white ${sizeClass} font-light underline-offset-8 decoration-2 decoration-white ${isActivePath(href)
            ? "underline"
            : "hover:underline"
            }`;
    };

    useEffect(() => {
        const updateTopbarHeight = () => {
            if (!navRef.current) return;
            const height = Math.ceil(navRef.current.getBoundingClientRect().height);
            document.documentElement.style.setProperty("--topbar-height", `${height}px`);
        };

        updateTopbarHeight();

        const resizeObserver = new ResizeObserver(updateTopbarHeight);
        if (navRef.current) {
            resizeObserver.observe(navRef.current);
        }

        window.addEventListener("resize", updateTopbarHeight);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateTopbarHeight);
        };
    }, []);

    return (
        <nav ref={navRef} className="topbar-sticky bg-[#b0a69c]  w-full shadow-[0_5px_8px_#887f76]">
            <div className="w-full flex items-center justify-between border-b-[1px] border-white sm:border-none px-4 py-4 sm:px-8 sm:py-4">
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="topbar-menu-toggle"
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? (
                        <X className="topbar-menu-close h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                        <>
                            <span className="topbar-menu-line" />
                            <span className="topbar-menu-line" />
                            <span className="topbar-menu-line" />
                        </>
                    )}
                </button>
                <div className="flex items-center gap-0 min-[640px]:gap-4">
                    <img
                        className="topbar-logo"
                        src="/white_main_logo.svg"
                        alt="Orivea Logo"
                        width={90}
                        height={90}
                    />
                    <span className="topbar-title text-white text-3xl font-light italic tracking-widest font-serif drop-shadow-sm">Orivea Glow</span>
                </div>
                <div className="flex items-center gap-4 sm:hidden">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            className="text-white/90 hover:text-white transition-colors"
                        >
                            <Camera className="h-5 w-5" aria-hidden="true" />
                        </a>
                        <Link
                            href="/contact"
                            aria-label="Shop"
                            className="text-white/90 hover:text-white transition-colors"
                        >
                            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                        </Link>
                </div>

                <div className="topbar-links topbar-links-desktop px-8 gap-12 items-center self-center">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={navClassName(item.href)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="topbar-links topbar-links-desktop px-8 gap-5 items-center self-center">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="text-white/90 hover:text-white transition-colors"
                    >
                        <Camera className="h-5 w-5" aria-hidden="true" />
                    </a>
                    <Link
                        href="/contact"
                        aria-label="Shop"
                        className="text-white/90 hover:text-white transition-colors"
                    >
                        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                    </Link>
                </div>
            </div>

            {isOpen && (
                <div id="mobile-menu" className="w-full topbar-links topbar-links-mobile !flex-row !items-center !justify-between px-4 pb-4 pt-3">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                onClick={() => setIsOpen(false)}
                                href={item.href}
                                className={navClassName(item.href, true)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                </div>
            )}
        </nav>
    );
}