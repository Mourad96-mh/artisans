import Hero from '../components/sections/Hero';
import TrustBar from '../components/sections/TrustBar';
import StatsBar from '../components/sections/StatsBar';
import HowItWorks from '../components/sections/HowItWorks';
import Trades from '../components/sections/Trades';
import Testimonials from '../components/sections/Testimonials';
import ArtisanBanner from '../components/sections/ArtisanBanner';
import FAQ from '../components/sections/FAQ';
import CTASection from '../components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
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
