export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice?: number;
  wholesaleMinQuantity?: number;
  images: string[];
  category: string;
  categoryId: string;
  colors: string[];
  size: ProductSize;
  weight?: string;
  material?: string;
  burnTime?: string;
  fragrance?: string;
  inStock: boolean;
  isHit: boolean;
  isNew: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

export interface ProductSize {
  height: string;
  diameter: string;
  label: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isWholesale: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  comment?: string;
  adminMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface FilterState {
  categoryId: string | null;
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  search: string;
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'popular' | 'new';
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export interface Advantage {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: {
    telegram?: string;
    whatsapp?: string;
    vk?: string;
    instagram?: string;
  };
}
