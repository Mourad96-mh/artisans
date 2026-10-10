import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { LEGAL_CONTENT } from '../content/legal';

const PATHS = { mentions: '/mentions-legales', cgv: '/cgv', privacy: '/politique-de-confidentialite' };

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
          {content.updated && <p className="legal-meta">{content.updated}</p>}
          {content.intro?.paragraphs?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {content.intro?.lines && <Lines lines={content.intro.lines} />}
          {content.sections.map((section) => (
            <div key={section.title} className="legal-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {section.items && (
                <ul className="legal-list">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {section.lines && <Lines lines={section.lines} />}
              {section.after?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
