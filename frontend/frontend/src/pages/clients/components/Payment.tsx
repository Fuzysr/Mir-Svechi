import { memo } from 'react';
import styles from '../Clients.module.css';

const Payment = memo(function Payment() {
  return (
    <div className={styles.contentBlock}>
      <h2 className={styles.contentTitle}>Оплата</h2>
      <p className={styles.contentText}>
        Мы работаем по системе заявок. Вместо онлайн-оплаты вы отправляете заявку 
        на покупку, которую рассматривает наш менеджер. После подтверждения заказа 
        вам на электронную почту будут высланы реквизиты для оплаты.
      </p>
      <h3 className={styles.contentTitle} style={{ fontSize: 'var(--text-xl)' }}>
        Как это работает
      </h3>
      <ul className={styles.contentList}>
        <li>Добавьте товары в корзину и нажмите «Отправить заявку»</li>
        <li>Наш менеджер рассмотрит заявку в течение рабочего дня</li>
        <li>После одобрения вы получите письмо с реквизитами для оплаты</li>
        <li>Оплатите заказ любым удобным способом</li>
        <li>После получения оплаты мы подготовим и отправим заказ</li>
      </ul>
      <h3 className={styles.contentTitle} style={{ fontSize: 'var(--text-xl)' }}>
        Способы оплаты
      </h3>
      <ul className={styles.contentList}>
        <li>Банковский перевод (для юридических и физических лиц)</li>
        <li>Перевод на карту (для розничных заказов)</li>
        <li>Безналичный расчёт (для юридических лиц с НДС и без)</li>
      </ul>
      <p className={styles.contentText}>
        Для оптовых клиентов возможна отсрочка платежа по согласованию с менеджером.
      </p>
    </div>
  );
});

export default Payment;
