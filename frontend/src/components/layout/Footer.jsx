import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">🔨</div>
              Réseau<span>Artisans</span>
            </div>
            <p>{t('footer.tagline')}</p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">f</a>
              <a href="#" className="social-link" aria-label="Instagram">in</a>
              <a href="#" className="social-link" aria-label="WhatsApp">w</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footer.links')}</h4>
            <ul>
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/comment-ca-marche">{t('nav.howItWorks')}</Link></li>
              <li><Link to="/devenir-pro">{t('nav.becomePro')}</Link></li>
              <li><Link to="/devenir-pro">{t('nav.packs')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('trades.title')}</h4>
            <ul>
              <li><a href="#">{t('trades.plumbing')}</a></li>
              <li><a href="#">{t('trades.electrical')}</a></li>
              <li><a href="#">{t('trades.painting')}</a></li>
              <li><a href="#">{t('trades.masonry')}</a></li>
              <li><a href="#">{t('trades.hvac')}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:0162260900">{t('contact.phoneNumber')}</a></li>
              <li><a href="mailto:contact@reseauxartisans.fr">{t('contact.emailAddress')}</a></li>
              <li><a href="#">{t('contact.address')}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} RéseauArtisans. {t('footer.rights')}.</span>
          <div className="footer-bottom-links">
            <a href="#">{t('footer.legal')}</a>
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.cgv')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
