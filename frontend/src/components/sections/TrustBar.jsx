import { useTranslation } from 'react-i18next';

const badges = [
  { icon: '🛡️', key: 'liability' },
  { icon: '🌿', key: 'rbq' },
  { icon: '✅', key: 'garantie' },
  { icon: '🔒', key: 'paiement' },
  { icon: '🏅', key: 'neq' },
];

export default function TrustBar() {
  const { t } = useTranslation();

  return (
    <section className="trust-bar">
      <div className="container">
        <p className="trust-bar__title">{t('trust.title')}</p>
        <div className="trust-bar__items">
          {badges.map((b) => (
            <div key={b.key} className="trust-bar__item">
              <span className="trust-bar__icon">{b.icon}</span>
              <span className="trust-bar__label">{t(`trust.${b.key}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
