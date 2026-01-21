import { Product, NavItem, TrustPillar } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Patek Philippe Nautilus",
    category: "Watch",
    price: "€45,000",
    image: "/products/patek-nautilus.png",
    description: "Iconic luxury sports watch with distinctive porthole design",
  },
  {
    id: "2",
    name: "Cartier Love Bracelet",
    category: "Jewellery",
    price: "€6,900",
    image: "/products/cartier-love.png",
    description: "Timeless symbol of enduring love in 18k gold",
  },
  {
    id: "3",
    name: "Rolex Submariner",
    category: "Watch",
    price: "€12,500",
    image: "/products/rolex-submariner.png",
    description: "The quintessential diver's watch, refined since 1953",
  },
  {
    id: "4",
    name: "Bvlgari Serpenti Tubogas",
    category: "Watch",
    price: "€18,200",
    image: "/products/bvlgari-serpenti.jpg",
    description: "Serpentine elegance with iconic coiled design in 18k gold",
  },
  {
    id: "5",
    name: "Omega Speedmaster",
    category: "Watch",
    price: "€7,800",
    image: "/products/omega-speedmaster.png",
    description: "The first watch worn on the moon",
  },
  {
    id: "6",
    name: "Tiffany & Co. Diamond Ring",
    category: "Jewellery",
    price: "€15,000",
    image: "/products/tiffany-ring.png",
    description: "Exceptional brilliance, exceptional craftsmanship",
  },
];

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
