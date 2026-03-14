import { useState, useMemo, memo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiChevronRight, FiMinus, FiPlus, FiPackage, FiClock, FiDroplet, FiWind } from 'react-icons/fi';
import { products } from '../../services/mockData';
import ProductCard from '../../components/ProductCard/ProductCard';
import type { Product } from '../../types';
import styles from './ProductDetail.module.css';

interface ProductDetailProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

function formatTierRange(tier: Product['wholesaleTiers'][number]): string {
  if (tier.maxQuantity) {
    return `${tier.minQuantity}–${tier.maxQuantity} шт.`;
  }
  return `от ${tier.minQuantity} шт.`;
}

const ProductDetail = memo(function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => products.find(p => p.id === id), [id]);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h2>Товар не найден</h2>
          <Link to="/catalog" className="btn btn-primary">Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumbs}>
          <Link to="/">Главная</Link>
          <FiChevronRight size={14} />
          <Link to="/catalog">Каталог</Link>
          <FiChevronRight size={14} />
          <Link to={`/catalog?category=${product.categoryId}`}>{product.category}</Link>
          <FiChevronRight size={14} />
          <span>{product.name}</span>
        </nav>

        <div className={styles.productGrid}>
          <motion.div
            className={styles.gallery}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.mainImage}>
              <img src={product.images[selectedImage]} alt={product.name} />
              <div className={styles.badges}>
                {product.isHit && <span className={styles.badgeHit}>Хит</span>}
                {product.isNew && <span className={styles.badgeNew}>Новинка</span>}
              </div>
            </div>
            {product.images.length > 1 && (
              <div className={styles.thumbs}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === selectedImage ? styles.thumbActive : ''}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.article}>Артикул: {product.article}</span>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.specs}>
              {product.size && (
                <div className={styles.specItem}>
                  <FiPackage size={16} />
                  <span>Размер: {product.size.height} x {product.size.diameter}</span>
                </div>
              )}
              {product.weight && (
                <div className={styles.specItem}>
                  <FiDroplet size={16} />
                  <span>Вес: {product.weight}</span>
                </div>
              )}
              {product.burnTime && (
                <div className={styles.specItem}>
                  <FiClock size={16} />
                  <span>Время горения: {product.burnTime}</span>
                </div>
              )}
              {product.material && (
                <div className={styles.specItem}>
                  <FiPackage size={16} />
                  <span>Материал: {product.material}</span>
                </div>
              )}
              {product.fragrance && (
                <div className={styles.specItem}>
                  <FiWind size={16} />
                  <span>Аромат: {product.fragrance}</span>
                </div>
              )}
            </div>

            <div className={styles.colors}>
              <span className={styles.colorsLabel}>Цвета:</span>
              <div className={styles.colorTags}>
                {product.colors.map(c => (
                  <span key={c} className={styles.colorTag}>{c}</span>
                ))}
              </div>
            </div>

            <div className={styles.priceSection}>
              <h3 className={styles.priceTitle}>Оптовые цены</h3>
              <div className={styles.tiersTable}>
                {product.wholesaleTiers.map((tier, i) => (
                  <div key={i} className={styles.tierRow}>
                    <span className={styles.tierRange}>{formatTierRange(tier)}</span>
                    <span className={styles.tierPrice}>{tier.price} &#8381;/шт.</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.addToCart}>
              <div className={styles.quantityControl}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <FiMinus size={16} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>
                  <FiPlus size={16} />
                </button>
              </div>
              <button
                className={`btn btn-primary ${styles.addBtn}`}
                onClick={() => onAddToCart(product, quantity)}
              >
                <FiShoppingCart size={18} />
                В корзину
              </button>
            </div>

            {!product.inStock && (
              <p className={styles.outOfStock}>Нет в наличии</p>
            )}
          </motion.div>
        </div>

        {similarProducts.length > 0 && (
          <section className={styles.similar}>
            <h2 className="section-title">Похожие товары</h2>
            <div className={styles.similarGrid}>
              {similarProducts.map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

export default ProductDetail;
