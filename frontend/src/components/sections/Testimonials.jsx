import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const artisanTestimonials = [
  {
    text: {
      fr: "Grâce à RéseauArtisans, j'ai multiplié mon chiffre d'affaires par 3 en seulement 6 mois. Les projets sont vraiment qualifiés et les clients sérieux.",
      en: "Thanks to RéseauArtisans, I tripled my revenue in just 6 months. The projects are genuinely qualified and the clients are serious.",
    },
    name: 'Mohamed B.',
    role: { fr: 'Plombier, Lyon', en: 'Plumber, Lyon' },
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    text: {
      fr: "Le support est réactif et les leads sont de qualité. Je recommande à tous les artisans qui veulent développer leur activité rapidement.",
      en: "The support is responsive and the leads are quality. I recommend it to any tradesperson who wants to grow their business quickly.",
    },
    name: 'Sophie L.',
    role: { fr: 'Électricienne, Paris', en: 'Electrician, Paris' },
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    text: {
      fr: "La plateforme est simple à utiliser et les projets arrivent régulièrement. C'est un vrai gain de temps pour trouver des clients.",
      en: "The platform is easy to use and projects come in regularly. It's a real time saver for finding clients.",
    },
    name: 'Karim A.',
    role: { fr: 'Peintre, Marseille', en: 'Painter, Marseille' },
    photo: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    text: {
      fr: "Avant, je passais des heures à chercher des chantiers. Maintenant les projets viennent à moi. Mon agenda est plein à 3 semaines !",
      en: "Before, I spent hours looking for jobs. Now projects come to me. My schedule is booked 3 weeks out!",
    },
    name: 'Julien F.',
    role: { fr: 'Menuisier, Nantes', en: 'Carpenter, Nantes' },
    photo: 'https://randomuser.me/api/portraits/men/18.jpg',
  },
  {
    text: {
      fr: "J'apprécie la transparence sur les projets avant d'accepter. On sait exactement ce qu'on fait et le client est déjà briefé. Très professionnel.",
      en: "I appreciate the transparency on projects before accepting. You know exactly what you're doing and the client is already briefed. Very professional.",
    },
    name: 'Fatima O.',
    role: { fr: 'Carreleur, Strasbourg', en: 'Tiler, Strasbourg' },
    photo: 'https://randomuser.me/api/portraits/women/55.jpg',
  },
  {
    text: {
      fr: "Les clients via ce réseau sont sérieux et respectueux. Pas de pertes de temps, les chantiers se passent bien et les paiements sont ponctuels.",
      en: "Clients through this network are serious and respectful. No time wasted, jobs go smoothly and payments are on time.",
    },
    name: 'David M.',
    role: { fr: 'Couvreur, Lille', en: 'Roofer, Lille' },
    photo: 'https://randomuser.me/api/portraits/men/61.jpg',
  },
];

const clientTestimonials = [
  {
    text: {
      fr: "J'ai trouvé un excellent maçon en moins de 24h. Le projet a été réalisé dans les délais et le budget prévu. Vraiment impressionnant !",
      en: "I found an excellent mason in under 24 hours. The project was completed on time and on budget. Truly impressive!",
    },
    name: 'Claire D.',
    role: { fr: 'Propriétaire, Bordeaux', en: 'Homeowner, Bordeaux' },
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    text: {
      fr: "Le processus est très rassurant : les artisans sont vérifiés, les devis sont clairs et le paiement est sécurisé. Je n'utilise plus que cette plateforme.",
      en: "The process is very reassuring: tradespeople are vetted, quotes are clear and payment is secure. This is the only platform I use now.",
    },
    name: 'Thomas R.',
    role: { fr: "Gérant d'immeuble, Paris", en: 'Building Manager, Paris' },
    photo: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    text: {
      fr: "Rénovation de salle de bain terminée en une semaine. L'artisan était ponctuel, propre et professionnel. Je recommande vivement.",
      en: "Bathroom renovation done in one week. The tradesperson was punctual, tidy and professional. Highly recommend.",
    },
    name: 'Nadia M.',
    role: { fr: 'Particulier, Toulouse', en: 'Homeowner, Toulouse' },
    photo: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  {
    text: {
      fr: "J'ai utilisé d'autres plateformes avant, mais ici les artisans sont vraiment sélectionnés. La qualité du travail était irréprochable.",
      en: "I've used other platforms before, but here the tradespeople are truly vetted. The quality of work was impeccable.",
    },
    name: 'Pierre V.',
    role: { fr: 'Propriétaire bailleur, Lyon', en: 'Landlord, Lyon' },
    photo: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    text: {
      fr: "Devis reçu en 2h, travaux commencés le lendemain. Mon installation électrique est aux normes et j'ai eu une facture claire. Parfait.",
      en: "Quote received in 2 hours, work started the next day. My electrical installation is up to code and I got a clear invoice. Perfect.",
    },
    name: 'Amina K.',
    role: { fr: 'Locataire, Montpellier', en: 'Tenant, Montpellier' },
    photo: 'https://randomuser.me/api/portraits/women/37.jpg',
  },
  {
    text: {
      fr: "Simple, rapide et fiable. J'ai fait appel à deux artisans différents via ce réseau et les deux fois j'ai été pleinement satisfait.",
      en: "Simple, fast and reliable. I've used two different tradespeople through this network and both times I was fully satisfied.",
    },
    name: 'Lucas B.',
    role: { fr: 'Particulier, Nice', en: 'Homeowner, Nice' },
    photo: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
];

const CARDS_PER_PAGE = 3;

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'fr';
  const [activeTab, setActiveTab] = useState('artisans');
  const [index, setIndex] = useState(0);

  const list = activeTab === 'artisans' ? artisanTestimonials : clientTestimonials;
  const total = Math.ceil(list.length / CARDS_PER_PAGE);
  const visible = list.slice(index * CARDS_PER_PAGE, index * CARDS_PER_PAGE + CARDS_PER_PAGE);

  const switchTab = (tab) => { setActiveTab(tab); setIndex(0); };
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-header">
          <h2>{t('testimonials.title')}</h2>
          <p>{t('testimonials.subtitle')}</p>
        </div>

        <div className="testimonials-tabs">
          <button
            className={`tab-btn ${activeTab === 'artisans' ? 'active' : ''}`}
            onClick={() => switchTab('artisans')}
          >
            🔨 {t('testimonials.tabArtisans')}
          </button>
          <button
            className={`tab-btn ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => switchTab('clients')}
          >
            👤 {t('testimonials.tabClients')}
          </button>
        </div>

        <div className="carousel">
          <button className="carousel-arrow carousel-arrow--prev" onClick={prev} aria-label="Previous">
            ‹
          </button>

          <div className="testimonials-grid">
            {visible.map((item, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"{item.text[lang]}"</p>
                <div className="testimonial-author">
                  <img src={item.photo} alt={item.name} className="author-avatar" />
                  <div className="author-info">
                    <strong>{item.name}</strong>
                    <span>{item.role[lang]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-arrow carousel-arrow--next" onClick={next} aria-label="Next">
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
