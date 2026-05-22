import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#ECE1D6] text-[#2f251d]">
      <div className="mx-auto w-full max-w-sm px-6 py-12 sm:max-w-6xl sm:px-8 md:px-10">
        <div className="border-b border-[#dfd6cc] pb-10">
          <h3 className="text-center font-serif italic text-[2rem] leading-tight sm:text-4xl">
            Join the Inner Circle
          </h3>
          <p className="mx-auto mt-4 max-w-md text-center text-[13px] leading-6 text-[#5f5347]">
            Receive exclusive access to first launches, limited batch releases, and the stories behind our harvests.
          </p>

          <div className="mx-auto mt-6 max-w-md">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full border-b border-[#d4c8bb] bg-transparent px-1 py-3 text-[13px] text-[#3b3129] placeholder:text-[#aa9b8b] outline-none"
            />
            <Link
              href="/shporta"
              className="mt-3 block w-full bg-[#0f1218] px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1a2230]"
            >
              Go To Shop
            </Link>
            <p className="mt-3 text-center text-[9px] uppercase tracking-[0.12em] text-[#9c8d7d]">
              By subscribing, you agree to our privacy policy
            </p>
          </div>
        </div>

        <div className="pt-10">
          <h4 className="font-serif italic text-[2rem] leading-tight sm:text-4xl">Orivea Glow</h4>
          <p className="mt-4 max-w-sm text-[13px] leading-6 text-[#5f5347]">
            Elevating daily rituals through the alchemy of Moroccan nature and modern design.
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.08em] text-[#8c7b69]">
            © {new Date().getFullYear()} Orivea Glow Born in Morocco
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6 text-[12px] leading-6">
            <div>
              <h5 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b7765]">Explore</h5>
              <a href="#" className="block text-[#4f4439] hover:text-[#2f251d]">Privacy Policy</a>
              <a href="#" className="block text-[#4f4439] hover:text-[#2f251d]">Terms of Service</a>
              <a href="#" className="block text-[#4f4439] hover:text-[#2f251d]">Shipping</a>
            </div>
            <div>
              <h5 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b7765]">Connect</h5>
              <a href="#" className="block text-[#4f4439] hover:text-[#2f251d]">WhatsApp</a>
              <a href="#" className="block text-[#4f4439] hover:text-[#2f251d]">Instagram</a>
            </div>
            <div>
              <h5 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b7765]">Locations</h5>
              <p className="text-[#4f4439]">Albania, Tirane</p>
            </div>
          </div>

          <div className="mt-10 border-t border-[#dfd6cc] pt-4">
            <a href="#top" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7d6a58] hover:text-[#2f251d]">
              Back To Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}