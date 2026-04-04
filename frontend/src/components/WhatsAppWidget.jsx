import { useState } from 'react';

const WHATSAPP_NUMBER = '212649702619';

const TRADES_FR = {
  plumbing: 'Plomberie',
  electrical: 'Électricité',
  painting: 'Peinture',
  masonry: 'Maçonnerie',
  hvac: 'Climatisation',
  carpentry: 'Menuiserie',
  roofing: 'Toiture',
  tiling: 'Carrelage',
};


const WhatsAppIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ARTISAN_INITIAL = { company: '', firstName: '', lastName: '', email: '', phone: '', postalCode: '', trade: '', comments: '', terms: false };
const CLIENT_INITIAL  = { name: '', postalCode: '', email: '', phone: '', trade: '', description: '', terms: false };

export default function WhatsAppWidget() {
  const [open, setOpen]         = useState(false);
  const [userType, setUserType] = useState('client');
  const [artisan, setArtisan]   = useState(ARTISAN_INITIAL);
  const [client, setClient]     = useState(CLIENT_INITIAL);

  const handleArtisan = (e) => {
    const { name, value, type, checked } = e.target;
    setArtisan((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleClient = (e) => {
    const { name, value, type, checked } = e.target;
    setClient((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleTypeSwitch = (type) => {
    setUserType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let text;
    if (userType === 'artisan') {
      const trade = TRADES_FR[artisan.trade] || artisan.trade;
      text = `Bonjour, je souhaite rejoindre Réseau Artisans.\n`
           + `Entreprise : ${artisan.company}\n`
           + `Nom : ${artisan.firstName} ${artisan.lastName}\n`
           + `Email : ${artisan.email}\n`
           + `Téléphone : ${artisan.phone}\n`
           + `Code postal : ${artisan.postalCode}\n`
           + `Métier : ${trade}`
           + (artisan.comments ? `\nCommentaires : ${artisan.comments}` : '');
    } else {
      const trade  = TRADES_FR[client.trade] || client.trade;
      text = `Bonjour, je cherche un artisan.\n`
           + `Nom : ${client.name}\n`
           + `Code postal : ${client.postalCode}\n`
           + `Email : ${client.email}\n`
           + `Téléphone : ${client.phone}\n`
           + `Type de travaux : ${trade}`
           + (client.description ? `\nProjet : ${client.description}` : '');
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setOpen(false);
    setArtisan(ARTISAN_INITIAL);
    setClient(CLIENT_INITIAL);
  };

  return (
    <>
      <button className="wa-fab" onClick={() => setOpen(true)} aria-label="Contacter via WhatsApp">
        <WhatsAppIcon size={28} />
      </button>

      {open && (
        <div className="wa-overlay" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="wa-modal">
            <button className="wa-modal-close" onClick={() => setOpen(false)}>✕</button>
            <div className="wa-modal-body">
            <div className="wa-modal-header">
              <WhatsAppIcon size={22} />
              <span>Contactez-nous sur WhatsApp</span>
            </div>

            <div className="wa-toggle">
              <button
                type="button"
                className={`wa-toggle-btn ${userType === 'client' ? 'active' : ''}`}
                onClick={() => handleTypeSwitch('client')}
              >
                Je cherche un artisan
              </button>
              <button
                type="button"
                className={`wa-toggle-btn ${userType === 'artisan' ? 'active' : ''}`}
                onClick={() => handleTypeSwitch('artisan')}
              >
                Je suis artisan
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {userType === 'artisan' ? (
                <>
                  <div className="form-group">
                    <label>Nom de l'entreprise</label>
                    <input name="company" value={artisan.company} onChange={handleArtisan} required placeholder="Votre entreprise" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Prénom</label>
                      <input name="firstName" value={artisan.firstName} onChange={handleArtisan} required />
                    </div>
                    <div className="form-group">
                      <label>Nom</label>
                      <input name="lastName" value={artisan.lastName} onChange={handleArtisan} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input name="email" type="email" value={artisan.email} onChange={handleArtisan} required />
                    </div>
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input name="phone" type="tel" value={artisan.phone} onChange={handleArtisan} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Code postal</label>
                      <input name="postalCode" value={artisan.postalCode} onChange={handleArtisan} required placeholder="75000" />
                    </div>
                    <div className="form-group">
                      <label>Métier</label>
                      <select name="trade" value={artisan.trade} onChange={handleArtisan} required>
                        <option value="">Sélectionnez votre métier</option>
                        {Object.entries(TRADES_FR).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Commentaires (optionnel)</label>
                    <textarea name="comments" value={artisan.comments} onChange={handleArtisan} rows={3} />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Votre nom</label>
                    <input name="name" value={client.name} onChange={handleClient} required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Code postal</label>
                      <input name="postalCode" value={client.postalCode} onChange={handleClient} required placeholder="75000" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input name="email" type="email" value={client.email} onChange={handleClient} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input name="phone" type="tel" value={client.phone} onChange={handleClient} required />
                    </div>
                    <div className="form-group">
                      <label>Type de travaux</label>
                      <select name="trade" value={client.trade} onChange={handleClient} required>
                        <option value="">Sélectionnez le type de travaux</option>
                        {Object.entries(TRADES_FR).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Décrivez votre projet</label>
                    <textarea name="description" value={client.description} onChange={handleClient} rows={3} required />
                  </div>
                </>
              )}

              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="terms"
                  checked={userType === 'artisan' ? artisan.terms : client.terms}
                  onChange={userType === 'artisan' ? handleArtisan : handleClient}
                  required
                />
                J'accepte les conditions générales d'utilisation
              </label>

              <button type="submit" className="btn wa-submit-btn">
                <WhatsAppIcon size={18} />
                Envoyer sur WhatsApp
              </button>
            </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
