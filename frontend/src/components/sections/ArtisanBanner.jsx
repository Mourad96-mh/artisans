import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const benefits = [
  { icon: '✅', key: 'benefit1' },
  { icon: '👁️', key: 'benefit2' },
  { icon: '🔒', key: 'benefit3' },
  { icon: '🎧', key: 'benefit4' },
];

const stats = [
  { value: '+12K', key: 'artisans' },
  { value: '+50K', key: 'projects' },
  { value: '4.8/5', key: 'satisfaction' },
  { value: '24h', key: 'response' },
];

export default function ArtisanBanner() {
  const { t } = useTranslation();

  return (
    <section className="artisan-banner">
      <div className="container">
        <div className="artisan-banner-inner">

          <div className="artisan-banner-content">
            <div className="artisan-banner-tag">{t('artisanBanner.tag')}</div>
            <h2>{t('artisanBanner.title')}</h2>
            <p>{t('artisanBanner.subtitle')}</p>

            <div className="artisan-banner-benefits">
              {benefits.map((b) => (
                <div key={b.key} className="artisan-banner-benefit">
                  <span>{b.icon}</span>
                  <span>{t(`becomePro.${b.key}Title`)}</span>
                </div>
              ))}
            </div>

            <div className="artisan-banner-actions">
              <Link to="/devenir-pro" className="btn btn-primary btn-lg">
                {t('artisanBanner.cta1')}
              </Link>
              <Link to="/devenir-pro" className="btn artisan-banner-btn-ghost btn-lg">
                {t('artisanBanner.cta2')}
              </Link>
            </div>
          </div>

          <div className="artisan-banner-stats">
            {stats.map((s) => (
              <div key={s.key} className="artisan-banner-stat">
                <span className="artisan-banner-stat__value">{s.value}</span>
                <span className="artisan-banner-stat__label">{t(`stats.${s.key}`)}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
