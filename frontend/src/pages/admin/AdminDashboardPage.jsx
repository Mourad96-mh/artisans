import { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  fetchRegistrations, fetchStats, updateStatus, deleteRegistration, renewRegistration,
  fetchProjects, fetchProjectStats, updateProjectStatus, deleteProject,
  fetchArtisanAccounts, createArtisanAccount, updateArtisanCredentials, assignProject,
  updateAdminCredentials,
} from '../../services/api';

const REGISTRATION_STATUSES = {
  new: { label: 'Nouveau', className: 'status-new' },
  contacted: { label: 'Contacté', className: 'status-contacted' },
  converted: { label: 'Converti', className: 'status-converted' },
  rejected: { label: 'Rejeté', className: 'status-rejected' },
};

const PROJECT_STATUSES = {
  new: { label: 'Nouveau', className: 'status-new' },
  processing: { label: 'En cours', className: 'status-contacted' },
  matched: { label: 'Mis en relation', className: 'status-converted' },
  completed: { label: 'Terminé', className: 'status-converted' },
  cancelled: { label: 'Annulé', className: 'status-rejected' },
};

const TRADES_FR = {
  plumbing: 'Plomberie', electrical: 'Électricité', painting: 'Peinture',
  masonry: 'Maçonnerie', hvac: 'Climatisation', carpentry: 'Menuiserie',
  roofing: 'Toiture', tiling: 'Carrelage',
};

