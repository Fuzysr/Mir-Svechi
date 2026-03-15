import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaTelegramPlane, FaWhatsapp, FaVk } from 'react-icons/fa';
import logo from '../../assets/logo.svg';
import { apiGetContacts } from '../../services/api';
import type { ContactInfo } from '../../types';
import styles from './Footer.module.css';

const Footer = memo(function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '', email: '', address: '', workingHours: '', socialLinks: {},
  });

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
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              <img src={logo} alt="Мир Свечи" className={styles.logoImage} />
            </Link>
            <p className={styles.brandText}>
              Розничная и оптовая продажа свечей. Натуральные материалы, широкий ассортимент, доставка по всей России.
            </p>
            <div className={styles.socials}>
              {contactInfo.socialLinks.telegram && (
                <a href={contactInfo.socialLinks.telegram} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Telegram">
                  <FaTelegramPlane size={18} />
                </a>
              )}
              {contactInfo.socialLinks.whatsapp && (
                <a href={contactInfo.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
                  <FaWhatsapp size={18} />
                </a>
              )}
              {contactInfo.socialLinks.vk && (
                <a href={contactInfo.socialLinks.vk} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="VK">
                  <FaVk size={18} />
                </a>
              )}
            </div>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Каталог</h4>
            <nav className={styles.linksList}>
              <Link to="/catalog?category=cat-1">Столовые свечи</Link>
              <Link to="/catalog?category=cat-2">Церковные свечи</Link>
              <Link to="/catalog?category=cat-3">Декоративные свечи</Link>
              <Link to="/catalog?category=cat-4">Ароматические свечи</Link>
              <Link to="/catalog?category=cat-5">Свечи для торта</Link>
              <Link to="/catalog?category=cat-6">Хозяйственные свечи</Link>
            </nav>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Информация</h4>
            <nav className={styles.linksList}>
              <Link to="/about">О компании</Link>
              <Link to="/clients/cooperation">Сотрудничество</Link>
              <Link to="/clients/payment">Оплата</Link>
              <Link to="/clients/delivery">Доставка</Link>
              <Link to="/gallery">Галерея</Link>
              <Link to="/contacts">Контакты</Link>
            </nav>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Контакты</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <FiPhone size={16} />
                <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}>{contactInfo.phone}</a>
              </div>
              <div className={styles.contactItem}>
                <FiMail size={16} />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
              <div className={styles.contactItem}>
                <FiMapPin size={16} />
                <span>{contactInfo.address}</span>
              </div>
              <div className={styles.contactItem}>
                <FiClock size={16} />
                <span>{contactInfo.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Мир Свечи. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
