import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = memo(function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
        <span className={styles.category}>{product.category}</span>
        <Link to={`/product/${product.id}`} className={styles.name}>
          {product.name}
        </Link>

        <div className={styles.rating}>
          <FiStar size={13} className={styles.starIcon} />
          <span className={styles.ratingValue}>{product.rating}</span>
          <span className={styles.reviewsCount}>({product.reviewsCount})</span>
        </div>

        <div className={styles.priceRow}>
          <div className={styles.prices}>
            <span className={styles.price}>{product.price} &#8381;</span>
            {product.wholesalePrice && (
              <span className={styles.wholesalePrice}>опт от {product.wholesalePrice} &#8381;</span>
            )}
          </div>
          <button
            className={styles.addToCartBtn}
            onClick={() => onAddToCart(product)}
            aria-label="Добавить в корзину"
          >
            <FiShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export default ProductCard;
