import { memo } from 'react';
import styles from '../Clients.module.css';

const Delivery = memo(function Delivery() {
  return (
    <div className={styles.contentBlock}>
      <h2 className={styles.contentTitle}>Доставка</h2>
      <p className={styles.contentText}>
        Мы доставляем заказы по всей России. Каждый заказ бережно упаковывается 
        для защиты хрупких товаров при транспортировке.
      </p>
      <h3 className={styles.contentTitle} style={{ fontSize: 'var(--text-xl)' }}>
        Способы доставки
      </h3>
      <ul className={styles.contentList}>
        <li>Транспортные компании (СДЭК, Деловые Линии, ПЭК) — по всей России</li>
        <li>Почта России — в любое отделение</li>
        <li>Курьерская доставка — по Москве и Московской области</li>
        <li>Самовывоз — из нашего офиса в Москве</li>
      </ul>
      <h3 className={styles.contentTitle} style={{ fontSize: 'var(--text-xl)' }}>
        Сроки доставки
      </h3>
      <ul className={styles.contentList}>
        <li>Москва и МО — 1-2 рабочих дня</li>
        <li>Санкт-Петербург — 2-3 рабочих дня</li>
        <li>Другие города — 3-7 рабочих дней</li>
        <li>Отдалённые регионы — 7-14 рабочих дней</li>
      </ul>
      <h3 className={styles.contentTitle} style={{ fontSize: 'var(--text-xl)' }}>
        Стоимость доставки
      </h3>
      <ul className={styles.contentList}>
        <li>Бесплатная доставка при заказе от 5 000 &#8381; (розница)</li>
        <li>Бесплатная доставка при заказе от 50 000 &#8381; (опт)</li>
        <li>Стоимость доставки рассчитывается индивидуально при оформлении заказа</li>
      </ul>
    </div>
  );
});

export default Delivery;
