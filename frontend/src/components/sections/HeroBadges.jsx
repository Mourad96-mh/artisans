import { useTranslation } from 'react-i18next';

const trustBadges = [
  { icon: '✅', key: 'qualified' },
  { icon: '🔒', key: 'secure' },
  { icon: '⚡', key: 'fast' },
  { icon: '🛡️', key: 'verified' },
];

export default function HeroBadges() {
  const { t } = useTranslation();

  return (
    <section className="hero-badges-section">
      <div className="container">
        <div className="hero-badges-list">
          {trustBadges.map((b) => (
            <div key={b.key} className="hero-badges-item">
              <span>{b.icon}</span>
              <span>{t(`hero.badge_${b.key}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
