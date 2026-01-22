"use client";

import { LanguageProvider } from "@/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductDetail } from "@/components/ProductDetail";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { use } from "react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  
  return (
    <LanguageProvider>
      <main>
        <ScrollProgress />
        <Navbar forceScrolled />
        <ProductDetail productId={id} />
        <Footer />
        <BackToTop />
      </main>
    </LanguageProvider>
  );
}
