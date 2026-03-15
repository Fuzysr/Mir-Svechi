import { memo, useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { apiGetCategories, apiDeleteCategory } from '../../../services/api';
import { mapCategory } from '../../../services/mappers';
import type { Category } from '../../../types';
import CategoryFormModal from './CategoryFormModal';
import styles from '../Admin.module.css';

const AdminCategories = memo(function AdminCategories() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const loadCategories = () => {
    apiGetCategories()
      .then(data => setCategoriesList(data.map(mapCategory)))
      .catch(() => {});
  };

  useEffect(() => { loadCategories(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить категорию?')) return;
    try {
      await apiDeleteCategory(id);
      loadCategories();
    } catch {}
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEdit = (cat: Category) => {
    setEditingCategory(cat);
    setShowModal(true);
  };

  const handleSaved = () => {
    setShowModal(false);
    setEditingCategory(null);
    loadCategories();
  };

  return (
    <div className={styles.adminSection}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2xl)' }}>
        <div>
          <h2 className={styles.adminTitle}>Категории</h2>
          <p className={styles.adminSubtitle}>Управление категориями товаров</p>
        </div>
        <button className="btn btn-primary" style={{ gap: '8px' }} onClick={handleAdd}>
          <FiPlus size={16} />
          Добавить категорию
        </button>
      </div>

      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Изображение</th>
            <th>Название</th>
            <th>Slug</th>
            <th>Товаров</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map(cat => (
            <tr key={cat.id}>
              <td>
                <img src={cat.image} alt="" className={styles.productImage} />
              </td>
              <td style={{ fontWeight: 500 }}>{cat.name}</td>
              <td style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{cat.slug}</td>
              <td style={{ fontWeight: 600 }}>{cat.productCount}</td>
              <td>
                <div className={styles.actionBtns}>
                  <button className={styles.actionBtn} style={{ color: 'var(--color-primary)', border: '1px solid var(--color-border)' }} onClick={() => handleEdit(cat)}>
                    <FiEdit2 size={14} />
                  </button>
                  <button className={styles.actionBtn} style={{ color: 'var(--color-error)', border: '1px solid var(--color-border)' }} onClick={() => handleDelete(cat.id)}>
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => { setShowModal(false); setEditingCategory(null); }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
});

export default AdminCategories;
