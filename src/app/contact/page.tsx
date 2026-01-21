"use client";

import { LanguageProvider } from "@/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

export default function ContactPage() {
  return (
    <LanguageProvider>
      <main>
        <ScrollProgress />
        <Navbar forceScrolled />
        <ContactSection />
        <Footer />
        <BackToTop />
      </main>
    </LanguageProvider>
  );
}
