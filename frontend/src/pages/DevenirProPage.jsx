import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { submitRegistration } from '../services/api';
import Seo from '../components/Seo';

const proJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Inscription artisan — Réseau Artisans',
  description: 'Rejoignez le réseau N°1 des artisans qualifiés. Recevez des projets qualifiés dans votre zone, développez votre activité en France, Belgique, Canada et Suisse.',
  provider: {
    '@type': 'Organization',
    name: 'Réseau Artisans',
  },
  areaServed: ['France', 'Belgique', 'Canada', 'Suisse'],
  offers: [
    {
      '@type': 'Offer',
      name: 'Pack Horizon',
      price: '99',
      priceCurrency: 'EUR',
      description: 'Paiement unique à vie, accès espace client, projets qualifiés, puis 29€ par projet',
    },
    {
      '@type': 'Offer',
      name: 'Pack Silver',
      price: '179',
      priceCurrency: 'EUR',
      description: '1 projet offert inclus, visibilité prioritaire, puis 39€ par projet',
    },
    {
      '@type': 'Offer',
      name: 'Pack Premium',
      price: '229',
      priceCurrency: 'EUR',
      description: '2 projets offerts inclus, projets exclusifs sans concurrence, puis 39€ par projet',
    },
  ],
};

const trades = ['plumbing', 'electrical', 'painting', 'masonry', 'hvac', 'carpentry', 'roofing', 'tiling'];

const benefits = [
  { icon: '✅', key: 'benefit1' },
  { icon: '👁️', key: 'benefit2' },
  { icon: '🔒', key: 'benefit3' },
  { icon: '🎧', key: 'benefit4' },
];

const plans = [
  {
    key: 'horizon',
    price: '99',
    popular: false,
    badge: null,
    features: [
      { icon: '✅', key: 'lifetimeMembership' },
      { icon: '✅', key: 'clientSpaceAccess' },
      { icon: '✅', key: 'zoneProjects' },
      { icon: '✅', key: 'visibleProfile' },
      { icon: '✅', key: 'whatsappSupport' },
      { icon: '⚡', key: 'maxTwoArtisans' },
    ],
  },
  {
    key: 'silver',
    price: '179',
    popular: true,
    badge: 'POPULAIRE',
    features: [
      { icon: '✅', key: 'lifetimeMembership' },
      { icon: '✅', key: 'clientSpaceAccess' },
      { icon: '✅', key: 'zoneProjects' },
      { icon: '✅', key: 'silver_project' },
      { icon: '✅', key: 'improvedVisibility' },
      { icon: '✅', key: 'featuredProfile' },
      { icon: '✅', key: 'priorityWhatsappSupport' },
    ],
  },
  {
    key: 'premium',
    price: '229',
    popular: false,
    badge: 'RECOMMANDÉ',
    features: [
      { icon: '✅', key: 'lifetimeMembership' },
      { icon: '✅', key: 'clientSpaceAccess' },
      { icon: '✅', key: 'zoneProjects' },
      { icon: '✅', key: 'premium_project' },
      { icon: '✅', key: 'exclusiveProjects' },
      { icon: '✅', key: 'maxPriorityVisibility' },
      { icon: '✅', key: 'featuredProfile' },
      { icon: '✅', key: 'priorityWhatsappSupport' },
      { icon: '✅', key: 'conversionAssistance' },
    ],
  },
];

const perProjectPlans = [
  {
    key: 'horizon',
    price: '29',
    label: 'Pour débuter',
    popular: false,
    badge: null,
    features: [
      'Accès à des projets qualifiés dans votre zone',
      'Profil artisan visible',
      'Support client prioritaire',
      'Concurrence limitée (max 2 artisans)',
    ],
  },
  {
    key: 'premium',
    price: '39',
    label: 'Projet exclusif sans concurrence',
    popular: true,
    badge: null,
    features: [
      'Accès à des projets qualifiés dans votre zone',
      'Profil artisan mis en avant',
      'Support WhatsApp prioritaire',
      'Projet exclusif — 0 concurrent',
      'Leads qualifiés + filtrés',
      'Assistance à la conversion',
    ],
  },
  {
    key: 'pro',
    price: '19',
    label: 'Meilleur rapport qualité/prix',
    popular: false,
    badge: '🔥 OFFRE',
    features: [
      'Accès à des projets qualifiés dans votre zone',
      'Profil artisan visible',
      'Support client prioritaire',
      'Tarif le plus compétitif du marché',
    ],
  },
];

