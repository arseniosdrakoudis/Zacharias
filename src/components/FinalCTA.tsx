"use client";

import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/data/products";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-r from-burgundy/5 via-background to-burgundy/5 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Visit Zacharias in Limassol
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Discover the perfect piece for your collection or a special occasion. 
            Our experts are ready to assist you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-burgundy hover:bg-burgundy/90 text-white px-8 magnetic-hover"
            >
              <a href={businessInfo.phoneLink} className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call {businessInfo.phone}
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-foreground/20 hover:border-foreground/40 px-8"
            >
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
