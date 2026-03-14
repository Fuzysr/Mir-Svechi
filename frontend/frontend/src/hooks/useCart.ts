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

function getPriceForQuantity(product: Product, quantity: number): number {
  if (product.wholesaleTiers.length === 0) return product.price;
  for (let i = product.wholesaleTiers.length - 1; i >= 0; i--) {
    if (quantity >= product.wholesaleTiers[i].minQuantity) {
      return product.wholesaleTiers[i].price;
    }
  }
  return product.price;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        next = [...prev, { product, quantity }];
      }
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => {
      const next = prev.filter(item => item.product.id !== productId);
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => {
      const next = prev.map(item =>
        item.product.id === productId
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
      const price = getPriceForQuantity(item.product, item.quantity);
      return sum + price * item.quantity;
    }, 0),
    [items]
  );

  return { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, getPriceForQuantity };
}
