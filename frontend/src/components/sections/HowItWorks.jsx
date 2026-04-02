import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    { num: '1', title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc') },
    { num: '2', title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc') },
    { num: '3', title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc') },
  ];

  return (
    <section className="section how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>{t('howItWorks.title')}</h2>
          <p>{t('howItWorks.subtitle')}</p>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.num} className="step-card">
              <div className="step-number">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
