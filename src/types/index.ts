export type Product = {
  id: string;
  name: string;
  category: "Watch" | "Jewellery";
  price?: string;
  image: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type TrustPillar = {
  title: string;
  description: string;
  icon: string;
};
