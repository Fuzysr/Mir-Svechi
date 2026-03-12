import { memo, useState } from 'react';
import type { Order, OrderStatus } from '../../../types';
import styles from '../Admin.module.css';

const mockOrders: Order[] = [
  {
    id: 'ord-1',
    userId: 'user-1',
    userName: 'Иван Петров',
    userEmail: 'ivan@example.com',
    userPhone: '+7 (900) 123-45-67',
    items: [],
    totalPrice: 3500,
    status: 'pending',
    comment: 'Доставка до двери',
    createdAt: '2024-06-01T10:30:00',
    updatedAt: '2024-06-01T10:30:00',
  },
  {
    id: 'ord-2',
    userId: 'user-2',
    userName: 'Мария Сидорова',
    userEmail: 'maria@example.com',
    userPhone: '+7 (900) 765-43-21',
    items: [],
    totalPrice: 12800,
    status: 'approved',
    createdAt: '2024-05-28T14:15:00',
    updatedAt: '2024-05-29T09:00:00',
  },
  {
    id: 'ord-3',
    userId: 'user-3',
    userName: 'ООО "Свет и Тепло"',
    userEmail: 'opt@svetiteplo.ru',
    userPhone: '+7 (495) 111-22-33',
    items: [],
    totalPrice: 85000,
    status: 'completed',
    comment: 'Оптовый заказ, нужен счёт с НДС',
    createdAt: '2024-05-20T08:00:00',
    updatedAt: '2024-05-25T16:00:00',
  },
  {
    id: 'ord-4',
    userId: 'user-4',
    userName: 'Елена Козлова',
    userEmail: 'elena@example.com',
    userPhone: '+7 (900) 555-66-77',
    items: [],
    totalPrice: 780,
    status: 'rejected',
    adminMessage: 'Товар временно отсутствует на складе',
    createdAt: '2024-05-15T11:45:00',
    updatedAt: '2024-05-15T15:30:00',
  },
];

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Ожидает',
  approved: 'Одобрена',
  rejected: 'Отклонена',
  completed: 'Завершена',
};

const statusStyles: Record<OrderStatus, string> = {
  pending: styles.statusPending,
  approved: styles.statusApproved,
  rejected: styles.statusRejected,
  completed: styles.statusCompleted,
};

const AdminOrders = memo(function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders);

  const updateStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o)
    );
  };

  return (
    <div className={styles.adminSection}>
      <h2 className={styles.adminTitle}>Заявки на заказы</h2>
      <p className={styles.adminSubtitle}>Управление заявками от клиентов</p>

      {orders.length === 0 ? (
        <div className={styles.emptyState}>Нет заявок</div>
      ) : (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>ID</th>
              <th>Клиент</th>
              <th>Сумма</th>
              <th>Статус</th>
              <th>Дата</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={{ fontWeight: 600 }}>{order.id}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{order.userName}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{order.userEmail}</div>
                </td>
                <td style={{ fontWeight: 600 }}>{order.totalPrice.toLocaleString()} &#8381;</td>
                <td>
                  <span className={`${styles.statusBadge} ${statusStyles[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </td>
                <td style={{ color: 'var(--color-text-muted)' }}>
                  {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                </td>
                <td>
                  {order.status === 'pending' && (
                    <div className={styles.actionBtns}>
                      <button
                        className={`${styles.actionBtn} ${styles.approveBtn}`}
                        onClick={() => updateStatus(order.id, 'approved')}
                      >
                        Одобрить
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.rejectBtn}`}
                        onClick={() => updateStatus(order.id, 'rejected')}
                      >
                        Отклонить
                      </button>
                    </div>
                  )}
                  {order.status === 'approved' && (
                    <button
                      className={`${styles.actionBtn} ${styles.approveBtn}`}
                      onClick={() => updateStatus(order.id, 'completed')}
                    >
                      Завершить
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
});

export default AdminOrders;
