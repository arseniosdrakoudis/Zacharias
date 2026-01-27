import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zacharias | Watches & Jewellery - Limassol, Cyprus",
  description:
    "Discover exceptional timepieces and exquisite jewellery at Zacharias. Your trusted boutique for luxury watches and fine jewellery in Limassol, Cyprus since 1985.",
  keywords: [
    "luxury watches",
    "fine jewellery",
    "Limassol",
    "Cyprus",
    "Patek Philippe",
    "Rolex",
    "Cartier",
    "boutique",
  ],
  openGraph: {
    title: "Zacharias | Watches & Jewellery",
    description:
      "Exceptional timepieces and exquisite jewellery. Visit our boutique in Limassol, Cyprus.",
    type: "website",
    locale: "en_CY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload hero AVIF clip for optimal LCP */}
        <link
          rel="preload"
          href="/hero-clip-1.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        {/* Keep JPG as fallback preload for unsupported browsers */}
        <link
          rel="preload"
          href="/hero-poster.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased`}
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
