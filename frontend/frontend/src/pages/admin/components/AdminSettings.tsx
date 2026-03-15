import { memo } from 'react';
import styles from '../Admin.module.css';

const AdminSettings = memo(function AdminSettings() {
  return (
    <div className={styles.adminSection}>
      <h2 className={styles.adminTitle}>Настройки</h2>
      <p className={styles.adminSubtitle}>Общие настройки магазина</p>

      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-2xl)',
        maxWidth: 600,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              Название магазина
            </label>
            <input type="text" defaultValue="Мир Свечи" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              Email для уведомлений
            </label>
            <input type="email" defaultValue="admin@mirsvchi.ru" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              Телефон
            </label>
            <input type="tel" defaultValue="+7 (800) 123-45-67" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              Минимальная сумма для бесплатной доставки (розница)
            </label>
            <input type="number" defaultValue={5000} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
              Минимальная сумма для бесплатной доставки (опт)
            </label>
            <input type="number" defaultValue={50000} />
          </div>

          <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 'var(--space-sm)' }}>
            Сохранить настройки
          </button>
        </div>
      </div>
    </div>
  );
});

export default AdminSettings;
