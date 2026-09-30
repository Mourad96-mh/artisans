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
  description: 'Trouvez un artisan qualifié près de chez vous au Canada. Artisans vérifiés, devis gratuits sous 48h.',
  publisher: {
    '@type': 'Organization',
    name: 'Réseau Artisans',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '221 Rue Milton',
      postalCode: 'H2X 1V5',
      addressLocality: 'Montréal',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
  },
};

export default function HomePage() {
  return (
    <>
      <Seo
        title="Annuaire des artisans qualifiés — Canada"
        description="Réseau Artisans, le N°1 pour trouver un artisan de confiance près de chez soi. Plombier, électricien, peintre… Devis gratuits sous 48h au Canada."
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
