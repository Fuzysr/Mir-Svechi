import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiGetProducts } from '../../../services/api';
import { mapProduct } from '../../../services/mappers';
import ProductCard from '../../../components/ProductCard/ProductCard';
import type { Product } from '../../../types';
import styles from './HitsSection.module.css';

interface HitsSectionProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const HitsSection = memo(function HitsSection({ onAddToCart }: HitsSectionProps) {
  const [hits, setHits] = useState<Product[]>([]);

  useEffect(() => {
    apiGetProducts({ is_hit: 'true', per_page: '4' })
      .then(res => setHits(res.items.map(mapProduct)))
      .catch(() => {});
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Хиты продаж</h2>
        <div className={styles.grid}>
          {hits.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
        <div className={styles.viewAll}>
          <Link to="/catalog" className="btn btn-secondary">
            Смотреть весь каталог
          </Link>
        </div>
      </div>
    </section>
  );
});

export default HitsSection;
