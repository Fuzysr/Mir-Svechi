import { useState, useEffect } from 'react';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { apiGetCategories, apiCreateProduct, apiUpdateProduct } from '../../../services/api';
import { mapCategory } from '../../../services/mappers';
import type { Product, Category } from '../../../types';
import styles from '../Admin.module.css';

interface ProductFormModalProps {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

interface TierForm {
  minQuantity: string;
  maxQuantity: string;
  price: string;
}

export default function ProductFormModal({ product, onClose, onSaved }: ProductFormModalProps) {
  const isEdit = !!product;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [article, setArticle] = useState(product?.article || '');
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [categoryId, setCategoryId] = useState(product?.categoryId || '');
  const [images, setImages] = useState(product?.images?.join('\n') || '');
  const [colors, setColors] = useState(product?.colors?.join(', ') || '');
  const [sizeHeight, setSizeHeight] = useState(product?.size?.height || '');
  const [sizeDiameter, setSizeDiameter] = useState(product?.size?.diameter || '');
  const [sizeLabel, setSizeLabel] = useState(product?.size?.label || '');
  const [weight, setWeight] = useState(product?.weight || '');
  const [material, setMaterial] = useState(product?.material || '');
  const [burnTime, setBurnTime] = useState(product?.burnTime || '');
  const [fragrance, setFragrance] = useState(product?.fragrance || '');
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [isHit, setIsHit] = useState(product?.isHit ?? false);
  const [isNew, setIsNew] = useState(product?.isNew ?? false);

  const [tiers, setTiers] = useState<TierForm[]>(
    product?.wholesaleTiers?.map(t => ({
      minQuantity: t.minQuantity.toString(),
      maxQuantity: t.maxQuantity?.toString() || '',
      price: t.price.toString(),
    })) || []
  );

  useEffect(() => {
    apiGetCategories()
      .then(data => setCategories(data.map(mapCategory)))
      .catch(() => {});
  }, []);

  const addTier = () => {
    setTiers(prev => [...prev, { minQuantity: '', maxQuantity: '', price: '' }]);
  };

  const removeTier = (index: number) => {
    setTiers(prev => prev.filter((_, i) => i !== index));
  };

  const updateTier = (index: number, field: keyof TierForm, value: string) => {
    setTiers(prev => prev.map((t, i) => i === index ? { ...t, [field]: value } : t));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!article || !name || !price || !categoryId) {
      setError('Заполните обязательные поля: артикул, название, цена, категория');
      return;
    }

    const categoryName = categories.find(c => c.id === categoryId)?.name || '';

    const payload: any = {
      article,
      name,
      description,
      price: parseFloat(price),
      category_id: categoryId,
      category_name: categoryName,
      images: images.split('\n').map(s => s.trim()).filter(Boolean),
      colors: colors.split(',').map(s => s.trim()).filter(Boolean),
      size: { height: sizeHeight, diameter: sizeDiameter, label: sizeLabel },
      weight: weight || null,
      material: material || null,
      burn_time: burnTime || null,
      fragrance: fragrance || null,
      in_stock: inStock,
      is_hit: isHit,
      is_new: isNew,
      wholesale_tiers: tiers
        .filter(t => t.minQuantity && t.price)
        .map(t => ({
          minQuantity: parseInt(t.minQuantity),
          maxQuantity: t.maxQuantity ? parseInt(t.maxQuantity) : null,
          price: parseFloat(t.price),
        })),
    };

    setLoading(true);
    try {
      if (isEdit && product) {
        await apiUpdateProduct(product.id, payload);
      } else {
        await apiCreateProduct(payload);
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
            {isEdit ? 'Редактировать товар' : 'Добавить товар'}
          </h3>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGrid}>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Артикул *</label>
                <input className={styles.formInput} value={article} onChange={e => setArticle(e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Категория *</label>
                <select className={styles.formSelect} value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                  <option value="">Выберите...</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <label className={styles.formLabel}>Название *</label>
                <input className={styles.formInput} value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <label className={styles.formLabel}>Описание</label>
                <textarea className={styles.formTextarea} value={description} onChange={e => setDescription(e.target.value)} rows={3} />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Цена (розница) *</label>
                <input className={styles.formInput} type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Цвета (через запятую)</label>
                <input className={styles.formInput} value={colors} onChange={e => setColors(e.target.value)} placeholder="Белый, Кремовый" />
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>Высота</label>
                <input className={styles.formInput} value={sizeHeight} onChange={e => setSizeHeight(e.target.value)} placeholder="150 мм" />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Диаметр</label>
                <input className={styles.formInput} value={sizeDiameter} onChange={e => setSizeDiameter(e.target.value)} placeholder="60 мм" />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Размер (метка)</label>
                <input className={styles.formInput} value={sizeLabel} onChange={e => setSizeLabel(e.target.value)} placeholder="Стандарт" />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Вес</label>
                <input className={styles.formInput} value={weight} onChange={e => setWeight(e.target.value)} placeholder="200 г" />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Материал</label>
                <input className={styles.formInput} value={material} onChange={e => setMaterial(e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Время горения</label>
                <input className={styles.formInput} value={burnTime} onChange={e => setBurnTime(e.target.value)} placeholder="8 часов" />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Аромат</label>
                <input className={styles.formInput} value={fragrance} onChange={e => setFragrance(e.target.value)} />
              </div>

              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <label className={styles.formLabel}>Изображения (URL, по одному на строку)</label>
                <textarea className={styles.formTextarea} value={images} onChange={e => setImages(e.target.value)} rows={3} placeholder="https://..." />
              </div>

              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <div className={styles.formCheckboxRow}>
                  <label className={styles.formCheckbox}>
                    <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} />
                    В наличии
                  </label>
                  <label className={styles.formCheckbox}>
                    <input type="checkbox" checked={isHit} onChange={e => setIsHit(e.target.checked)} />
                    Хит продаж
                  </label>
                  <label className={styles.formCheckbox}>
                    <input type="checkbox" checked={isNew} onChange={e => setIsNew(e.target.checked)} />
                    Новинка
                  </label>
                </div>
              </div>

              <div className={`${styles.formField} ${styles.formFieldFull}`}>
                <label className={styles.formLabel}>Оптовые цены</label>
                {tiers.map((tier, i) => (
                  <div key={i} className={styles.tierRow}>
                    <div className={styles.formField}>
                      <input className={styles.formInput} type="number" placeholder="От (шт)" value={tier.minQuantity} onChange={e => updateTier(i, 'minQuantity', e.target.value)} />
                    </div>
                    <div className={styles.formField}>
                      <input className={styles.formInput} type="number" placeholder="До (шт)" value={tier.maxQuantity} onChange={e => updateTier(i, 'maxQuantity', e.target.value)} />
                    </div>
                    <div className={styles.formField}>
                      <input className={styles.formInput} type="number" step="0.01" placeholder="Цена ₽" value={tier.price} onChange={e => updateTier(i, 'price', e.target.value)} />
                    </div>
                    <button type="button" className={styles.tierRemoveBtn} onClick={() => removeTier(i)}>
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
                <button type="button" className={styles.addTierBtn} onClick={addTier}>
                  + Добавить оптовую цену
                </button>
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
