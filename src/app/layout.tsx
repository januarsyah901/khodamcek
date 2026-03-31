import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Khodam Registry | Penjaga Spiritualmu (Horror Edition)",
  description: "Cek Khodam penjagamu sekarang. Deterministik, penuh aura mistis, dan berwibawa dari dimensi lain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans`}
      >
        <div className="noise-bg" />
        <div className="vignette" />
        {/* Subtle red glow in center top */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-red-900/10 blur-[150px] -z-10 rounded-full" />
        
        <div className="relative z-0 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
