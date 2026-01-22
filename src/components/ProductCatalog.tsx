"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "@/i18n";

interface ProductCatalogProps {
  products: Product[];
  category: "Watch" | "Jewellery";
  sexOptions: string[];
  typeOptions: string[];
}

interface FilterState {
  search: string;
  sex: string[];
  productType: string[];
}

function ProductCard({
  product,
  index,
  translations,
}: {
  product: Product;
  index: number;
  translations: { categoryLabel: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/product/${product.id}`} className="block">
        <Card className="group overflow-hidden border-border/50 hover:border-burgundy/30 transition-all duration-300 bg-card card-hover-lift">
          <div className="relative aspect-square overflow-hidden bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <Badge
              variant="secondary"
              className="mb-2 text-xs font-normal bg-burgundy/10 text-burgundy border-0"
            >
              {translations.categoryLabel}
            </Badge>
            <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-1">
              {product.name}
            </h3>
            {product.price && (
              <p className="text-muted-foreground text-sm">{product.price}</p>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${
        isActive
          ? "bg-burgundy text-white border-burgundy"
          : "bg-background border-border hover:border-burgundy/50 text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function FilterSection({
  filters,
  setFilters,
  sexOptions,
  typeOptions,
  translations,
}: {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  sexOptions: string[];
  typeOptions: string[];
  translations: {
    sexLabel: string;
    typeLabel: string;
    clearFilters: string;
    sexOptions: Record<string, string>;
    typeOptions: Record<string, string>;
  };
}) {
  const toggleSex = (sex: string) => {
    const newSex = filters.sex.includes(sex)
      ? filters.sex.filter((s) => s !== sex)
      : [...filters.sex, sex];
    setFilters({ ...filters, sex: newSex });
  };

  const toggleType = (type: string) => {
    const newType = filters.productType.includes(type)
      ? filters.productType.filter((t) => t !== type)
      : [...filters.productType, type];
    setFilters({ ...filters, productType: newType });
  };

  const hasActiveFilters = filters.sex.length > 0 || filters.productType.length > 0;

  return (
    <div className="space-y-6">
      {/* Sex Filter */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">
          {translations.sexLabel}
        </h4>
        <div className="flex flex-wrap gap-2">
          {sexOptions.map((sex) => (
            <FilterButton
              key={sex}
              label={translations.sexOptions[sex] || sex}
              isActive={filters.sex.includes(sex)}
              onClick={() => toggleSex(sex)}
            />
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">
          {translations.typeLabel}
        </h4>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((type) => (
            <FilterButton
              key={type}
              label={translations.typeOptions[type] || type}
              isActive={filters.productType.includes(type)}
              onClick={() => toggleType(type)}
            />
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={() => setFilters({ ...filters, sex: [], productType: [] })}
          className="text-sm text-burgundy hover:text-burgundy/80 flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          {translations.clearFilters}
        </button>
      )}
    </div>
  );
}

export function ProductCatalogContent({
  products,
  category,
  sexOptions,
  typeOptions,
}: ProductCatalogProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    sex: [],
    productType: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useLanguage();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      // Sex filter
      if (filters.sex.length > 0 && !filters.sex.includes(product.sex)) {
        return false;
      }
      // Product type filter
      if (
        filters.productType.length > 0 &&
        !filters.productType.includes(product.productType)
      ) {
        return false;
      }
      return true;
    });
  }, [products, filters]);

  const getCategoryLabel = (cat: string) => {
    if (cat.toLowerCase() === "watch") {
      return t.productCategories.watch;
    }
    return t.productCategories.jewellery;
  };

  const activeFilterCount = filters.sex.length + filters.productType.length;

  const filterTranslations = {
    sexLabel: t.catalogPage.sexLabel,
    typeLabel: t.catalogPage.typeLabel,
    clearFilters: t.catalogPage.clearFilters,
    sexOptions: t.catalogPage.sexOptions,
    typeOptions: t.catalogPage.typeOptions,
  };

  const pageTitle = category === "Watch" ? t.catalogPage.watchesTitle : t.catalogPage.jewelleryTitle;
  const pageDescription = category === "Watch" ? t.catalogPage.watchesDescription : t.catalogPage.jewelleryDescription;

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="text-sm tracking-[0.2em] uppercase text-burgundy font-medium">
              {t.catalogPage.sectionLabel}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-4">
              {pageTitle}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {pageDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Search and Filter Bar */}
          <div className="bg-card rounded-xl border border-border/50 p-4 md:p-6 mb-8 shadow-sm">
            {/* Top Row: Search + Mobile Filter Button */}
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t.catalogPage.searchPlaceholder}
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all"
                />
              </div>

              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="lg" className="gap-2 shrink-0">
                    <SlidersHorizontal className="w-4 h-4" />
                    {activeFilterCount > 0 && (
                      <Badge className="bg-burgundy text-white text-xs px-1.5 py-0.5">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background">
                  <SheetTitle className="font-serif text-xl mb-6">
                    {t.catalogPage.filters}
                  </SheetTitle>
                  <FilterSection
                    filters={filters}
                    setFilters={setFilters}
                    sexOptions={sexOptions}
                    typeOptions={typeOptions}
                    translations={filterTranslations}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Filters Row */}
            <div className="hidden md:flex flex-wrap items-center gap-6">
              {/* Sex Filter */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {t.catalogPage.sexLabel}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {sexOptions.map((sex) => (
                    <FilterButton
                      key={sex}
                      label={filterTranslations.sexOptions[sex as keyof typeof filterTranslations.sexOptions] || sex}
                      isActive={filters.sex.includes(sex)}
                      onClick={() => {
                        const newSex = filters.sex.includes(sex)
                          ? filters.sex.filter((s) => s !== sex)
                          : [...filters.sex, sex];
                        setFilters({ ...filters, sex: newSex });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-border" />

              {/* Type Filter */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {t.catalogPage.typeLabel}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map((type) => (
                    <FilterButton
                      key={type}
                      label={filterTranslations.typeOptions[type as keyof typeof filterTranslations.typeOptions] || type}
                      isActive={filters.productType.includes(type)}
                      onClick={() => {
                        const newType = filters.productType.includes(type)
                          ? filters.productType.filter((t) => t !== type)
                          : [...filters.productType, type];
                        setFilters({ ...filters, productType: newType });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <>
                  <div className="h-6 w-px bg-border" />
                  <button
                    onClick={() => setFilters({ search: "", sex: [], productType: [] })}
                    className="text-sm text-burgundy hover:text-burgundy/80 flex items-center gap-1 font-medium"
                  >
                    <X className="w-3 h-3" />
                    {t.catalogPage.clearFilters}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            {t.catalogPage.showingResults
              .replace("{count}", filteredProducts.length.toString())
              .replace("{total}", products.length.toString())}
          </p>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  translations={{
                    categoryLabel: getCategoryLabel(product.category),
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {t.catalogPage.noResults}
              </p>
              <button
                onClick={() => setFilters({ search: "", sex: [], productType: [] })}
                className="mt-4 text-burgundy hover:text-burgundy/80 font-medium"
              >
                {t.catalogPage.clearFilters}
              </button>
            </div>
          )}
        </div>
      </section>


    </>
  );
}
