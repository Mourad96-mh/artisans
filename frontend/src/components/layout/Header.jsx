import { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const countries = [
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'BE', flag: '🇧🇪', name: 'Belgique' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'CH', flag: '🇨🇭', name: 'Suisse' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef(null);

  const switchLang = (lng) => i18n.changeLanguage(lng);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryRef.current && !countryRef.current.contains(e.target)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            {/* Country selector */}
            <div className="country-selector" ref={countryRef}>
              <button className="country-btn" onClick={() => setCountryOpen(!countryOpen)}>
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.name}</span>
                <span className="country-chevron">▾</span>
              </button>
              {countryOpen && (
                <div className="country-dropdown">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      className={`country-option ${selectedCountry.code === c.code ? 'active' : ''}`}
                      onClick={() => { setSelectedCountry(c); setCountryOpen(false); }}
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

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

          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
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
        <div style={{ padding: '4px 20px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {countries.map((c) => (
            <button
              key={c.code}
              className={`country-option ${selectedCountry.code === c.code ? 'active' : ''}`}
              onClick={() => { setSelectedCountry(c); setMenuOpen(false); }}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
