"use client";

import { LanguageProvider } from "@/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { ProductCatalogContent } from "@/components/ProductCatalog";
import productsData from "@/data/products.json";
import { Product } from "@/types";

export default function JewelleryPage() {
  const products = (productsData as Product[]).filter(
    (p) => p.category === "Jewellery"
  );

  // Get unique sex and type options for jewellery
  const sexOptions = [...new Set(products.map((p) => p.sex))];
  const typeOptions = [...new Set(products.map((p) => p.productType))];

  return (
    <LanguageProvider>
      <main>
        <ScrollProgress />
        <Navbar forceScrolled />
        <ProductCatalogContent
          products={products}
          category="Jewellery"
          sexOptions={sexOptions}
          typeOptions={typeOptions}
        />
        <Footer />
        <BackToTop />
      </main>
    </LanguageProvider>
  );
}
