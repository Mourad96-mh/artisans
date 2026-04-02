import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLang = (lng) => i18n.changeLanguage(lng);

  const navLinks = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/comment-ca-marche', label: t('nav.howItWorks') },
    { to: '/devenir-pro', label: t('nav.becomePro') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            <div className="logo-icon">🔨</div>
            Réseau<span>Artisans</span>
          </Link>

          <nav className="nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <div className="lang-switcher">
              <button
                className={`lang-btn ${i18n.language === 'fr' ? 'active' : ''}`}
                onClick={() => switchLang('fr')}
              >
                FR
              </button>
              <button
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => switchLang('en')}
              >
                EN
              </button>
            </div>
            <Link to="/artisan/login" className="btn btn-outline">
              {t('nav.artisanLogin')}
            </Link>
            <Link to="/devenir-pro" className="btn btn-primary">
              {t('nav.becomePro')}
            </Link>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        <Link
          to="/artisan/login"
          style={{ padding: '12px 20px', color: 'var(--color-primary)', fontWeight: 600 }}
          onClick={() => setMenuOpen(false)}
        >
          {t('nav.artisanLogin')}
        </Link>
        <div style={{ display: 'flex', gap: 8, padding: '12px 20px' }}>
          <button className={`lang-btn ${i18n.language === 'fr' ? 'active' : ''}`} onClick={() => switchLang('fr')}>FR</button>
          <button className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`} onClick={() => switchLang('en')}>EN</button>
        </div>
      </nav>
    </header>
  );
}
