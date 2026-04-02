import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { submitRegistration } from '../services/api';

const trades = ['plumbing', 'electrical', 'painting', 'masonry', 'hvac', 'carpentry', 'roofing', 'tiling'];

const benefits = [
  { icon: '✅', key: 'benefit1' },
  { icon: '👁️', key: 'benefit2' },
  { icon: '🔒', key: 'benefit3' },
  { icon: '🎧', key: 'benefit4' },
];

const plans = [
  {
    key: 'decouverte',
    price: '120',
    popular: false,
    features: [
      { icon: '✅', key: 'lifetimeMembership' },
      { icon: '✅', key: 'decouverte_project' },
      { icon: '✅', key: 'decouverte_then' },
      { icon: '✅', key: 'zoneProjects' },
      { icon: '✅', key: 'visibleProfile' },
      { icon: '✅', key: 'support' },
      { icon: '⚡', key: 'withCompetition' },
    ],
  },
  {
    key: 'premium',
    price: '190',
    popular: true,
    features: [
      { icon: '✅', key: 'lifetimeMembership' },
      { icon: '✅', key: 'premium_project' },
      { icon: '✅', key: 'premium_then' },
      { icon: '✅', key: 'exclusiveProjects' },
      { icon: '✅', key: 'fullyYours' },
      { icon: '✅', key: 'featuredProfile' },
      { icon: '✅', key: 'prioritySupport' },
    ],
  },
];

export default function DevenirProPage() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState({
    company: '', firstName: '', lastName: '',
    email: '', phone: '', postalCode: '',
    trade: '', comments: '', terms: false,
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
      await submitRegistration({ ...form, plan: selectedPlan });
      setSubmitted(true);
      setForm({ company: '', firstName: '', lastName: '', email: '', phone: '', postalCode: '', trade: '', comments: '', terms: false });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPlanData = plans.find((p) => p.key === selectedPlan);

  return (
    <>
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

          <div className="pricing-grid pricing-grid--2col">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`pricing-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.key ? 'pricing-card--selected' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">{t('packs.recommended')}</div>
                )}
                {selectedPlan === plan.key && (
                  <div className="pricing-card__selected-badge">✓ Sélectionné</div>
                )}
                <h3>{t(`packs.${plan.key}`)}</h3>
                <p className="description">{t('packs.annualRenewal')}</p>
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
            <Link to="/contact" className="btn btn-primary">
              {t('packs.clientCta')}
            </Link>
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
                        href="https://app.monartisanpro.com/login-artisan"
                        target="_blank"
                        rel="noopener noreferrer"
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
                        </select>
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
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={submitting}>
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
