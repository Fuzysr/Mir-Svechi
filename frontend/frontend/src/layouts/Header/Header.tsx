import { useState, useEffect, useCallback, memo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.svg';
import styles from './Header.module.css';

interface HeaderProps {
  cartCount: number;
  isLoggedIn: boolean;
  onCartClick: () => void;
  onAuthClick: () => void;
  onSearch: (query: string) => void;
}

const Header = memo(function Header({ cartCount, isLoggedIn, onCartClick, onAuthClick, onSearch }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchOpen(false);
      setSearchQuery('');
    }
  }, [searchQuery, onSearch]);

  const navLinks = [
    { to: '/', label: 'Главная' },
    { to: '/catalog', label: 'Каталог' },
    { to: '/about', label: 'О компании' },
    { to: '/gallery', label: 'Галерея' },
    { to: '/clients', label: 'Клиентам' },
    { to: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Мир Свечи" className={styles.logoImage} />
        </Link>

        <nav className={styles.nav}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Поиск"
          >
            <FiSearch size={20} />
          </button>

          <button className={styles.iconBtn} onClick={onAuthClick} aria-label="Аккаунт">
            <FiUser size={20} />
            {isLoggedIn && <span className={styles.authDot} />}
          </button>

          <button className={styles.cartBtn} onClick={onCartClick} aria-label="Корзина">
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <motion.span
                className={styles.cartBadge}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          <button
            className={styles.burgerBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className={styles.searchBar}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <FiSearch size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Поиск свечей..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                autoFocus
              />
              <button type="submit" className={styles.searchSubmit}>Найти</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <nav className={styles.mobileNav}>
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

export default Header;
