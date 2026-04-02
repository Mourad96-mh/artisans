import { useTranslation } from 'react-i18next';
import HowItWorks from '../components/sections/HowItWorks';
import Trades from '../components/sections/Trades';
import CTASection from '../components/sections/CTASection';

export default function HowItWorksPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>{t('howItWorks.title')}</h1>
          <p>{t('howItWorks.subtitle')}</p>
        </div>
      </div>
      <HowItWorks />
      <Trades />
      <CTASection />
    </>
  );
}
