import { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiShoppingBag, FiChevronRight, FiCheck } from 'react-icons/fi';
import type { CartItem as CartItemType, User } from '../../types';
import styles from './Cart.module.css';

interface CartProps {
  items: CartItemType[];
  totalPrice: number;
  user: User | null;
  onUpdateQuantity: (productId: string, quantity: number, isWholesale: boolean) => void;
  onRemoveItem: (productId: string, isWholesale: boolean) => void;
  onClearCart: () => void;
  onAuthClick: () => void;
}

const Cart = memo(function Cart({
  items,
  totalPrice,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAuthClick,
}: CartProps) {
  const [orderSent, setOrderSent] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubmitOrder = useCallback(() => {
    if (!user) {
      onAuthClick();
      return;
    }
    setOrderSent(true);
  }, [user, onAuthClick]);

  if (items.length === 0 && !orderSent) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.empty}>
            <FiShoppingBag size={64} className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>Корзина пуста</h2>
            <p className={styles.emptyText}>Добавьте товары из каталога, чтобы оформить заказ</p>
            <Link to="/catalog" className="btn btn-primary">Перейти в каталог</Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderSent) {
    return (
      <div className={styles.page}>
        <div className="container">
          <motion.div
            className={styles.success}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.successIcon}>
              <FiCheck size={48} />
            </div>
            <h2 className={styles.successTitle}>Заявка отправлена!</h2>
            <p className={styles.successText}>
              Ваша заявка принята и будет рассмотрена администратором.
              После подтверждения вам на почту ({user?.email}) будут отправлены реквизиты для оплаты.
            </p>
            <Link
              to="/catalog"
              className="btn btn-primary"
              onClick={() => {
                onClearCart();
                setOrderSent(false);
              }}
            >
              Продолжить покупки
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Корзина</h1>
          <button className={styles.clearBtn} onClick={onClearCart}>
            <FiTrash2 size={16} />
            Очистить корзину
          </button>
        </div>

        <div className={styles.layout}>
          <div className={styles.itemsList}>
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={`${item.product.id}-${item.isWholesale}`}
                  className={styles.item}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/product/${item.product.id}`} className={styles.itemImage}>
                    <img src={item.product.images[0]} alt={item.product.name} />
                  </Link>

                  <div className={styles.itemInfo}>
                    <Link to={`/product/${item.product.id}`} className={styles.itemName}>
                      {item.product.name}
                    </Link>
                    <span className={styles.itemCategory}>
                      {item.product.category}
                      {item.isWholesale && <span className={styles.wholesaleBadge}>Опт</span>}
                    </span>
                  </div>

                  <div className={styles.itemQuantity}>
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.isWholesale)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.isWholesale)}>+</button>
                  </div>

                  <div className={styles.itemPrice}>
                    <span className={styles.itemTotal}>
                      {((item.isWholesale && item.product.wholesalePrice ? item.product.wholesalePrice : item.product.price) * item.quantity)} &#8381;
                    </span>
                    <span className={styles.itemUnit}>
                      {item.isWholesale && item.product.wholesalePrice ? item.product.wholesalePrice : item.product.price} &#8381;/шт
                    </span>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => onRemoveItem(item.product.id, item.isWholesale)}
                    aria-label="Удалить"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Итого</h3>

              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Товаров</span>
                  <span>{items.reduce((s, i) => s + i.quantity, 0)} шт.</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Сумма</span>
                  <span>{totalPrice} &#8381;</span>
                </div>
              </div>

              <div className={styles.commentSection}>
                <label className={styles.commentLabel}>Комментарий к заказу</label>
                <textarea
                  className={styles.commentInput}
                  placeholder="Пожелания к заказу..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                />
              </div>

              <button className={`btn btn-primary ${styles.orderBtn}`} onClick={handleSubmitOrder}>
                <FiChevronRight size={18} />
                {user ? 'Отправить заявку' : 'Войти и отправить заявку'}
              </button>

              <p className={styles.orderNote}>
                После подтверждения заявки администратором вам будут отправлены реквизиты для оплаты
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Cart;
