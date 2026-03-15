import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiPackage, FiHeart } from 'react-icons/fi';
import styles from './About.module.css';

const stats = [
  { icon: <FiAward size={28} />, value: '10+', label: 'Лет на рынке' },
  { icon: <FiUsers size={28} />, value: '5000+', label: 'Довольных клиентов' },
  { icon: <FiPackage size={28} />, value: '200+', label: 'Наименований' },
  { icon: <FiHeart size={28} />, value: '50+', label: 'Оптовых партнёров' },
];

const About = memo(function About() {
  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.title}>О компании</h1>
          <p className={styles.subtitle}>Мир Свечи — тепло и уют в каждый дом</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.imageSection}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&h=500&fit=crop"
              alt="О компании Мир Свечи"
              className={styles.image}
            />
          </motion.div>

          <motion.div
            className={styles.textSection}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className={styles.sectionTitle}>Наша история</h2>
            <p className={styles.text}>
              Компания «Мир Свечи» была основана более 10 лет назад с простой идеей — 
              сделать качественные свечи доступными для каждого. За это время мы выросли 
              из небольшой мастерской в одного из ведущих производителей и поставщиков 
              свечей в России.
            </p>
            <p className={styles.text}>
              Мы предлагаем широкий ассортимент свечей: от классических столовых и 
              хозяйственных до изысканных декоративных и ароматических. Каждая наша 
              свеча создаётся с любовью и вниманием к деталям.
            </p>
            <p className={styles.text}>
              Работаем как с розничными покупателями, так и с оптовыми клиентами — 
              магазинами, храмами, ресторанами, event-агентствами и другими организациями. 
              Предлагаем гибкие условия сотрудничества и индивидуальный подход к каждому партнёру.
            </p>
          </motion.div>
        </div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className={styles.statIcon}>{stat.icon}</div>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.values}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Наши ценности</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h4 className={styles.valueTitle}>Качество</h4>
              <p className={styles.valueText}>
                Используем только проверенные материалы и строго контролируем 
                каждый этап производства.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h4 className={styles.valueTitle}>Натуральность</h4>
              <p className={styles.valueText}>
                Пчелиный воск, соевый воск, натуральные эфирные масла — 
                мы выбираем лучшее.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h4 className={styles.valueTitle}>Забота о клиентах</h4>
              <p className={styles.valueText}>
                Индивидуальный подход к каждому заказу, быстрая обратная связь 
                и бережная доставка.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

export default About;
