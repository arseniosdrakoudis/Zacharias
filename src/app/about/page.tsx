"use client";

import { LanguageProvider } from "@/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

export default function AboutPage() {
  return (
    <LanguageProvider>
      <main>
        <ScrollProgress />
        <Navbar forceScrolled />
        <AboutSection />
        <Footer />
        <BackToTop />
      </main>
    </LanguageProvider>
  );
}
