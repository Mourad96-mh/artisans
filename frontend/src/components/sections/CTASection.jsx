import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="cta-section">
      <div className="container">
        <h2>{t('hero.title')}</h2>
        <p>{t('hero.subtitle')}</p>
        <div className="cta-buttons">
          <Link to="/devenir-pro" className="btn btn-primary">
            🔨 {t('nav.becomePro')}
          </Link>
          <Link to="/devenir-pro" className="btn btn-white">
            {t('nav.packs')}
          </Link>
        </div>
      </div>
    </section>
  );
}
