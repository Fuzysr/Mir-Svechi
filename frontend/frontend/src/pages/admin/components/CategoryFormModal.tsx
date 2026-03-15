import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { apiCreateCategory, apiUpdateCategory } from '../../../services/api';
import type { Category } from '../../../types';
import styles from '../Admin.module.css';

interface CategoryFormModalProps {
  category: Category | null;
  onClose: () => void;
  onSaved: () => void;
}

function toSlug(str: string): string {
  const map: Record<string, string> = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh',
    'з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o',
    'п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts',
    'ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
  };
  return str
    .toLowerCase()
    .split('')
    .map(c => map[c] || c)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function CategoryFormModal({ category, onClose, onSaved }: CategoryFormModalProps) {
  const isEdit = !!category;

  const [name, setName] = useState(category?.name || '');
  const [slug, setSlug] = useState(category?.slug || '');
  const [image, setImage] = useState(category?.image || '');
  const [description, setDescription] = useState(category?.description || '');
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (value: string) => {
    setName(value);
    if (autoSlug) {
      setSlug(toSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !slug) {
      setError('Заполните обязательные поля: название, slug');
      return;
    }

    const payload = { name, slug, image, description };

    setLoading(true);
    try {
      if (isEdit && category) {
        await apiUpdateCategory(category.id, payload);
      } else {
        await apiCreateCategory(payload);
      }
      onSaved();
    } catch (err: any) {
      setError(err.message || 'Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            {isEdit ? 'Редактировать категорию' : 'Добавить категорию'}
          </h3>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGrid}>
              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <label className={styles.formLabel}>Название *</label>
                <input className={styles.formInput} value={name} onChange={e => handleNameChange(e.target.value)} />
              </div>
              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <label className={styles.formLabel}>Slug *</label>
                <input
                  className={styles.formInput}
                  value={slug}
                  onChange={e => { setSlug(e.target.value); setAutoSlug(false); }}
                  placeholder="stolowe-svechi"
                />
              </div>
              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <label className={styles.formLabel}>URL изображения</label>
                <input className={styles.formInput} value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." />
              </div>
              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <label className={styles.formLabel}>Описание</label>
                <textarea className={styles.formTextarea} value={description} onChange={e => setDescription(e.target.value)} rows={3} />
              </div>
            </div>
          </div>

          {error && <p className={styles.formError}>{error}</p>}

          <div className={styles.modalFooter}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>Отмена</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Сохранение...' : (isEdit ? 'Сохранить' : 'Создать')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
