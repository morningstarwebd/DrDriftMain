export interface Product {
  id: string;
  name: string;
  category: "floor" | "toilet" | "dish";
  description: string;
  shortDescription: string;
  variants: Variant[];
  images: string[];
}

export interface Variant {
  size: string;
  price: number;
}

export const products: Product[] = [
  {
    id: "dishwasher-250",
    name: "Dishwash Liquid",
    category: "dish",
    description: "Our ultra-concentrated dishwash liquid is tough on grease but gentle on hands. Formulated for effortless utensil washing, it leaves a long-lasting fresh lemon scent and sparkling clean surfaces. Perfect for both home and commercial kitchens.",
    shortDescription: "High-performance liquid for sparkling clean utensils.",
    variants: [
      { size: "250ml", price: 72 },
      { size: "500ml", price: 135 }, // Placeholder price based on trend
      { size: "5L", price: 899 }
    ],
    images: [
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Dishwasher/250ml/ChatGPT%20Image%20Mar%2018,%202026,%2003_36_48%20AM.png",
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Dishwasher/250ml/Whisk_12b4b58872c79e493c84d3a30cc2d523eg.png",
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Dishwasher/250ml/Whisk_db9d42c0f0663a7881247690560c6b0cdr.png",
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Dishwasher/5l/Whisk_5ab8e92917f2232ac2643dde314c53a2dr.png"
    ]
  },
  {
    id: "floor-cleaner",
    name: "Floor Cleaner",
    category: "floor",
    description: "Dr. Drift's premium floor cleaner is a specialized formula that ensures deep cleaning and 99.9% germ protection. Safe for various surfaces including marble, granite, and tiles. Ideal for high-traffic areas in hotels, cafes, and homes. Leaves no residue – only a fresh, premium fragrance.",
    shortDescription: "Specialized formula for germ-free, shiny floors.",
    variants: [
      { size: "500ml", price: 121 },
      { size: "5L", price: 691 }
    ],
    images: [
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Floor%20cleaner/500ml/Whisk_249ebd4759330f393264fec145402579eg.png",
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Floor%20cleaner/500ml/Whisk_58be3c5665c96b382434998dacaaf4c1eg.png",
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Floor%20cleaner/5l/Whisk_55751352e8a31f6a4ee49f0a1d3fffb0dr.png",
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Floor%20cleaner/5l/Whisk_ccac942e33f6ba685ab417a8f2b127b8eg.png"
    ]
  },
  {
    id: "toilet-cleaner",
    name: "Toilet Cleaner",
    category: "toilet",
    description: "Experience professional-grade sanitation with Dr. Drift's toilet cleaner. Its thick, powerful formula clings to surfaces for deep-stain removal and long-lasting freshness. Engineered for both B2B facility management and B2C home use.",
    shortDescription: "Thick powerful formula for superior bathroom hygiene.",
    variants: [
      { size: "500ml", price: 123 },
      { size: "5L", price: 799 }
    ],
    images: [
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Toilet%20cleaner/500ml/Whisk_23e48edffcb530489ce44ca4ca3d64f3eg.png",
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Toilet%20cleaner/500ml/Whisk_c74d9273340930aa0e54f1fe5b521041eg.png",
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Toilet%20cleaner/5l/Whisk_f3e343fa074b487ad364388a0e8bf0a4eg.png",
      "https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Toilet%20cleaner/5l/Whisk_85f5e1f3aff218fa8904c8f0d832a253eg.png"
    ]
  }
];
