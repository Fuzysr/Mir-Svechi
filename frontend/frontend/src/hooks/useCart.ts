import { useState, useCallback, useMemo } from 'react';
import type { CartItem, Product } from '../types';

const CART_KEY = 'mir-svechi-cart';

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const addItem = useCallback((product: Product, quantity: number = 1, isWholesale: boolean = false) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.isWholesale === isWholesale);
      let next: CartItem[];
      if (existing) {
        next = prev.map(item =>
          item.product.id === product.id && item.isWholesale === isWholesale
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        next = [...prev, { product, quantity, isWholesale }];
      }
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: string, isWholesale: boolean = false) => {
    setItems(prev => {
      const next = prev.filter(item => !(item.product.id === productId && item.isWholesale === isWholesale));
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, isWholesale: boolean = false) => {
    if (quantity < 1) return;
    setItems(prev => {
      const next = prev.map(item =>
        item.product.id === productId && item.isWholesale === isWholesale
          ? { ...item, quantity }
          : item
      );
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
  }, []);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const totalPrice = useMemo(() =>
    items.reduce((sum, item) => {
      const price = item.isWholesale && item.product.wholesalePrice
        ? item.product.wholesalePrice
        : item.product.price;
      return sum + price * item.quantity;
    }, 0),
    [items]
  );

  return { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice };
}
