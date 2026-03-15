import { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiMinus, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

function formatTierRange(tier: Product['wholesaleTiers'][number]): string {
  if (tier.maxQuantity) {
    return `${tier.minQuantity}–${tier.maxQuantity} шт.`;
  }
  return `от ${tier.minQuantity} шт.`;
}

const ProductCard = memo(function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const decrement = useCallback(() => setQuantity(q => Math.max(1, q - 1)), []);
  const increment = useCallback(() => setQuantity(q => q + 1), []);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className={styles.imageWrapper}>
        <div className={`${styles.imagePlaceholder} ${imageLoaded ? styles.hidden : ''}`} />
        <img
          src={product.images[0]}
          alt={product.name}
          className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className={styles.badges}>
          {product.isHit && <span className={styles.badgeHit}>Хит</span>}
          {product.isNew && <span className={styles.badgeNew}>Новинка</span>}
        </div>
        <button
          className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
          onClick={e => { e.preventDefault(); setIsLiked(!isLiked); }}
          aria-label="В избранное"
        >
          <FiHeart size={16} />
        </button>
      </Link>

      <div className={styles.content}>
        <span className={styles.article}>Арт: {product.article}</span>
        <Link to={`/product/${product.id}`} className={styles.name}>
          {product.name}
        </Link>

        {product.wholesaleTiers.length > 0 && (
          <div className={styles.tiers}>
            {product.wholesaleTiers.map((tier, i) => (
              <div key={i} className={styles.tierRow}>
                <span className={styles.tierRange}>{formatTierRange(tier)}</span>
                <span className={styles.tierPrice}>{tier.price} &#8381;/шт.</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.cartRow}>
          <div className={styles.quantityControl}>
            <button onClick={decrement} aria-label="Уменьшить">
              <FiMinus size={14} />
            </button>
            <span>{quantity}</span>
            <button onClick={increment} aria-label="Увеличить">
              <FiPlus size={14} />
            </button>
          </div>
          <button
            className={styles.addToCartBtn}
            onClick={() => onAddToCart(product, quantity)}
          >
            <FiShoppingCart size={16} />
            В корзину
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export default ProductCard;
