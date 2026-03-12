import { memo, useState } from 'react';
import type { User } from '../../../types';
import styles from '../Admin.module.css';

const mockUsers: User[] = [
  { id: 'user-1', email: 'ivan@example.com', name: 'Иван Петров', phone: '+7 (900) 123-45-67', role: 'user', createdAt: '2024-01-15' },
  { id: 'user-2', email: 'maria@example.com', name: 'Мария Сидорова', phone: '+7 (900) 765-43-21', role: 'user', createdAt: '2024-02-20' },
  { id: 'user-3', email: 'opt@svetiteplo.ru', name: 'ООО "Свет и Тепло"', phone: '+7 (495) 111-22-33', role: 'user', createdAt: '2024-03-10' },
  { id: 'user-admin', email: 'admin@mirsvchi.ru', name: 'Администратор', phone: '+7 (800) 123-45-67', role: 'admin', createdAt: '2023-01-01' },
];

const AdminUsers = memo(function AdminUsers() {
  const [users] = useState(mockUsers);

  return (
    <div className={styles.adminSection}>
      <h2 className={styles.adminTitle}>Пользователи</h2>
      <p className={styles.adminSubtitle}>Управление пользователями системы</p>

      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Роль</th>
            <th>Регистрация</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ fontWeight: 500 }}>{user.name}</td>
              <td style={{ color: 'var(--color-text-muted)' }}>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <span className={`${styles.statusBadge} ${user.role === 'admin' ? styles.statusApproved : styles.statusPending}`}>
                  {user.role === 'admin' ? 'Админ' : 'Клиент'}
                </span>
              </td>
              <td style={{ color: 'var(--color-text-muted)' }}>
                {new Date(user.createdAt).toLocaleDateString('ru-RU')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default AdminUsers;
