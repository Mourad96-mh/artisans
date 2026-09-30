import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { LEGAL_CONTENT } from '../content/legal';

const PATHS = { mentions: '/mentions-legales', cgv: '/cgv' };

function Lines({ lines }) {
  return (
    <p className="legal-lines">
      {lines.map((line, i) => (
        <span key={i}>{line}</span>
      ))}
    </p>
  );
}

export default function LegalPage({ doc }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'fr';
  const content = LEGAL_CONTENT[doc][lang];
  const seoContent = LEGAL_CONTENT[doc].fr;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [doc]);

  return (
    <>
      <Seo title={seoContent.title} description={seoContent.subtitle} path={PATHS[doc]} />
      <div className="page-hero">
        <div className="container">
          <h1>{content.title}</h1>
          <p>{content.subtitle}</p>
        </div>
      </div>
      <section className="section-sm">
        <div className="container legal-content">
          {content.intro && <Lines lines={content.intro.lines} />}
          {content.sections.map((section) => (
            <div key={section.title} className="legal-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {section.lines && <Lines lines={section.lines} />}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