export default function AdminDashboardPage() {
  const { admin, logout } = useAdminAuth();
  const [tab, setTab] = useState('artisans');

  // ── Artisans state ──
  const [registrations, setRegistrations] = useState([]);
  const [regStats, setRegStats] = useState(null);
  const [regFilters, setRegFilters] = useState({ status: '', plan: '', search: '', expired: false });
  const [regLoading, setRegLoading] = useState(true);
  const [artisanAccounts, setArtisanAccounts] = useState([]);
  // create modal: { registrationId, prefillEmail }
  const [createModal, setCreateModal] = useState(null);
  const [createForm, setCreateForm] = useState({ email: '', password: '' });
  const [createError, setCreateError] = useState('');
  const [createdCredentials, setCreatedCredentials] = useState(null); // { email, password } shown after create

  // edit credentials modal: { artisanId, currentEmail }
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({ email: '', password: '' });
  const [editError, setEditError] = useState('');
  const [updatedCredentials, setUpdatedCredentials] = useState(null); // shown after update

  const [copied, setCopied] = useState('');

  // ── Admin credentials modal ──
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ email: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  // ── Projects state ──
  const [projects, setProjects] = useState([]);
  const [projStats, setProjStats] = useState(null);
  const [projFilters, setProjFilters] = useState({ status: '', trade: '', search: '' });
  const [projLoading, setProjLoading] = useState(true);

  // ── Load artisans ──
  const loadRegistrations = useCallback(async () => {
    setRegLoading(true);
    try {
      const params = {};
      if (regFilters.status) params.status = regFilters.status;
      if (regFilters.plan) params.plan = regFilters.plan;
      if (regFilters.search) params.search = regFilters.search;
      const [data, stats] = await Promise.all([fetchRegistrations(params), fetchStats()]);
      setRegistrations(data);
      setRegStats(stats);
    } catch (err) { console.error(err); }
    finally { setRegLoading(false); }
  }, [regFilters]);

  // ── Load projects ──
  const loadProjects = useCallback(async () => {
    setProjLoading(true);
    try {
      const params = {};
      if (projFilters.status) params.status = projFilters.status;
      if (projFilters.trade) params.trade = projFilters.trade;
      if (projFilters.search) params.search = projFilters.search;
      const [data, stats] = await Promise.all([fetchProjects(params), fetchProjectStats()]);
      setProjects(data);
      setProjStats(stats);
    } catch (err) { console.error(err); }
    finally { setProjLoading(false); }
  }, [projFilters]);

  useEffect(() => { loadRegistrations(); }, [loadRegistrations]);
  useEffect(() => { loadProjects(); }, [loadProjects]);
  useEffect(() => {
    fetchArtisanAccounts().then(setArtisanAccounts).catch(() => {});
  }, []);

  // ── Artisan handlers ──
  const handleRegStatusChange = async (id, status) => {
    await updateStatus(id, status);
    setRegistrations((prev) => prev.map((r) => r._id === id ? { ...r, status } : r));
    fetchStats().then(setRegStats).catch(() => {});
  };

  const handleRegDelete = async (id) => {
    if (!confirm('Supprimer ce lead ?')) return;
    await deleteRegistration(id);
    setRegistrations((prev) => prev.filter((r) => r._id !== id));
    fetchStats().then(setRegStats).catch(() => {});
    fetchArtisanAccounts().then(setArtisanAccounts).catch(() => {});
  };

  const handleRenew = async (id) => {
    const updated = await renewRegistration(id);
    setRegistrations((prev) => prev.map((r) => r._id === id ? updated : r));
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setCreateError('');
    try {
      await createArtisanAccount({ ...createForm, registrationId: createModal });
      setCreatedCredentials({ email: createForm.email, password: createForm.password });
      setCreateModal(null);
      setCreateForm({ email: '', password: '' });
      fetchArtisanAccounts().then(setArtisanAccounts).catch(() => {});
    } catch (err) {
      setCreateError(err.message);
    }
  };

  const handleEditCredentials = async (e) => {
    e.preventDefault();
    setEditError('');
    try {
      const payload = {};
      if (editForm.email) payload.email = editForm.email;
      if (editForm.password) payload.password = editForm.password;
      await updateArtisanCredentials(editModal.artisanId, payload);
      if (editForm.password) {
        setUpdatedCredentials({ email: editForm.email || editModal.currentEmail, password: editForm.password });
      }
      setEditModal(null);
      setEditForm({ email: '', password: '' });
      fetchArtisanAccounts().then(setArtisanAccounts).catch(() => {});
    } catch (err) {
      setEditError(err.message);
    }
  };

  const handleAssign = async (projectId, artisanUserId) => {
    const updated = await assignProject(projectId, artisanUserId);
    setProjects((prev) => prev.map((p) => p._id === projectId ? updated : p));
  };

  // ── Project handlers ──
  const handleProjStatusChange = async (id, status) => {
    await updateProjectStatus(id, status);
    setProjects((prev) => prev.map((p) => p._id === id ? { ...p, status } : p));
    fetchProjectStats().then(setProjStats).catch(() => {});
  };

  const handleProjDelete = async (id) => {
    if (!confirm('Supprimer ce projet ?')) return;
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
    fetchProjectStats().then(setProjStats).catch(() => {});
  };

  const handleSettingsSave = async (e) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');
    if (settingsForm.newPassword && settingsForm.newPassword !== settingsForm.confirmPassword) {
      return setSettingsError('Les nouveaux mots de passe ne correspondent pas.');
    }
    try {
      const payload = { currentPassword: settingsForm.currentPassword };
      if (settingsForm.email) payload.email = settingsForm.email;
      if (settingsForm.newPassword) payload.newPassword = settingsForm.newPassword;
      await updateAdminCredentials(payload);
      setSettingsSuccess('Identifiants mis à jour avec succès.');
      setSettingsForm({ email: '', currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setSettingsError(err.message);
    }
  };

  const statCount = (stats, key, val) =>
    stats?.byStatus?.find((s) => s._id === val)?.count || 0;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo"><img src="/logo.png" alt="Réseau Artisans" style={{ height: '58px', width: 'auto' }} /></div>
        <nav className="admin-sidebar-nav">
          <a className={tab === 'artisans' ? 'active' : ''} onClick={() => setTab('artisans')}>
            🔧 Artisans {regStats && <span className="admin-nav-count">{regStats.total}</span>}
          </a>
          <a className={tab === 'projects' ? 'active' : ''} onClick={() => setTab('projects')}>
            🏠 Projets clients {projStats && <span className="admin-nav-count">{projStats.total}</span>}
          </a>
        </nav>
        <div className="admin-sidebar-footer">
          <span>{admin?.email}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { setSettingsOpen(true); setSettingsError(''); setSettingsSuccess(''); }}>⚙ Compte</button>
            <button onClick={logout}>Déconnexion</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <div className="admin-mobile-bar">
          <div>🔨 Réseau<span>Artisans</span></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { setSettingsOpen(true); setSettingsError(''); setSettingsSuccess(''); }}>⚙</button>
            <button onClick={logout}>Déconnexion</button>
          </div>
        </div>
        <div className="admin-mobile-tabs">
          <button className={`admin-mobile-tab ${tab === 'artisans' ? 'active' : ''}`} onClick={() => setTab('artisans')}>🔧 Artisans</button>
          <button className={`admin-mobile-tab ${tab === 'projects' ? 'active' : ''}`} onClick={() => setTab('projects')}>🏠 Projets</button>
        </div>
        <header className="admin-header">
          <h1>{tab === 'artisans' ? 'Inscriptions Artisans' : 'Projets Particuliers'}</h1>
        </header>

        {/* ── ARTISANS TAB ── */}
        {tab === 'artisans' && (
          <>
            {regStats && (
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <span className="admin-stat-value">{regStats.total}</span>
                  <span className="admin-stat-label">Total inscrits</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-value">{statCount(regStats, 'status', 'new')}</span>
                  <span className="admin-stat-label">Nouveaux</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-value">{statCount(regStats, 'status', 'contacted')}</span>
                  <span className="admin-stat-label">Contactés</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-value">{statCount(regStats, 'status', 'converted')}</span>
                  <span className="admin-stat-label">Convertis</span>
                </div>
                <div className="admin-stat-card admin-stat-card--plan">
                  <span className="admin-stat-value">{regStats.byPlan?.find((p) => p._id === 'premium')?.count || 0}</span>
                  <span className="admin-stat-label">Pack Premium</span>
                </div>
                <div className="admin-stat-card admin-stat-card--plan">
                  <span className="admin-stat-value">{regStats.byPlan?.find((p) => p._id === 'silver')?.count || 0}</span>
                  <span className="admin-stat-label">Pack Silver</span>
                </div>
                <div className="admin-stat-card admin-stat-card--plan">
                  <span className="admin-stat-value">{regStats.byPlan?.find((p) => p._id === 'horizon')?.count || 0}</span>
                  <span className="admin-stat-label">Pack Horizon</span>
                </div>
              </div>
            )}

            <div className="admin-filters">
              <input className="admin-search" placeholder="Rechercher (nom, email, entreprise…)" value={regFilters.search}
                onChange={(e) => setRegFilters((p) => ({ ...p, search: e.target.value }))} />
              <select value={regFilters.status} onChange={(e) => setRegFilters((p) => ({ ...p, status: e.target.value }))}>
                <option value="">Tous les statuts</option>
                {Object.entries(REGISTRATION_STATUSES).map(([val, { label }]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
              <select value={regFilters.plan} onChange={(e) => setRegFilters((p) => ({ ...p, plan: e.target.value }))}>
                <option value="">Tous les packs</option>
                <option value="horizon">Horizon</option>
                <option value="silver">Silver</option>
                <option value="premium">Premium</option>
              </select>
              <button
                className={`btn ${regFilters.expired ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setRegFilters((p) => ({ ...p, expired: !p.expired }))}
              >
                ⚠ Expirés seulement
              </button>
              <button className="btn btn-outline" onClick={loadRegistrations}>Actualiser</button>
            </div>

            <div className="admin-table-wrapper">
              {regLoading ? <div className="admin-loading">Chargement…</div>
                : registrations.length === 0 ? <div className="admin-empty">Aucune inscription trouvée.</div>
                : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Entreprise</th><th>Nom</th><th>Email</th><th>Téléphone</th>
                        <th>Métier</th><th>Pack</th><th>Statut</th><th>Renouvellement</th><th>Prochain projet</th><th>Portail</th><th>Inscription</th><th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations
                        .filter((r) => regFilters.expired ? new Date(r.renewsAt) < new Date() : true)
                        .map((r) => {
                        const renewsAt = new Date(r.renewsAt);
                        const expired = renewsAt < new Date();
                        return (
                        <tr key={r._id}>
                          <td><strong>{r.company}</strong></td>
                          <td>{r.firstName} {r.lastName}</td>
                          <td><a href={`mailto:${r.email}`}>{r.email}</a></td>
                          <td>{r.phone}</td>
                          <td>{TRADES_FR[r.trade] || r.trade}</td>
                          <td>
                            <span className={`plan-badge plan-badge--${r.plan}`}>
                              {r.plan === 'premium' ? 'Premium' : r.plan === 'silver' ? 'Silver' : 'Horizon'}
                            </span>
                          </td>
                          <td>
                            <select className={`status-select ${REGISTRATION_STATUSES[r.status]?.className}`}
                              value={r.status} onChange={(e) => handleRegStatusChange(r._id, e.target.value)}>
                              {Object.entries(REGISTRATION_STATUSES).map(([val, { label }]) => (
                                <option key={val} value={val}>{label}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <span className={expired ? 'renewal-expired' : 'renewal-active'}>
                              {expired ? '⚠ Expiré' : '✓'} {renewsAt.toLocaleDateString('fr-FR')}
                            </span>
                            <button className="admin-renew-btn" onClick={() => handleRenew(r._id)} title="Renouveler +1 an">
                              ↻ +1 an
                            </button>
                          </td>
                          <td>
                            {(() => {
                              const account = artisanAccounts.find((a) => a.registration?._id === r._id);
                              if (!account?.nextProjectDate) return <span style={{ color: 'var(--color-gray)', fontSize: '0.82rem' }}>—</span>;
                              const d = new Date(account.nextProjectDate);
                              const isPast = d < new Date();
                              return (
                                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: isPast ? '#dc2626' : '#059669' }}>
                                  {isPast ? '⚠ ' : '📅 '}{d.toLocaleDateString('fr-FR')}
                                </span>
                              );
                            })()}
                          </td>
                          <td>
                            {(() => {
                              const account = artisanAccounts.find((a) => a.registration?._id === r._id);
                              return account ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                  <span className="portal-active-badge">✓ Compte créé</span>
                                  <span style={{ fontSize: '0.78rem', color: 'var(--color-gray)' }}>{account.email}</span>
                                  <button
                                    className="admin-create-btn"
                                    onClick={() => { setEditModal({ artisanId: account._id, currentEmail: account.email }); setEditForm({ email: account.email, password: '' }); }}
                                  >
                                    ✏ Modifier
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="admin-create-btn"
                                  onClick={() => { setCreateModal(r._id); setCreateForm({ email: r.email, password: '' }); }}
                                >
                                  + Créer compte
                                </button>
                              );
                            })()}
                          </td>
                          <td>{new Date(r.createdAt).toLocaleDateString('fr-FR')}</td>
                          <td><button className="admin-delete-btn" onClick={() => handleRegDelete(r._id)}>🗑</button></td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
            </div>
          </>
        )}

        {/* ── PROJECTS TAB ── */}
        {tab === 'projects' && (
          <>
            {projStats && (
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <span className="admin-stat-value">{projStats.total}</span>
                  <span className="admin-stat-label">Total projets</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-value">{statCount(projStats, 'status', 'new')}</span>
                  <span className="admin-stat-label">Nouveaux</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-value">{statCount(projStats, 'status', 'processing')}</span>
                  <span className="admin-stat-label">En cours</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-value">{statCount(projStats, 'status', 'matched')}</span>
                  <span className="admin-stat-label">Mis en relation</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-value">{statCount(projStats, 'status', 'completed')}</span>
                  <span className="admin-stat-label">Terminés</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-value">{statCount(projStats, 'status', 'cancelled')}</span>
                  <span className="admin-stat-label">Annulés</span>
                </div>
              </div>
            )}

            <div className="admin-filters">
              <input className="admin-search" placeholder="Rechercher (nom, email, description…)" value={projFilters.search}
                onChange={(e) => setProjFilters((p) => ({ ...p, search: e.target.value }))} />
              <select value={projFilters.status} onChange={(e) => setProjFilters((p) => ({ ...p, status: e.target.value }))}>
                <option value="">Tous les statuts</option>
                {Object.entries(PROJECT_STATUSES).map(([val, { label }]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
              <select value={projFilters.trade} onChange={(e) => setProjFilters((p) => ({ ...p, trade: e.target.value }))}>
                <option value="">Tous les métiers</option>
                {Object.entries(TRADES_FR).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
              <button className="btn btn-outline" onClick={loadProjects}>Actualiser</button>
            </div>

            <div className="admin-table-wrapper">
              {projLoading ? <div className="admin-loading">Chargement…</div>
                : projects.length === 0 ? <div className="admin-empty">Aucun projet trouvé.</div>
                : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Nom</th><th>Email</th><th>Téléphone</th><th>Code postal</th>
                        <th>Travaux</th><th>Budget</th><th>Description</th><th>Assigné à</th><th>Statut</th><th>Date</th><th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((p) => (
                        <tr key={p._id}>
                          <td><strong>{p.name}</strong></td>
                          <td><a href={`mailto:${p.email}`}>{p.email}</a></td>
                          <td>{p.phone}</td>
                          <td>{p.postalCode}</td>
                          <td>{TRADES_FR[p.trade] || p.trade}</td>
                          <td>{p.budget || '—'}</td>
                          <td className="admin-desc-cell" title={p.description}>
                            {p.description.length > 60 ? p.description.slice(0, 60) + '…' : p.description}
                          </td>
                          <td>
                            <select
                              className="assign-select"
                              value={p.assignedTo?._id || p.assignedTo || ''}
                              onChange={(e) => handleAssign(p._id, e.target.value || null)}
                            >
                              <option value="">— Non assigné —</option>
                              {artisanAccounts.filter((a) => a.registration).map((a) => (
                                <option key={a._id} value={a._id}>
                                  {a.registration.company || a.email}
                                  {a.registration.plan ? ` — ${a.registration.plan === 'premium' ? 'Premium' : a.registration.plan === 'silver' ? 'Silver' : 'Horizon'}` : ''}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select className={`status-select ${PROJECT_STATUSES[p.status]?.className}`}
                              value={p.status} onChange={(e) => handleProjStatusChange(p._id, e.target.value)}>
                              {Object.entries(PROJECT_STATUSES).map(([val, { label }]) => (
                                <option key={val} value={val}>{label}</option>
                              ))}
                            </select>
                          </td>
                          <td>{new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
                          <td><button className="admin-delete-btn" onClick={() => handleProjDelete(p._id)}>🗑</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>
          </>
        )}
      </div>

      {/* Create account modal */}
      {createModal && (
        <div className="modal-overlay" onClick={() => setCreateModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Créer un compte artisan</h2>
            <p>Les identifiants seront à transmettre manuellement à l'artisan.</p>
            {createError && <div className="admin-error">{createError}</div>}
            <form onSubmit={handleCreateAccount}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={createForm.email}
                  onChange={(e) => setCreateForm((p) => ({ ...p, email: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Mot de passe temporaire</label>
                <input type="text" value={createForm.password}
                  onChange={(e) => setCreateForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="ex: Artisan2024!" required />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="submit" className="btn btn-primary">Créer le compte</button>
                <button type="button" className="btn btn-outline" onClick={() => setCreateModal(null)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Credentials display after create */}
      {createdCredentials && (
        <div className="modal-overlay" onClick={() => setCreatedCredentials(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>✅ Compte créé</h2>
            <p>Transmettez ces identifiants à l'artisan. Ils ne seront plus affichés après fermeture.</p>
            <div className="credentials-box">
              <div className="credentials-row">
                <span className="credentials-label">Email</span>
                <span className="credentials-value">{createdCredentials.email}</span>
                <button className="copy-btn" onClick={() => copyToClipboard(createdCredentials.email, 'email')}>
                  {copied === 'email' ? '✓ Copié' : 'Copier'}
                </button>
              </div>
              <div className="credentials-row">
                <span className="credentials-label">Mot de passe</span>
                <span className="credentials-value">{createdCredentials.password}</span>
                <button className="copy-btn" onClick={() => copyToClipboard(createdCredentials.password, 'pass')}>
                  {copied === 'pass' ? '✓ Copié' : 'Copier'}
                </button>
              </div>
              <button
                className="copy-btn copy-btn--all"
                onClick={() => copyToClipboard(`Email: ${createdCredentials.email}\nMot de passe: ${createdCredentials.password}`, 'all')}
              >
                {copied === 'all' ? '✓ Tout copié' : '📋 Tout copier'}
              </button>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
              onClick={() => setCreatedCredentials(null)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Edit credentials modal */}
      {editModal && (
        <div className="modal-overlay" onClick={() => setEditModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>✏ Modifier les identifiants</h2>
            <p>Laissez le mot de passe vide pour le conserver. Le nouvel identifiant sera à retransmettre à l'artisan.</p>
            {editError && <div className="admin-error">{editError}</div>}
            <form onSubmit={handleEditCredentials}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={editForm.email}
                  onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Nouveau mot de passe</label>
                <input type="text" value={editForm.password}
                  onChange={(e) => setEditForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="Laisser vide pour ne pas changer" />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
                <button type="button" className="btn btn-outline" onClick={() => setEditModal(null)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin settings modal */}
      {settingsOpen && (
        <div className="modal-overlay" onClick={() => setSettingsOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>⚙ Mes identifiants</h2>
            <p>Laissez un champ vide pour ne pas le modifier. Le mot de passe actuel est toujours requis.</p>
            {settingsError && <div className="admin-error">{settingsError}</div>}
            {settingsSuccess && <div className="admin-success">{settingsSuccess}</div>}
            <form onSubmit={handleSettingsSave}>
              <div className="form-group">
                <label>Mot de passe actuel <span style={{ color: 'red' }}>*</span></label>
                <input type="password" placeholder="Requis pour valider les modifications"
                  value={settingsForm.currentPassword}
                  onChange={(e) => setSettingsForm((p) => ({ ...p, currentPassword: e.target.value }))}
                  required />
              </div>
              <div className="form-group">
                <label>Nouvel email (optionnel)</label>
                <input type="email" placeholder={admin?.email}
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm((p) => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Nouveau mot de passe (optionnel)</label>
                <input type="password" placeholder="Laisser vide pour ne pas changer"
                  value={settingsForm.newPassword}
                  onChange={(e) => setSettingsForm((p) => ({ ...p, newPassword: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Confirmer le nouveau mot de passe</label>
                <input type="password" placeholder="Confirmer"
                  value={settingsForm.confirmPassword}
                  onChange={(e) => setSettingsForm((p) => ({ ...p, confirmPassword: e.target.value }))} />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
                <button type="button" className="btn btn-outline" onClick={() => setSettingsOpen(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Credentials display after update */}
      {updatedCredentials && (
        <div className="modal-overlay" onClick={() => setUpdatedCredentials(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>✅ Identifiants mis à jour</h2>
            <p>Retransmettez les nouveaux identifiants à l'artisan.</p>
            <div className="credentials-box">
              <div className="credentials-row">
                <span className="credentials-label">Email</span>
                <span className="credentials-value">{updatedCredentials.email}</span>
                <button className="copy-btn" onClick={() => copyToClipboard(updatedCredentials.email, 'u-email')}>
                  {copied === 'u-email' ? '✓ Copié' : 'Copier'}
                </button>
              </div>
              <div className="credentials-row">
                <span className="credentials-label">Mot de passe</span>
                <span className="credentials-value">{updatedCredentials.password}</span>
                <button className="copy-btn" onClick={() => copyToClipboard(updatedCredentials.password, 'u-pass')}>
                  {copied === 'u-pass' ? '✓ Copié' : 'Copier'}
                </button>
              </div>
              <button
                className="copy-btn copy-btn--all"
                onClick={() => copyToClipboard(`Email: ${updatedCredentials.email}\nMot de passe: ${updatedCredentials.password}`, 'u-all')}
              >
                {copied === 'u-all' ? '✓ Tout copié' : '📋 Tout copier'}
              </button>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
              onClick={() => setUpdatedCredentials(null)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
