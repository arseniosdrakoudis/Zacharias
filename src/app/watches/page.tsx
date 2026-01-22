"use client";

import { LanguageProvider } from "@/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { ProductCatalogContent } from "@/components/ProductCatalog";
import productsData from "@/data/products.json";
import { Product } from "@/types";

export default function WatchesPage() {
  const products = (productsData as Product[]).filter(
    (p) => p.category === "Watch"
  );

  // Get unique sex and type options for watches
  const sexOptions = [...new Set(products.map((p) => p.sex))];
  const typeOptions = [...new Set(products.map((p) => p.productType))];

  return (
    <LanguageProvider>
      <main>
        <ScrollProgress />
        <Navbar forceScrolled />
        <ProductCatalogContent
          products={products}
          category="Watch"
          sexOptions={sexOptions}
          typeOptions={typeOptions}
        />
        <Footer />
        <BackToTop />
      </main>
    </LanguageProvider>
  );
}
