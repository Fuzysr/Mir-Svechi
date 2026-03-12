import { memo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Clients.module.css';

const tabs = [
  { to: '/clients/cooperation', label: 'Сотрудничество' },
  { to: '/clients/payment', label: 'Оплата' },
  { to: '/clients/delivery', label: 'Доставка' },
  { to: '/clients/files', label: 'Файлы' },
];

const Clients = memo(function Clients() {
  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.title}>Клиентам</h1>
          <p className={styles.subtitle}>Полезная информация для наших покупателей и партнёров</p>
        </motion.div>

        <div className={styles.tabs}>
          {tabs.map(tab => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ''}`}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
});

export default Clients;
