import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaTelegramPlane, FaWhatsapp, FaVk } from 'react-icons/fa';
import { apiGetContacts } from '../../services/api';
import type { ContactInfo } from '../../types';
import styles from './Contacts.module.css';

const defaultContact: ContactInfo = {
  phone: '', email: '', address: '', workingHours: '',
  socialLinks: {},
};

const Contacts = memo(function Contacts() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContact);

  useEffect(() => {
    apiGetContacts().then(data => {
      if (data) {
        setContactInfo({
          phone: data.phone,
          email: data.email,
          address: data.address,
          workingHours: data.working_hours,
          socialLinks: data.social_links || {},
        });
      }
    }).catch(() => {});
  }, []);

  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.title}>Контакты</h1>
          <p className={styles.subtitle}>Свяжитесь с нами любым удобным способом</p>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.infoSection}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.contactCards}>
              <div className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <FiPhone size={22} />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Телефон</h4>
                  <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className={styles.cardValue}>
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <FiMail size={22} />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Email</h4>
                  <a href={`mailto:${contactInfo.email}`} className={styles.cardValue}>
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <FiMapPin size={22} />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Адрес</h4>
                  <p className={styles.cardValue}>{contactInfo.address}</p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <FiClock size={22} />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Режим работы</h4>
                  <p className={styles.cardValue}>{contactInfo.workingHours}</p>
                </div>
              </div>
            </div>

            <div className={styles.socials}>
              <h4 className={styles.socialsTitle}>Мы в социальных сетях</h4>
              <div className={styles.socialLinks}>
                {contactInfo.socialLinks.telegram && (
                  <a href={contactInfo.socialLinks.telegram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaTelegramPlane size={20} />
                    <span>Telegram</span>
                  </a>
                )}
                {contactInfo.socialLinks.whatsapp && (
                  <a href={contactInfo.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaWhatsapp size={20} />
                    <span>WhatsApp</span>
                  </a>
                )}
                {contactInfo.socialLinks.vk && (
                  <a href={contactInfo.socialLinks.vk} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaVk size={20} />
                    <span>ВКонтакте</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Напишите нам</h3>
              <p className={styles.formSubtitle}>Мы ответим в ближайшее время</p>
              <form className={styles.form} onSubmit={e => e.preventDefault()}>
                <div className={styles.field}>
                  <label>Ваше имя</label>
                  <input type="text" placeholder="Иван Иванов" />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input type="email" placeholder="email@example.com" />
                </div>
                <div className={styles.field}>
                  <label>Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" />
                </div>
                <div className={styles.field}>
                  <label>Сообщение</label>
                  <textarea placeholder="Ваше сообщение..." rows={4} />
                </div>
                <button type="submit" className="btn btn-primary">
                  Отправить сообщение
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

export default Contacts;
