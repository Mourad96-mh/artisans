import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const faqKeys = ['1', '2', '3', '4', '5'];

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>{t('faq.title')}</h2>
          <p>{t('faq.subtitle')}</p>
        </div>
        <div className="faq-list">
          {faqKeys.map((key, i) => (
            <div key={key} className="faq-item">
              <button
                className={`faq-question ${openIndex === i ? 'open' : ''}`}
                onClick={() => toggle(i)}
              >
                {t(`faq.q${key}`)}
                <span className={`faq-icon ${openIndex === i ? 'open' : ''}`}>+</span>
              </button>
              <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
                <p>{t(`faq.a${key}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
