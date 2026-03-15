import type { Product, Category } from '../types';

export function mapProduct(p: any): Product {
  return {
    id: p.id,
    article: p.article,
    name: p.name,
    description: p.description,
    price: p.price,
    wholesaleTiers: p.wholesale_tiers || p.wholesaleTiers || [],
    images: p.images || [],
    category: p.category_name || p.category || '',
    categoryId: p.category_id || p.categoryId || '',
    colors: p.colors || [],
    size: p.size || { height: '', diameter: '', label: '' },
    weight: p.weight,
    material: p.material,
    burnTime: p.burn_time || p.burnTime,
    fragrance: p.fragrance,
    inStock: p.in_stock ?? p.inStock ?? true,
    isHit: p.is_hit ?? p.isHit ?? false,
    isNew: p.is_new ?? p.isNew ?? false,
    createdAt: p.created_at || p.createdAt || '',
  };
}

export function mapCategory(c: any): Category {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    image: c.image,
    description: c.description,
    productCount: c.product_count ?? c.productCount ?? 0,
  };
}