const leadPacks = [
  {
    key: '5_leads_horizon',
    name: 'Pack 5 Leads Horizon',
    label: 'Idéal pour démarrer (~24€/lead)',
    price: '119',
    popular: false,
    features: [
      '5 leads qualifiés livrés sous 24h',
      'Leads dans votre zone d\'intervention',
      'Accès via votre espace client',
      'Coordonnées complètes du prospect',
    ],
  },
  {
    key: '10_leads_horizon',
    name: 'Pack 10 Leads Horizon',
    label: 'Volume avantageux (~20€/lead)',
    price: '199',
    popular: false,
    features: [
      '10 leads qualifiés livrés sous 24h',
      'Leads dans votre zone d\'intervention',
      'Accès via votre espace client',
      'Coordonnées complètes du prospect',
      'Volume idéal pour booster votre activité',
    ],
  },
  {
    key: '5_leads_premium',
    name: 'Pack 5 Leads Premium',
    label: 'Performance maximale (~40€/lead)',
    price: '199',
    popular: true,
    features: [
      '5 leads premium livrés sous 24h',
      'Leads dans votre zone d\'intervention',
      'Accès via votre espace client',
      'Coordonnées complètes du prospect',
      'Leads à forte intention d\'achat',
      'Taux de conversion supérieur',
      'Leads exclusifs qualifiés + ciblés',
    ],
  },
  {
    key: '10_leads_premium',
    name: 'Pack 10 Leads Premium',
    label: 'Performance maximale (~35€/lead)',
    price: '349',
    popular: false,
    features: [
      '10 leads premium livrés sous 24h',
      'Leads dans votre zone d\'intervention',
      'Accès via votre espace client',
      'Coordonnées complètes du prospect',
      'Leads à forte intention d\'achat',
      'Taux de conversion supérieur',
      'Leads exclusifs qualifiés + ciblés',
    ],
  },
];

