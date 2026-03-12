import { memo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../../services/mockData';
import ProductCard from '../../../components/ProductCard/ProductCard';
import type { Product } from '../../../types';
import styles from './HitsSection.module.css';

interface HitsSectionProps {
  onAddToCart: (product: Product) => void;
}

const HitsSection = memo(function HitsSection({ onAddToCart }: HitsSectionProps) {
  const hits = products.filter(p => p.isHit).slice(0, 4);

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
