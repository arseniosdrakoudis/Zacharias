"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/data/products";

export function StoreVisit() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] lg:aspect-[4/3] rounded-lg overflow-hidden"
          >
            <Image
              src="/boutique.png"
              alt="Zacharias Watches & Jewellery Boutique in Limassol"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm tracking-[0.2em] uppercase text-burgundy font-medium">
              Visit Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mt-4 mb-6">
              Our Boutique
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Experience our collection in person. Our expert team is ready to guide you 
              through our curated selection of luxury timepieces and exquisite jewellery.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Address</p>
                  <p className="text-muted-foreground text-sm">{businessInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Phone</p>
                  <a
                    href={businessInfo.phoneLink}
                    className="text-burgundy hover:text-burgundy/80 transition-colors text-sm font-medium"
                  >
                    {businessInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Hours</p>
                  <p className="text-muted-foreground text-sm">Mon–Sat: 10:00 – 19:00</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                asChild
                className="bg-burgundy hover:bg-burgundy/90 text-white magnetic-hover"
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
                className="border-foreground/20 hover:border-foreground/40"
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
      </div>
    </section>
  );
}
