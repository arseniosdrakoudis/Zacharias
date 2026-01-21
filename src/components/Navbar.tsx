"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { businessInfo } from "@/data/products";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavbarProps {
  forceScrolled?: boolean;
}

export function Navbar({ forceScrolled = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(forceScrolled);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (forceScrolled) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceScrolled]);

  const navItems = [
    { label: t.nav.watches, href: "#watches" },
    { label: t.nav.jewellery, href: "#jewellery" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Logo width={220} height={80} variant={isScrolled ? "normal" : "reversed"} />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 link-underline",
                  isScrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-white/90 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher isScrolled={isScrolled} />
          <Button
            variant="outline"
            size="sm"
            asChild
            className={cn(
              isScrolled
                ? "border-foreground/20 hover:border-foreground/40"
                : "border-white/50 hover:border-white/80"
            )}
          >
            <Link href="/contact">{t.common.bookVisit}</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-burgundy hover:bg-burgundy/90 text-white magnetic-hover"
          >
            <a href={businessInfo.phoneLink} className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {t.common.callNow}
            </a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className={cn(!isScrolled && "text-white hover:bg-white/10")}>
              <Menu className="w-6 h-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-background">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full pt-8">
              <Logo width={180} height={65} className="mb-8" />
              <ul className="flex flex-col gap-4 mb-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Language Switcher */}
              <div className="mb-6">
                <LanguageSwitcher variant="mobile" />
              </div>

              <div className="flex flex-col gap-3 mt-auto mb-8">
                <Button variant="outline" size="lg" asChild className="w-full">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    {t.common.bookVisit}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  asChild
                  className="w-full bg-burgundy hover:bg-burgundy/90 text-white"
                >
                  <a href={businessInfo.phoneLink} className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t.common.callNow} {businessInfo.phone}
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
