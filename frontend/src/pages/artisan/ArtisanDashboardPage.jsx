import { useState, useEffect } from 'react';
import { useArtisanAuth } from '../../context/ArtisanAuthContext';
import { fetchArtisanDashboard, updateArtisanAvailability, changeArtisanPassword } from '../../services/api';

const PLAN_LABELS = {
  horizon: 'Horizon',
  silver: 'Silver',
  premium: 'Premium',
};

const TRADES_FR = {
  plumbing: 'Plomberie', electrical: 'Électricité', painting: 'Peinture',
  masonry: 'Maçonnerie', hvac: 'Climatisation', carpentry: 'Menuiserie',
  roofing: 'Toiture', tiling: 'Carrelage',
};

const PROJECT_STATUS_LABELS = {
  new: 'Nouveau',
  processing: 'En cours',
  matched: 'Assigné',
  completed: 'Terminé',
  cancelled: 'Annulé',
};

const BUDGET_LABELS = {
  budget_1: 'Moins de 500€',
  budget_2: '500€ – 2 000€',
  budget_3: '2 000€ – 5 000€',
  budget_4: '5 000€ – 15 000€',
  budget_5: 'Plus de 15 000€',
};

export default function ArtisanDashboardPage() {
  const { artisan, logout } = useArtisanAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [dateSaving, setDateSaving] = useState(false);
  const [dateStatus, setDateStatus] = useState(null); // { type: 'success'|'error', message: string }

  const [pwCurrent, setPwCurrent] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwStatus, setPwStatus] = useState(null); // { type: 'success'|'error', message: string }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwStatus(null);
    if (pwNew !== pwConfirm) {
      setPwStatus({ type: 'error', message: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }
    if (pwNew.length < 6) {
      setPwStatus({ type: 'error', message: 'Le nouveau mot de passe doit contenir au moins 6 caractères.' });
      return;
    }
    setPwSaving(true);
    try {
      await changeArtisanPassword(pwCurrent, pwNew);
      setPwStatus({ type: 'success', message: 'Mot de passe mis à jour avec succès.' });
      setPwCurrent('');
      setPwNew('');
      setPwConfirm('');
    } catch (err) {
      setPwStatus({ type: 'error', message: err.message || 'Une erreur est survenue.' });
    } finally {
      setPwSaving(false);
    }
  };

  useEffect(() => {
    fetchArtisanDashboard()
      .then((d) => {
        setData(d);
        if (d.artisan.nextProjectDate) {
          setNextDate(d.artisan.nextProjectDate.slice(0, 10));
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDateSave = async () => {
    if (!nextDate) return;
    setDateSaving(true);
    setDateStatus(null);
    try {
      await updateArtisanAvailability(nextDate);
      setDateStatus({ type: 'success', message: `Disponibilité enregistrée pour le ${new Date(nextDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}. L'équipe a été notifiée.` });
    } catch (err) {
      setDateStatus({ type: 'error', message: err.message || 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setDateSaving(false);
    }
  };

  if (loading) return <div className="artisan-loading">Chargement…</div>;
  if (error) return <div className="artisan-loading" style={{ color: '#dc2626' }}>{error}</div>;

  const { projects } = data;

  return (
    <div className="artisan-layout">
      {/* Sidebar */}
      <aside className="artisan-sidebar">
        <div className="artisan-sidebar-logo"><img src="/logo.png" alt="Réseau Artisans" style={{ height: '58px', width: 'auto' }} /></div>
        <div className="artisan-sidebar-profile">
          <div className="artisan-avatar">{data.artisan.firstName?.[0]}{data.artisan.lastName?.[0]}</div>
          <div>
            <strong>{data.artisan.firstName} {data.artisan.lastName}</strong>
            <span>{data.artisan.company}</span>
          </div>
        </div>
        {data.subscription && (
          <div className="artisan-sidebar-plan">
            <span className={`artisan-plan-dot${data.subscription.isActive ? ' artisan-plan-dot--active' : ''}`} />
            <span className="artisan-sidebar-plan-name">{PLAN_LABELS[data.subscription.plan] || data.subscription.plan}</span>
            <span className="artisan-sidebar-plan-status">{data.subscription.isActive ? 'Actif' : 'Inactif'}</span>
          </div>
        )}
        <nav className="artisan-sidebar-nav">
          <a className="active">📋 Mes projets</a>
        </nav>
        <div className="artisan-sidebar-footer">
          <span>{artisan?.email}</span>
          <button onClick={logout}>Déconnexion</button>
        </div>
      </aside>

      {/* Main */}
      <div className="artisan-main">
        <div className="artisan-mobile-bar">
          <div>🔨 Réseau<span>Artisans</span></div>
          <button onClick={logout}>Déconnexion</button>
        </div>
        <header className="admin-header">
          <h1>Tableau de bord</h1>
        </header>

        <div className="artisan-content">
          {/* Subscription card */}
          {data.subscription && (
            <div className={`subscription-card ${data.subscription.isActive ? 'subscription-card--active' : 'subscription-card--expired'}`}>
              <div>
                <div className="subscription-badge" style={{ display: 'flex', alignItems: 'center', gap: 7, width: 'fit-content' }}>
                  <span className={`artisan-plan-dot${data.subscription.isActive ? ' artisan-plan-dot--active' : ''}`} />
                  {data.subscription.isActive ? 'Abonnement actif' : 'Abonnement expiré'}
                </div>
                <h2>Plan {PLAN_LABELS[data.subscription.plan] || data.subscription.plan}</h2>
                <p>Votre accès à l'espace artisan et aux projets assignés.</p>
              </div>
              <div className="subscription-card-right">
                <span className="renewal-label">Projets assignés</span>
                <span className="renewal-date" style={{ fontSize: '2rem' }}>{projects.length}</span>
              </div>
            </div>
          )}

          {/* Next project date */}
          <div className="artisan-section">
            <h2>Disponibilité pour le prochain projet</h2>
            <div className="artisan-availability">
              <p>Indiquez à quelle date vous serez disponible pour un nouveau projet :</p>
              <div className="artisan-availability-row">
                <input
                  type="date"
                  value={nextDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => { setNextDate(e.target.value); setDateStatus(null); }}
                  className="artisan-date-input"
                  disabled={dateSaving}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleDateSave}
                  disabled={dateSaving || !nextDate}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  {dateSaving && (
                    <span style={{
                      width: 15, height: 15, border: '2px solid rgba(255,255,255,0.4)',
                      borderTopColor: '#fff', borderRadius: '50%',
                      display: 'inline-block', animation: 'spin 0.7s linear infinite',
                    }} />
                  )}
                  {dateSaving ? 'Enregistrement…' : 'Enregistrer'}
                </button>
                {nextDate && !dateSaving && (
                  <button
                    className="btn btn-outline"
                    onClick={() => { setNextDate(''); setDateStatus(null); updateArtisanAvailability(null).catch(console.error); }}
                  >
                    Effacer
                  </button>
                )}
              </div>
              {dateStatus && (
                <div className={dateStatus.type === 'success' ? 'artisan-date-saved' : 'artisan-date-error'}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 12 }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>
                    {dateStatus.type === 'success' ? '✅' : '❌'}
                  </span>
                  <span>{dateStatus.message}</span>
                  <button
                    onClick={() => setDateStatus(null)}
                    style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, fontSize: '1rem', flexShrink: 0 }}
                    title="Fermer"
                  >✕</button>
                </div>
              )}
            </div>
          </div>

          {/* Change password */}
          <div className="artisan-section">
            <h2>Changer le mot de passe</h2>
            <form onSubmit={handlePasswordChange} className="artisan-availability" style={{ maxWidth: 420 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                  type="password"
                  placeholder="Mot de passe actuel"
                  value={pwCurrent}
                  onChange={(e) => { setPwCurrent(e.target.value); setPwStatus(null); }}
                  className="artisan-date-input"
                  disabled={pwSaving}
                  required
                  style={{ width: '100%' }}
                />
                <input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  value={pwNew}
                  onChange={(e) => { setPwNew(e.target.value); setPwStatus(null); }}
                  className="artisan-date-input"
                  disabled={pwSaving}
                  required
                  style={{ width: '100%' }}
                />
                <input
                  type="password"
                  placeholder="Confirmer le nouveau mot de passe"
                  value={pwConfirm}
                  onChange={(e) => { setPwConfirm(e.target.value); setPwStatus(null); }}
                  className="artisan-date-input"
                  disabled={pwSaving}
                  required
                  style={{ width: '100%' }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={pwSaving || !pwCurrent || !pwNew || !pwConfirm}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}
                >
                  {pwSaving && (
                    <span style={{
                      width: 15, height: 15, border: '2px solid rgba(255,255,255,0.4)',
                      borderTopColor: '#fff', borderRadius: '50%',
                      display: 'inline-block', animation: 'spin 0.7s linear infinite',
                    }} />
                  )}
                  {pwSaving ? 'Enregistrement…' : 'Mettre à jour'}
                </button>
              </div>
              {pwStatus && (
                <div className={pwStatus.type === 'success' ? 'artisan-date-saved' : 'artisan-date-error'}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 12 }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>
                    {pwStatus.type === 'success' ? '✅' : '❌'}
                  </span>
                  <span>{pwStatus.message}</span>
                  <button
                    type="button"
                    onClick={() => setPwStatus(null)}
                    style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6, fontSize: '1rem', flexShrink: 0 }}
                    title="Fermer"
                  >✕</button>
                </div>
              )}
            </form>
          </div>

          {/* Projects */}
          <div className="artisan-section">
            <h2>Mes projets assignés <span className="artisan-count">{projects.length}</span></h2>

            {projects.length === 0 ? (
              <div className="artisan-empty">
                <p>Aucun projet assigné pour le moment.</p>
                <p>Notre équipe vous contactera dès qu'un projet correspond à votre profil.</p>
              </div>
            ) : (
              <div className="artisan-projects-grid">
                {projects.map((p) => (
                  <div key={p._id} className="artisan-project-card">
                    <div className="artisan-project-header">
                      <span className={`project-status-badge status-${p.status}`}>
                        {PROJECT_STATUS_LABELS[p.status]}
                      </span>
                      <span className="artisan-project-date">
                        {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <h3>{TRADES_FR[p.trade] || p.trade}</h3>
                    <p className="artisan-project-desc">{p.description}</p>
                    <div className="artisan-project-meta">
                      {p.address && <span>🏠 {p.address}</span>}
                      <span>📍 {p.postalCode}</span>
                      <span>🌍 {p.country || '—'}</span>
                      {p.budget && <span>💶 {BUDGET_LABELS[p.budget] || p.budget}</span>}
                    </div>
                    <div className="artisan-project-contact">
                      <strong>{p.name}</strong>
                      <a href={`mailto:${p.email}`}>{p.email}</a>
                      <a href={`tel:${p.phone}`}>{p.phone}</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
