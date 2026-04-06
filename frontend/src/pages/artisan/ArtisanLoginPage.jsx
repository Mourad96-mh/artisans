import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArtisanAuth } from '../../context/ArtisanAuthContext';

export default function ArtisanLoginPage() {
  const { login } = useArtisanAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExpired(false);
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/artisan/dashboard');
    } catch (err) {
      if (err.expired) setExpired(true);
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo"><img src="/logo.png" alt="Réseau Artisans" style={{ height: '64px', width: 'auto' }} /></div>
        <h1>Espace Artisan</h1>
        <p>Accédez à vos projets et à votre abonnement</p>

        {expired && (
          <div className="expired-notice">
            <strong>⚠ Abonnement expiré</strong>
            <p>Votre accès a été suspendu. Contactez-nous pour renouveler votre abonnement.</p>
            <a href="mailto:contact@reseauxartizano.com">contact@reseauxartizano.com</a>
          </div>
        )}
        {error && <div className="admin-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="votre@email.fr"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary admin-login-btn" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
