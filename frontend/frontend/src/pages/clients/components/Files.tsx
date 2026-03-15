import { memo } from 'react';
import { FiFileText, FiDownload } from 'react-icons/fi';
import styles from '../Clients.module.css';

const files = [
  { name: 'Прайс-лист розница 2024', size: '245 КБ', type: 'PDF' },
  { name: 'Прайс-лист опт 2024', size: '312 КБ', type: 'PDF' },
  { name: 'Каталог продукции', size: '4.2 МБ', type: 'PDF' },
  { name: 'Договор поставки (шаблон)', size: '89 КБ', type: 'DOCX' },
  { name: 'Сертификаты качества', size: '1.8 МБ', type: 'PDF' },
  { name: 'Реквизиты компании', size: '42 КБ', type: 'PDF' },
];

const Files = memo(function Files() {
  return (
    <div className={styles.contentBlock}>
      <h2 className={styles.contentTitle}>Файлы для скачивания</h2>
      <p className={styles.contentText}>
        Здесь вы можете скачать актуальные прайс-листы, каталоги, шаблоны документов 
        и другие полезные материалы.
      </p>
      <div className={styles.filesList}>
        {files.map((file, i) => (
          <div key={i} className={styles.fileItem}>
            <div className={styles.fileIcon}>
              <FiFileText size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.fileName}>{file.name}</div>
              <div className={styles.fileSize}>{file.type} &middot; {file.size}</div>
            </div>
            <FiDownload size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default Files;
