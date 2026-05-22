"use client";


import Image from "next/image";
import useRevealOnScroll from "@/hooks/useRevealOnScroll";

export default function BrandInfoGrid() {
	const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.2);
	return (
		<section ref={ref} className={`reveal-section w-full bg-[#fef2e7] py-12 flex justify-center items-center ${isVisible ? "is-visible" : ""}`}>
			<div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto flex flex-col items-center bg-[#fef2e7]">
				{/* Image on top */}
				<div className="anim-fade-up anim-hover-lift w-full aspect-square bg-[#fef2e7] rounded mb-5 overflow-hidden flex items-center justify-center" style={{ minHeight: 180, minWidth: 180 }}>
					<Image
						src="/orivea_description.png"
						alt="Orivea Founder"
						width={260}
						height={260}
						className="object-contain w-full h-full"
						priority
					/>
				</div>
				{/* Content below image */}
				<p className="anim-fade-up text-[10px] uppercase tracking-[0.18em] text-[#b49c7a] mb-2">Heritage</p>
				<h3 className="anim-fade-up anim-delay-1 font-serif italic text-[1.35rem] sm:text-2xl text-[#2f251d] mb-3 leading-tight">The Soul of Orivea</h3>
				<p className="anim-fade-up anim-delay-2 text-[#7c6c5c] text-[13px] leading-[1.7] mb-4 text-center">
Orivea is a brand dedicated to natural skincare, inspired by nature and the best traditions of self-care. Our products are formulated with organic ingredients, free from parabens, and cruelty-free, ensuring a clean, safe, and sustainable routine. Discover natural beauty with Orivea.				</p>
				<p className="anim-fade-up anim-delay-2 text-[11px] text-[#7c6c5c] italic border-l-2 border-[#b49c7a] pl-3 mb-5 max-w-xs mx-auto">
					"Skincare is not just a routine; it is a sacred pause in a loud world."
				</p>
				<button className="anim-fade-up anim-delay-3 mt-2 px-5 py-2 border border-[#b49c7a] text-[11px] tracking-[0.12em] uppercase text-[#7c6c5c] bg-transparent rounded hover:bg-[#ede6de] transition">
					Our Full Story
				</button>
			</div>
		</section>
	);
}
