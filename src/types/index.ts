export type Product = {
  id: string;
  name: string;
  category: "Watch" | "Jewellery";
  sex: "Men" | "Women" | "Unisex";
  productType: string;
  isBestSeller: boolean;
  price?: string;
  image: string;
  shortDescription: string;
  description?: string;
  details?: {
    specifications?: { label: string; value: string }[];
    materials?: string[];
    features?: string[];
  };
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
