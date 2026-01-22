"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Eye } from "lucide-react";
import { useLanguage } from "@/i18n";

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
  translations: {
    quickView: string;
    categoryLabel: string;
  };
}

function ProductCard({ product, index, onQuickView, translations }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/product/${product.id}`} className="block">
        <Card className="group overflow-hidden border-border/50 hover:border-burgundy/30 transition-all duration-300 bg-card card-hover-lift">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-white">
            {/* Product Image */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Always-visible view hint */}
            <div className="absolute top-3 right-3 p-2 rounded-full bg-background/80 text-muted-foreground opacity-60 group-hover:opacity-0 transition-opacity pointer-events-none">
              <Eye className="w-3 h-3" />
            </div>
            
            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/60 backdrop-blur-sm cursor-pointer"
              aria-label={`${translations.quickView} ${product.name}`}
            >
              <span className="flex items-center gap-2 text-foreground font-medium text-sm bg-background/90 px-4 py-2 rounded-full border border-border/50">
                <Eye className="w-4 h-4" />
                {translations.quickView}
              </span>
            </button>
          </div>

          {/* Content */}
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

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  translations: {
    productDetails: string;
    viewDetails: string;
    inquire: string;
    categoryLabel: string;
  };
}

function ProductQuickView({ product, isOpen, onClose, translations }: ProductQuickViewProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background border-border/50">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-medium">
            {product.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {translations.productDetails} {product.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <Badge
              variant="secondary"
              className="w-fit mb-4 bg-burgundy/10 text-burgundy border-0"
            >
              {translations.categoryLabel}
            </Badge>
            
            {product.price && (
              <p className="text-2xl font-medium text-foreground mb-4">
                {product.price}
              </p>
            )}
            
            {product.shortDescription && (
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.shortDescription}
              </p>
            )}

            <div className="flex flex-col gap-3 mt-auto">
              <Button asChild className="bg-burgundy hover:bg-burgundy/90 text-white">
                <Link href={`/product/${product.id}`}>
                  {translations.viewDetails}
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-foreground/20">
                <Link href="/contact">
                  {translations.inquire}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FeaturedGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { t } = useLanguage();

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Get translated category label
  const getCategoryLabel = (category: string) => {
    if (category.toLowerCase() === "watch") {
      return t.productCategories.watch;
    }
    return t.productCategories.jewellery;
  };

  return (
    <section id="watches" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-burgundy font-medium">
            {t.featured.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-4">
            {t.featured.sectionTitle}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t.featured.sectionDescription}
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.filter(p => p.isBestSeller).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={handleQuickView}
              translations={{
                quickView: t.featured.quickView,
                categoryLabel: getCategoryLabel(product.category),
              }}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        <ProductQuickView
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          translations={{
            productDetails: t.featured.productDetails,
            viewDetails: t.featured.viewDetails,
            inquire: t.productPage.inquire,
            categoryLabel: selectedProduct ? getCategoryLabel(selectedProduct.category) : "",
          }}
        />
      </div>
    </section>
  );
}
