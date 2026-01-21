"use client";

import Link from "next/link";
import Image from "next/image";
import { businessInfo } from "@/data/products";
import { Separator } from "@/components/ui/separator";
import { Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/i18n";

export function Footer() {
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.watches, href: "#watches" },
    { label: t.nav.jewellery, href: "#jewellery" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Image
                src="/logo-horizontal-reversed.png"
                alt="Zacharias Watches & Jewellery"
                width={160}
                height={60}
                className="h-auto"
              />
            </div>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm mb-6">
              {t.business.description}
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/zachariaswatches/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/zachariaswatchesandjewellery/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-medium text-background mb-4">{t.footer.navigation}</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-background/70 hover:text-background text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-medium text-background mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={businessInfo.phoneLink}
                  className="flex items-center gap-2 text-background/70 hover:text-background text-sm transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                  {businessInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{businessInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <p>© {new Date().getFullYear()} {businessInfo.name}. {t.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-background transition-colors duration-200">
              {t.footer.privacy}
            </Link>
            <Link href="#" className="hover:text-background transition-colors duration-200">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
