import { memo } from 'react';
import styles from '../Clients.module.css';

const Cooperation = memo(function Cooperation() {
  return (
    <div className={styles.contentBlock}>
      <h2 className={styles.contentTitle}>Сотрудничество</h2>
      <p className={styles.contentText}>
        Компания «Мир Свечи» приглашает к сотрудничеству магазины, храмы, рестораны, 
        event-агентства и другие организации. Мы предлагаем выгодные условия для 
        оптовых покупателей.
      </p>
      <h3 className={styles.contentTitle} style={{ fontSize: 'var(--text-xl)' }}>
        Преимущества сотрудничества
      </h3>
      <ul className={styles.contentList}>
        <li>Специальные оптовые цены со скидкой до 40%</li>
        <li>Гибкая система скидок для постоянных партнёров</li>
        <li>Индивидуальный подход к каждому клиенту</li>
        <li>Персональный менеджер для оптовых заказов</li>
        <li>Возможность изготовления свечей по индивидуальному заказу</li>
        <li>Бесплатная доставка при заказе от 50 000 &#8381;</li>
        <li>Отсрочка платежа для проверенных партнёров</li>
      </ul>
      <h3 className={styles.contentTitle} style={{ fontSize: 'var(--text-xl)' }}>
        Как начать сотрудничество
      </h3>
      <p className={styles.contentText}>
        Для начала сотрудничества свяжитесь с нами любым удобным способом: 
        по телефону, email или через форму на сайте. Наш менеджер подготовит 
        для вас индивидуальное коммерческое предложение.
      </p>
    </div>
  );
});

export default Cooperation;
