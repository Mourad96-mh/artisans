import { useTranslation } from 'react-i18next';

export default function StatsBar() {
  const { t } = useTranslation();

  const stats = [
    { number: '12 000+', label: t('stats.artisans') },
    { number: '50 000+', label: t('stats.projects') },
    { number: '4.8/5', label: t('stats.satisfaction') },
    { number: '24h', label: t('stats.response') },
  ];

  return (
    <div className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <span className="number">{stat.number}</span>
              <span className="label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
