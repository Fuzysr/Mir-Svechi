import { Routes, Route, Navigate } from 'react-router-dom';
import type { Product, CartItem, User } from '../types';

import Home from '../pages/home/Home';
import Catalog from '../pages/catalog/Catalog';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Cart from '../pages/cart/Cart';
import Contacts from '../pages/contacts/Contacts';
import Gallery from '../pages/gallery/Gallery';
import About from '../pages/about/About';
import Clients from '../pages/clients/Clients';
import Cooperation from '../pages/clients/components/Cooperation';
import Payment from '../pages/clients/components/Payment';
import Delivery from '../pages/clients/components/Delivery';
import Files from '../pages/clients/components/Files';
import Admin from '../pages/admin/Admin';
import AdminOrders from '../pages/admin/components/AdminOrders';
import AdminProducts from '../pages/admin/components/AdminProducts';
import AdminCategories from '../pages/admin/components/AdminCategories';
import AdminUsers from '../pages/admin/components/AdminUsers';
import AdminSettings from '../pages/admin/components/AdminSettings';

interface AppRoutesProps {
  onAddToCart: (product: Product, quantity: number) => void;
  cartItems: CartItem[];
  cartTotalPrice: number;
  user: User | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onAuthClick: () => void;
  onLogout: () => void;
}

export default function AppRoutes({
  onAddToCart,
  cartItems,
  cartTotalPrice,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAuthClick,
  onLogout,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Home onAddToCart={onAddToCart} />} />
      <Route path="/catalog" element={<Catalog onAddToCart={onAddToCart} />} />
      <Route path="/product/:id" element={<ProductDetail onAddToCart={onAddToCart} />} />
      <Route
        path="/cart"
        element={
          <Cart
            items={cartItems}
            totalPrice={cartTotalPrice}
            user={user}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            onClearCart={onClearCart}
            onAuthClick={onAuthClick}
          />
        }
      />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />

      <Route path="/clients" element={<Clients />}>
        <Route index element={<Navigate to="cooperation" replace />} />
        <Route path="cooperation" element={<Cooperation />} />
        <Route path="payment" element={<Payment />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="files" element={<Files />} />
      </Route>

      <Route path="/admin" element={<Admin user={user} onLogout={onLogout} />}>
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
