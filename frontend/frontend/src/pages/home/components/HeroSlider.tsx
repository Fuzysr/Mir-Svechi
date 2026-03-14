import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { heroSlides } from '../../../services/mockData';
import styles from './HeroSlider.module.css';

const HeroSlider = memo(function HeroSlider() {
  const slide = heroSlides[0];

  const scrollToCategories = () => {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.slide}>
        <div className={styles.imageBg}>
          <img src={slide.image} alt="" className={styles.bgImage} />
          <div className={styles.overlay} />
          <div className={styles.bottomFade} />
        </div>

        <div className={styles.content}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {slide.title}
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {slide.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link to={slide.buttonLink} className={`${styles.ctaBtn}`}>
              {slide.buttonText}
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.button
        className={styles.scrollDown}
        onClick={scrollToCategories}
        aria-label="Прокрутить к категориям"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <FiChevronDown size={28} />
      </motion.button>
    </section>
  );
});

export default HeroSlider;
