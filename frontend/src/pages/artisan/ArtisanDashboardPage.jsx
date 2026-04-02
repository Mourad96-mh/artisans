import { useState, useEffect } from 'react';
import { useArtisanAuth } from '../../context/ArtisanAuthContext';
import { fetchArtisanDashboard } from '../../services/api';

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

  useEffect(() => {
    fetchArtisanDashboard()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="artisan-loading">Chargement…</div>;
  if (error) return <div className="artisan-loading" style={{ color: '#dc2626' }}>{error}</div>;

  const { projects } = data;

  return (
    <div className="artisan-layout">
      {/* Sidebar */}
      <aside className="artisan-sidebar">
        <div className="artisan-sidebar-logo">🔨 Réseau<span>Artisans</span></div>
        <div className="artisan-sidebar-profile">
          <div className="artisan-avatar">{data.artisan.firstName?.[0]}{data.artisan.lastName?.[0]}</div>
          <div>
            <strong>{data.artisan.firstName} {data.artisan.lastName}</strong>
            <span>{data.artisan.company}</span>
          </div>
        </div>
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
        <header className="admin-header">
          <h1>Tableau de bord</h1>
        </header>

        <div className="artisan-content">
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
                      <span>📍 {p.postalCode}</span>
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
