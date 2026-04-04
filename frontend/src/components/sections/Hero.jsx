import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const countries = [
  { flag: '🇫🇷', name: 'France' },
  { flag: '🇧🇪', name: 'Belgique' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇨🇭', name: 'Suisse' },
];

const heroPhotos = [
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
];

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">

          {/* Left — content */}
          <div className="hero-content">

            <div className="hero-countries">
              {countries.map((c) => (
                <div key={c.name} className="hero-country">
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </div>
              ))}
            </div>

            <h1>{t('hero.title')}</h1>
            <p>{t('hero.subtitle')}</p>

            {/* CTAs */}
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                {t('hero.ctaClient')}
              </Link>
              <Link to="/devenir-pro" className="btn btn-outline btn-lg hero-btn-outline">
                {t('hero.ctaArtisan')}
              </Link>
            </div>

            {/* Social proof */}
            <div className="hero-proof">
              <div className="hero-proof__avatars">
                {[68, 26, 37, 44].map((n) => (
                  <img
                    key={n}
                    src={`https://randomuser.me/api/portraits/women/${n}.jpg`}
                    alt="client"
                  />
                ))}
              </div>
              <div className="hero-proof__text">
                <span>{t('hero.proofText')}</span>
              </div>
            </div>

          </div>

          {/* Right — photo grid */}
          <div className="hero-photos">
            {heroPhotos.map((src, i) => (
              <div key={i} className="hero-photo">
                <img src={src} alt="artisan au travail" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