export default function DevenirProPage() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState({
    company: '', firstName: '', lastName: '',
    email: '', phone: '', postalCode: '',
    trade: '', otherTrade: '', comments: '', terms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef(null);

  const handleSelectPlan = (planKey) => {
    setSelectedPlan(planKey);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const tradeValue = form.trade === 'other' ? form.otherTrade : form.trade;
      await submitRegistration({ ...form, trade: tradeValue, plan: selectedPlan });
      setSubmitted(true);
      setForm({ company: '', firstName: '', lastName: '', email: '', phone: '', postalCode: '', trade: '', otherTrade: '', comments: '', terms: false });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPlanData = plans.find((p) => p.key === selectedPlan);

  return (
    <>
      <Seo
        title="Devenir Artisan Pro — Rejoignez le réseau N°1"
        description="Rejoignez le réseau N°1 des artisans qualifiés en France, Belgique, Canada et Suisse. Recevez des projets qualifiés dans votre zone. Inscription en quelques minutes, accès à vie."
        keywords="artisans de france, artisan de france label, meilleur artisan de france, artisan solidaire de france, artisan pro belgique, artisan pro québec, artisan pro suisse, rejoindre réseau artisans"
        jsonLd={proJsonLd}
        path="/devenir-pro"
      />
      <div className="page-hero">
        <div className="container">
          <h1>{t('packs.title')}</h1>
          <p>{t('packs.artisanSubtitle')}</p>
        </div>
      </div>

      {/* ── Artisan Plans ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="pricing-step-badge">Étape 1 — {t('becomePro.pricingTeaser')}</div>
            <h2>{t('packs.artisanTitle')}</h2>
            <p>{t('packs.subtitle')}</p>
          </div>

          <div className="pricing-grid">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`pricing-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.key ? 'pricing-card--selected' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">{t('packs.recommended')}</div>
                )}
                {plan.badge && (
                  <div className="popular-badge popular-badge--pro">{plan.badge}</div>
                )}
                {selectedPlan === plan.key && (
                  <div className="pricing-card__selected-badge">✓ Sélectionné</div>
                )}
                <h3>{t(`packs.${plan.key}`)}</h3>
                <p className="description">{t('packs.oneTimePayment')}</p>
                <div className="price">
                  <span className="amount">{plan.price}</span>
                  <span className="currency">€</span>
                  <span className="price-period">{t('packs.perYear')}</span>
                </div>
                <p className="plan-desc">{t(`packs.${plan.key}_desc`)}</p>
                <ul className="features-list">
                  {plan.features.map((f) => (
                    <li key={f.key}>{f.icon} {t(`packs.${f.key}`)}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelectPlan(plan.key)}
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {selectedPlan === plan.key ? `✓ ${t('packs.choosePlan')}` : t('packs.choosePlan')}
                </button>
                <p className="pack-note">{t('packs.accessNote')} · {t('packs.renewNote')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Per-project pricing ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t('packs.perProjectTitle')}</h2>
            <p>{t('packs.perProjectSubtitle')}</p>
          </div>
          <div className="pricing-grid">
            {perProjectPlans.map((plan) => (
              <div key={plan.key} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">{t('packs.recommended')}</div>}
                {plan.badge && <div className="popular-badge popular-badge--pro">{plan.badge}</div>}
                <h3>{t(`packs.perProject_${plan.key}`)}</h3>
                <p className="description">{plan.label}</p>
                <div className="price">
                  {plan.price ? (
                    <>
                      <span className="amount">{plan.price}</span>
                      <span className="currency">€</span>
                      <span className="price-period">{t('packs.perProjectUnit')}</span>
                    </>
                  ) : (
                    <span className="amount" style={{ fontSize: '1.1rem' }}>{t('packs.contactAdviser')}</span>
                  )}
                </div>
                <ul className="features-list">
                  {plan.features.map((f) => <li key={f}>✅ {f}</li>)}
                </ul>
                {plan.price ? (
                  <button onClick={() => handleSelectPlan(plan.key)} className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                    {t('packs.choosePlan')}
                  </button>
                ) : (
                  <Link to="/contact" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                    {t('packs.contactCta')}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead packs ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <h2>{t('packs.leadsTitle')}</h2>
            <p>{t('packs.leadsSubtitle')}</p>
          </div>
          <div className="pricing-grid pricing-grid--4">
            {leadPacks.map((pack) => (
              <div key={pack.key} className={`pricing-card ${pack.popular ? 'popular' : ''}`}>
                {pack.popular && <div className="popular-badge">{t('packs.recommended')}</div>}
                <h3>{pack.name}</h3>
                <p className="description">{pack.label}</p>
                <div className="price">
                  <span className="amount">{pack.price}</span>
                  <span className="currency">€</span>
                </div>
                <ul className="features-list">
                  {pack.features.map((f) => <li key={f}>✅ {f}</li>)}
                </ul>
                <Link to="/contact" className={`btn ${pack.popular ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                  {t('packs.choosePlan')}
                </Link>
              </div>
            ))}
          </div>
          <p className="leads-note">⚡ {t('packs.leadsNote')}</p>
        </div>
      </section>

      {/* ── Client section ── */}
      <section className="section clients-free-section">
        <div className="container">
          <div className="clients-free-card">
            <div className="clients-free-badge">{t('packs.freeBadge')}</div>
            <h2>{t('packs.clientTitle')}</h2>
            <p>{t('packs.clientDesc')}</p>
            <ul className="clients-free-features">
              <li>✅ {t('packs.clientFeature1')}</li>
              <li>✅ {t('packs.clientFeature2')}</li>
              <li>✅ {t('packs.clientFeature3')}</li>
            </ul>
            <div style={{ marginTop: 8 }}>
              <Link to="/contact" className="btn btn-primary">
                {t('packs.clientCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Step 2: Form (revealed after plan selection) ── */}
      {selectedPlan && (
        <div className="devenir-pro-content" ref={formRef}>
          <div className="container">

            <div className="selected-plan-reminder">
              <span>✓ {t('packs.choosePlan')} :</span>
              <strong>{t(`packs.${selectedPlan}`)} — {selectedPlanData.price} €</strong>
              <button className="selected-plan-change" onClick={() => setSelectedPlan(null)}>
                {t('becomePro.changePlan')}
              </button>
            </div>

            <div className="devenir-pro-grid">
              {/* Left: Benefits + Stats */}
              <div>
                <div className="benefits-list">
                  {benefits.map((b) => (
                    <div key={b.key} className="benefit-item">
                      <div className="benefit-icon">{b.icon}</div>
                      <div>
                        <h3>{t(`becomePro.${b.key}Title`)}</h3>
                        <p>{t(`becomePro.${b.key}Desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pro-stats">
                  <div className="pro-stat">
                    <span className="value">12k+</span>
                    <span className="label">{t('stats.artisans')}</span>
                  </div>
                  <div className="pro-stat">
                    <span className="value">50k+</span>
                    <span className="label">{t('stats.projects')}</span>
                  </div>
                  <div className="pro-stat">
                    <span className="value">4.8/5</span>
                    <span className="label">{t('stats.satisfaction')}</span>
                  </div>
                  <div className="pro-stat">
                    <span className="value">24h</span>
                    <span className="label">{t('stats.response')}</span>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="form-card">
                <div className="form-step-label">Étape 2 — {t('becomePro.formTitle')}</div>

                {submitted ? (
                  <div className="form-success">
                    <p>✅ {t('becomePro.success')}</p>
                    <p style={{ marginTop: 16, fontSize: '0.95rem', color: 'var(--color-gray)' }}>
                      {t('becomePro.portalNote')}{' '}
                      <a
                        href="/artisan/login"
                        style={{ color: 'var(--color-primary)', fontWeight: 600 }}
                      >
                        {t('becomePro.portalLink')} →
                      </a>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>{t('becomePro.company')}</label>
                      <input name="company" value={form.company} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>{t('becomePro.firstName')}</label>
                        <input name="firstName" value={form.firstName} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>{t('becomePro.lastName')}</label>
                        <input name="lastName" value={form.lastName} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>{t('becomePro.email')}</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>{t('becomePro.phone')}</label>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>{t('becomePro.postalCode')}</label>
                        <input name="postalCode" value={form.postalCode} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>{t('becomePro.trade')}</label>
                        <select name="trade" value={form.trade} onChange={handleChange} required>
                          <option value="">{t('becomePro.selectTrade')}</option>
                          {trades.map((tr) => (
                            <option key={tr} value={tr}>{t(`trades.${tr}`)}</option>
                          ))}
                          <option value="other">Autre métier…</option>
                        </select>
                        {form.trade === 'other' && (
                          <input
                            name="otherTrade"
                            value={form.otherTrade}
                            onChange={handleChange}
                            placeholder="Précisez votre métier"
                            required
                            style={{ marginTop: 8 }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>{t('becomePro.comments')}</label>
                      <textarea name="comments" value={form.comments} onChange={handleChange} />
                    </div>
                    <label className="form-checkbox">
                      <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} required />
                      {t('becomePro.terms')}
                    </label>
                    {submitError && <div className="admin-error">{submitError}</div>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} disabled={submitting}>
                      {submitting ? 'Envoi en cours…' : `🚀 ${t('becomePro.submit')}`}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
