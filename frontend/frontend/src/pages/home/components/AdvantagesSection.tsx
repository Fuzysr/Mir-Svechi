import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiFeather, FiTruck, FiUsers, FiAward } from 'react-icons/fi';
import { advantages } from '../../../services/mockData';
import styles from './AdvantagesSection.module.css';

const iconMap: Record<string, React.ReactNode> = {
  leaf: <FiFeather size={28} />,
  truck: <FiTruck size={28} />,
  wholesale: <FiUsers size={28} />,
  quality: <FiAward size={28} />,
};

const AdvantagesSection = memo(function AdvantagesSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h2 className="section-title">Почему выбирают нас</h2>
        <div className={styles.grid}>
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className={styles.iconWrapper}>
                {iconMap[adv.icon] || <FiAward size={28} />}
              </div>
              <h4 className={styles.cardTitle}>{adv.title}</h4>
              <p className={styles.cardDesc}>{adv.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default AdvantagesSection;
