import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../lib/globals.css";
import Topbar from "../components/sections/layout/Topbar";
import Footer from "../components/sections/layout/Footer";
import AppProviders from "@/components/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orivea Body Care",
  description: "Kozmetikë dhe produkte për kujdesin e trupit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sq"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black">
        <AppProviders>
          <Topbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}