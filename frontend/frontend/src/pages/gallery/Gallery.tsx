import { useState, useMemo, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { apiGetGallery } from '../../services/api';
import type { GalleryImage } from '../../types';
import styles from './Gallery.module.css';

const Gallery = memo(function Gallery() {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    apiGetGallery().then(data => setGalleryImages(data)).catch(() => {});
  }, []);

  const filterCategories = useMemo(() => {
    const cats = new Set(galleryImages.map(img => img.category));
    return ['Все', ...Array.from(cats)];
  }, [galleryImages]);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'Все') return galleryImages;
    return galleryImages.filter(img => img.category === activeFilter);
  }, [activeFilter, galleryImages]);

  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.title}>Галерея</h1>
          <p className={styles.subtitle}>Наши свечи в интерьере и на мероприятиях</p>
        </motion.div>

        <div className={styles.filters}>
          {filterCategories.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div className={styles.grid} layout>
          <AnimatePresence>
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.id}
                className={styles.card}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightboxImage(img.src)}
              >
                <img src={img.src} alt={img.alt} className={styles.image} loading="lazy" />
                <div className={styles.cardOverlay}>
                  <span className={styles.cardCategory}>{img.category}</span>
                  <p className={styles.cardAlt}>{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <button className={styles.lightboxClose} aria-label="Закрыть">
              <FiX size={28} />
            </button>
            <motion.img
              src={lightboxImage}
              alt=""
              className={styles.lightboxImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Gallery;
