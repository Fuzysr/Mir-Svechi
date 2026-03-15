import { memo, useState, useCallback } from 'react';
import { FiX, FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<any>;
  onRegister: (name: string, email: string, phone: string, password: string) => Promise<any>;
}

const AuthModal = memo(function AuthModal({ isOpen, onClose, onLogin, onRegister }: AuthModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Заполните все обязательные поля');
      return;
    }

    setLoading(true);
    try {
      if (isLoginMode) {
        await onLogin(email, password);
      } else {
        if (!name || !phone) {
          setError('Заполните все обязательные поля');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Пароли не совпадают');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Пароль должен быть не менее 6 символов');
          setLoading(false);
          return;
        }
        await onRegister(name, email, phone, password);
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  }, [isLoginMode, name, email, phone, password, confirmPassword, onLogin, onRegister]);

  const switchMode = useCallback(() => {
    setIsLoginMode(prev => !prev);
    setError('');
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
              <FiX size={20} />
            </button>

            <div className={styles.header}>
              <h3 className={styles.title}>
                {isLoginMode ? 'Вход в аккаунт' : 'Регистрация'}
              </h3>
              <p className={styles.subtitle}>
                {isLoginMode
                  ? 'Войдите, чтобы добавлять товары в корзину и оформлять заказы'
                  : 'Создайте аккаунт для покупок'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {!isLoginMode && (
                <div className={styles.field}>
                  <FiUser className={styles.fieldIcon} size={16} />
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={styles.input}
                  />
                </div>
              )}

              <div className={styles.field}>
                <FiMail className={styles.fieldIcon} size={16} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={styles.input}
                />
              </div>

              {!isLoginMode && (
                <div className={styles.field}>
                  <FiPhone className={styles.fieldIcon} size={16} />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className={styles.input}
                  />
                </div>
              )}

              <div className={styles.field}>
                <FiLock className={styles.fieldIcon} size={16} />
                <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={styles.input}
                />
              </div>

              {!isLoginMode && (
                <div className={styles.field}>
                  <FiLock className={styles.fieldIcon} size={16} />
                  <input
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className={styles.input}
                  />
                </div>
              )}

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                {loading ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться')}
              </button>
            </form>

            <div className={styles.switchMode}>
              <span>{isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}</span>
              <button onClick={switchMode} className={styles.switchBtn}>
                {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default AuthModal;
