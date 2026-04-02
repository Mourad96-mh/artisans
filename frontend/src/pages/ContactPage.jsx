import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { submitProject } from '../services/api';

const trades = ['plumbing', 'electrical', 'painting', 'masonry', 'hvac', 'carpentry', 'roofing', 'tiling'];

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', postalCode: '',
    trade: '', description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      await submitProject(form);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', postalCode: '', trade: '', description: '' });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Left: Info */}
            <div className="contact-info">
              <h2>{t('contact.whyTitle')}</h2>
              <p style={{ color: 'var(--color-gray)', marginBottom: 32 }}>{t('contact.whyDesc')}</p>

              <div className="contact-item">
                <div className="contact-item-icon">✅</div>
                <div>
                  <strong>{t('contact.why1Title')}</strong>
                  <span>{t('contact.why1Desc')}</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">⚡</div>
                <div>
                  <strong>{t('contact.why2Title')}</strong>
                  <span>{t('contact.why2Desc')}</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">🔒</div>
                <div>
                  <strong>{t('contact.why3Title')}</strong>
                  <span>{t('contact.why3Desc')}</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">💬</div>
                <div>
                  <strong>{t('contact.why4Title')}</strong>
                  <span>{t('contact.why4Desc')}</span>
                </div>
              </div>

              <div style={{ marginTop: 40, padding: '20px', background: 'var(--color-gray-light)', borderRadius: 'var(--radius-sm)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-gray)' }}>📞 {t('contact.phoneNumber')}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-gray)', marginTop: 6 }}>✉️ {t('contact.emailAddress')}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-gray)', marginTop: 6 }}>🕐 Lun – Ven, 9h – 18h</p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="form-card">
              <h2>{t('contact.formTitle')}</h2>
              <p style={{ color: 'var(--color-gray)', marginBottom: 24, fontSize: '0.95rem' }}>{t('contact.formSubtitle')}</p>

              {submitted ? (
                <div className="form-success">
                  <p>✅ {t('contact.success')}</p>
                  <p style={{ marginTop: 12, fontSize: '0.9rem', color: 'var(--color-gray)' }}>{t('contact.successNote')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('contact.name')}</label>
                      <input name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>{t('contact.postalCode')}</label>
                      <input name="postalCode" value={form.postalCode} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('contact.email')}</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>{t('contact.phone')}</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('contact.trade')}</label>
                    <select name="trade" value={form.trade} onChange={handleChange} required>
                      <option value="">{t('contact.selectTrade')}</option>
                      {trades.map((tr) => (
                        <option key={tr} value={tr}>{t(`trades.${tr}`)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('contact.description')}</label>
                    <textarea name="description" value={form.description} onChange={handleChange} style={{ minHeight: 120 }} required />
                  </div>

                  {submitError && <div className="admin-error">{submitError}</div>}

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={submitting}>
                    {submitting ? 'Envoi en cours…' : `🔍 ${t('contact.send')}`}
                  </button>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-gray)', marginTop: 12, textAlign: 'center' }}>
                    {t('contact.freeNote')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
