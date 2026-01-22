import { Product, NavItem, TrustPillar } from "@/types";
import productsData from "./products.json";

export const products: Product[] = productsData as Product[];

export const navItems: NavItem[] = [
  { label: "Watches", href: "#watches" },
  { label: "Jewellery", href: "#jewellery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const trustPillars: TrustPillar[] = [
  {
    title: "Authenticity & Quality",
    description: "Every piece verified and certified for genuine excellence",
    icon: "ShieldCheck",
  },
  {
    title: "Expert Guidance",
    description: "Personal consultation from our knowledgeable specialists",
    icon: "Users",
  },
  {
    title: "Premium Craftsmanship",
    description: "Curated selection from the world's finest maisons",
    icon: "Gem",
  },
  {
    title: "Gift-Ready Packaging",
    description: "Elegant presentation for every precious moment",
    icon: "Gift",
  },
];

export const businessInfo = {
  name: "Zacharias",
  tagline: "Watches & Jewellery",
  address: "Pecora Beach House, 33H, Georgiou 'A Str, Limassol 4040",
  phone: "25 323168",
  phoneLink: "tel:+35725323168",
  description: "Your trusted destination for luxury timepieces and fine jewellery in Limassol, Cyprus.",
};
