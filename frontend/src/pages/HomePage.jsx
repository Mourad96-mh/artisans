import Hero from '../components/sections/Hero';
import HeroBadges from '../components/sections/HeroBadges';
import TrustBar from '../components/sections/TrustBar';
import StatsBar from '../components/sections/StatsBar';
import HowItWorks from '../components/sections/HowItWorks';
import Trades from '../components/sections/Trades';
import Testimonials from '../components/sections/Testimonials';
import ArtisanBanner from '../components/sections/ArtisanBanner';
import FAQ from '../components/sections/FAQ';
import CTASection from '../components/sections/CTASection';
import Seo from '../components/Seo';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Réseau Artisans — Annuaire des artisans qualifiés',
  description: 'Trouvez un artisan qualifié près de chez vous en France, Belgique, Canada et Suisse. Artisans vérifiés, devis gratuits sous 48h.',
  publisher: {
    '@type': 'Organization',
    name: 'Réseau Artisans',
    address: {
      '@type': 'PostalAddress',
      streetAddress: "6 Rue d'Armaillé",
      postalCode: '75017',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
  },
};

export default function HomePage() {
  return (
    <>
      <Seo
        title="Annuaire des artisans qualifiés — France, Belgique, Canada, Suisse"
        description="Réseau Artisans, le N°1 pour trouver un artisan de confiance près de chez soi. Plombier, électricien, peintre… Devis gratuits sous 48h en France, Belgique, Canada et Suisse."
        keywords="annuaire artisans france, meilleur artisan de france, artisans de france, artisan solidaire de france, artisan belgique, artisan québec, artisan suisse, trouver un artisan près de chez soi, artisan de confiance"
        jsonLd={homeJsonLd}
        path="/"
      />
      <Hero />
      <HeroBadges />
      <TrustBar />
      <StatsBar />
      <HowItWorks />
      <Trades />
      <Testimonials />
      <ArtisanBanner />
      <FAQ />
      <CTASection />
    </>
  );
}
