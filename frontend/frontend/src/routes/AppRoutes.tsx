import { Routes, Route, Navigate } from 'react-router-dom';
import type { Product, CartItem, User } from '../types';

import Home from '../pages/Home/Home';
import Catalog from '../pages/Catalog/Catalog';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Cart from '../pages/Cart/Cart';
import Contacts from '../pages/Contacts/Contacts';
import Gallery from '../pages/Gallery/Gallery';
import About from '../pages/About/About';
import Clients from '../pages/Clients/Clients';
import Cooperation from '../pages/Clients/components/Cooperation';
import Payment from '../pages/Clients/components/Payment';
import Delivery from '../pages/Clients/components/Delivery';
import Files from '../pages/Clients/components/Files';
import Admin from '../pages/Admin/Admin';
import AdminOrders from '../pages/Admin/components/AdminOrders';
import AdminProducts from '../pages/Admin/components/AdminProducts';
import AdminCategories from '../pages/Admin/components/AdminCategories';
import AdminUsers from '../pages/Admin/components/AdminUsers';
import AdminSettings from '../pages/Admin/components/AdminSettings';

interface AppRoutesProps {
  onAddToCart: (product: Product) => void;
  cartItems: CartItem[];
  cartTotalPrice: number;
  user: User | null;
  onUpdateQuantity: (productId: string, quantity: number, isWholesale: boolean) => void;
  onRemoveItem: (productId: string, isWholesale: boolean) => void;
  onClearCart: () => void;
  onAuthClick: () => void;
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

      <Route path="/admin" element={<Admin user={user} />}>
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
