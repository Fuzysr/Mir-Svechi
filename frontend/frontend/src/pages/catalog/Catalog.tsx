import { useState, useMemo, useCallback, memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import { products, categories, availableColors, availableSizes } from '../../services/mockData';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { Product } from '../../types';
import styles from './Catalog.module.css';

interface CatalogProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const sortOptions = [
  { value: 'popular', label: 'По популярности' },
  { value: 'new', label: 'Новинки' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'name', label: 'По названию' },
];

const Catalog = memo(function Catalog({ onAddToCart }: CatalogProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeCategory = searchParams.get('category') || '';
  const activeSearch = searchParams.get('search') || '';
  const activeSort = searchParams.get('sort') || 'popular';
  const activeColors = searchParams.get('colors')?.split(',').filter(Boolean) || [];
  const activeSizes = searchParams.get('sizes')?.split(',').filter(Boolean) || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateFilter = useCallback((key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    });
  }, [setSearchParams]);

  const toggleArrayFilter = useCallback((key: string, value: string, current: string[]) => {
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilter(key, next.join(','));
  }, [updateFilter]);

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory) {
      result = result.filter(p => p.categoryId === activeCategory);
    }
    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (activeColors.length > 0) {
      result = result.filter(p => p.colors.some(c => activeColors.includes(c)));
    }
    if (activeSizes.length > 0) {
      result = result.filter(p => activeSizes.includes(p.size.label));
    }

    switch (activeSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'new':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        result.sort((a, b) => Number(b.isHit) - Number(a.isHit));
    }

    return result;
  }, [activeCategory, activeSearch, activeColors, activeSizes, activeSort]);

  const hasFilters = activeCategory || activeColors.length > 0 || activeSizes.length > 0 || activeSearch;
  const activeCategoryName = categories.find(c => c.id === activeCategory)?.name;

  const filtersContent = (
    <div className={styles.filtersInner}>
      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Категория</h4>
        <div className={styles.filterOptions}>
          <button
            className={`${styles.filterChip} ${!activeCategory ? styles.filterChipActive : ''}`}
            onClick={() => updateFilter('category', '')}
          >
            Все
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`${styles.filterChip} ${activeCategory === cat.id ? styles.filterChipActive : ''}`}
              onClick={() => updateFilter('category', cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Цвет</h4>
        <div className={styles.filterOptions}>
          {availableColors.map(color => (
            <button
              key={color}
              className={`${styles.filterChip} ${activeColors.includes(color) ? styles.filterChipActive : ''}`}
              onClick={() => toggleArrayFilter('colors', color, activeColors)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Размер</h4>
        <div className={styles.filterOptions}>
          {availableSizes.map(size => (
            <button
              key={size}
              className={`${styles.filterChip} ${activeSizes.includes(size) ? styles.filterChipActive : ''}`}
              onClick={() => toggleArrayFilter('sizes', size, activeSizes)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button className={styles.clearFilters} onClick={clearFilters}>
          <FiX size={14} />
          Сбросить фильтры
        </button>
      )}
    </div>
  );

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              {activeCategoryName || 'Каталог'}
            </h1>
            {activeSearch && (
              <p className={styles.searchInfo}>
                Результаты поиска: &laquo;{activeSearch}&raquo;
              </p>
            )}
            <p className={styles.count}>{filteredProducts.length} товаров</p>
          </div>

          <div className={styles.headerActions}>
            <div className={styles.sortWrapper}>
              <FiChevronDown size={16} className={styles.sortIcon} />
              <select
                className={styles.sortSelect}
                value={activeSort}
                onChange={e => updateFilter('sort', e.target.value)}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <button
              className={styles.mobileFilterBtn}
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FiFilter size={18} />
              Фильтры
            </button>
          </div>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            {filtersContent}
          </aside>

          <main className={styles.main}>
            {filteredProducts.length > 0 ? (
              <div className={styles.grid}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>Ничего не найдено</p>
                <p className={styles.emptyText}>Попробуйте изменить параметры фильтрации</p>
                <button className="btn btn-secondary" onClick={clearFilters}>
                  Сбросить фильтры
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              className={styles.mobileFilters}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.mobileFiltersHeader}>
                <h3>Фильтры</h3>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Закрыть">
                  <FiX size={24} />
                </button>
              </div>
              {filtersContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Catalog;
