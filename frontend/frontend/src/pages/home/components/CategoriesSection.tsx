import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiGetCategories } from '../../../services/api';
import { mapCategory } from '../../../services/mappers';
import type { Category } from '../../../types';
import styles from './CategoriesSection.module.css';

const CategoriesSection = memo(function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    apiGetCategories()
      .then(data => setCategories(data.map(mapCategory)))
      .catch(() => {});
  }, []);

  return (
    <section id="categories" className={`section ${styles.section}`}>
      <div className="container">
        <h2 className="section-title">Категории</h2>
        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link to={`/catalog?category=${cat.id}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={cat.image} alt={cat.name} className={styles.image} loading="lazy" />
                  <div className={styles.cardOverlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{cat.name}</h3>
                  <span className={styles.cardCount}>{cat.productCount} товаров</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default CategoriesSection;
