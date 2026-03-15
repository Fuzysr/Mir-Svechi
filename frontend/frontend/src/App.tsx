import { useCallback } from 'react';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import AuthModal from './components/AuthModal/AuthModal';
import AppRoutes from './routes/AppRoutes';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';
import type { Product } from './types';

function AppContent() {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { user, login, register, logout, showAuthModal, openAuthModal, closeAuthModal } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = useCallback((product: Product) => {
    if (!user) {
      openAuthModal();
      return;
    }
    addItem(product);
  }, [user, openAuthModal, addItem]);

  const handleCartClick = useCallback(() => {
    navigate('/cart');
  }, [navigate]);

  const handleSearch = useCallback((query: string) => {
    navigate(`/catalog?search=${encodeURIComponent(query)}`);
  }, [navigate]);

  const handleAuthClick = useCallback(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        logout();
      }
    } else {
      openAuthModal();
    }
  }, [user, navigate, logout, openAuthModal]);

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        cartCount={totalItems}
        isLoggedIn={!!user}
        onCartClick={handleCartClick}
        onAuthClick={handleAuthClick}
        onSearch={handleSearch}
      />

      <main style={{ flex: 1 }}>
        <AppRoutes
          onAddToCart={handleAddToCart}
          cartItems={items}
          cartTotalPrice={totalPrice}
          user={user}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
          onAuthClick={openAuthModal}
          onLogout={logout}
        />
      </main>

      {!isAdminPage && <Footer />}

      <AuthModal
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        onLogin={login}
        onRegister={register}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;