import { memo, useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { apiGetProducts, apiDeleteProduct } from '../../../services/api';
import { mapProduct } from '../../../services/mappers';
import type { Product } from '../../../types';
import styles from '../Admin.module.css';

const AdminProducts = memo(function AdminProducts() {
  const [productsList, setProductsList] = useState<Product[]>([]);

  const loadProducts = () => {
    apiGetProducts({ per_page: '100' })
      .then(res => setProductsList(res.items.map(mapProduct)))
      .catch(() => {});
  };

  useEffect(() => { loadProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить товар?')) return;
    try {
      await apiDeleteProduct(id);
      loadProducts();
    } catch {}
  };

  return (
    <div className={styles.adminSection}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2xl)' }}>
        <div>
          <h2 className={styles.adminTitle}>Товары</h2>
          <p className={styles.adminSubtitle}>Управление каталогом товаров</p>
        </div>
        <button className="btn btn-primary" style={{ gap: '8px' }}>
          <FiPlus size={16} />
          Добавить товар
        </button>
      </div>

      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Фото</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Опт</th>
            <th>Наличие</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {productsList.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.images[0]} alt="" className={styles.productImage} />
              </td>
              <td style={{ fontWeight: 500, maxWidth: 200 }}>{product.name}</td>
              <td style={{ color: 'var(--color-text-muted)' }}>{product.category}</td>
              <td style={{ fontWeight: 600 }}>{product.price} &#8381;</td>
              <td style={{ color: 'var(--color-accent)' }}>
                {product.wholesaleTiers.length > 0
                  ? `от ${product.wholesaleTiers[product.wholesaleTiers.length - 1].price} ₽`
                  : '—'}
              </td>
              <td>
                <span className={`${styles.statusBadge} ${product.inStock ? styles.statusApproved : styles.statusRejected}`}>
                  {product.inStock ? 'В наличии' : 'Нет'}
                </span>
              </td>
              <td>
                <div className={styles.actionBtns}>
                  <button className={styles.actionBtn} style={{ color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>
                    <FiEdit2 size={14} />
                  </button>
                  <button className={styles.actionBtn} style={{ color: 'var(--color-error)', border: '1px solid var(--color-border)' }} onClick={() => handleDelete(product.id)}>
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default AdminProducts;
