import { memo } from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiUsers, FiGrid, FiSettings } from 'react-icons/fi';
import type { User } from '../../types';
import styles from './Admin.module.css';

interface AdminProps {
  user: User | null;
}

const sidebarLinks = [
  { to: '/admin/orders', icon: <FiShoppingBag size={18} />, label: 'Заявки' },
  { to: '/admin/products', icon: <FiPackage size={18} />, label: 'Товары' },
  { to: '/admin/categories', icon: <FiGrid size={18} />, label: 'Категории' },
  { to: '/admin/users', icon: <FiUsers size={18} />, label: 'Пользователи' },
  { to: '/admin/settings', icon: <FiSettings size={18} />, label: 'Настройки' },
];

const Admin = memo(function Admin({ user }: AdminProps) {
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>Админ-панель</h3>
          <span className={styles.adminName}>{user.name}</span>
        </div>
        <nav className={styles.sidebarNav}>
          {sidebarLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
});

export default Admin;
