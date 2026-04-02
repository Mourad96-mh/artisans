import { useTranslation } from 'react-i18next';

const tradeData = [
  { key: 'plumbing',   icon: '🔧' },
  { key: 'electrical', icon: '⚡' },
  { key: 'painting',   icon: '🖌️' },
  { key: 'masonry',    icon: '🧱' },
  { key: 'carpentry',  icon: '🪵' },
  { key: 'tiling',     icon: '🟫' },
  { key: 'heating',    icon: '🔥' },
  { key: 'hvac',       icon: '❄️' },
  { key: 'renovation', icon: '🏗️' },
  { key: 'insulation', icon: '🧯' },
  { key: 'roofing',    icon: '🏠' },
];

export default function Trades() {
  const { t } = useTranslation();

  // Duplicate items to create a seamless infinite loop
  const items = [...tradeData, ...tradeData];

  return (
    <section className="section trades-section">
      <div className="container">
        <div className="section-header">
          <h2>{t('trades.title')}</h2>
          <p>{t('trades.subtitle')}</p>
        </div>
      </div>

      <div className="trades-marquee-wrapper">
        <div className="trades-marquee">
          {items.map((trade, i) => (
            <div key={i} className="trade-card">
              <span className="trade-icon">{trade.icon}</span>
              <h3>{t(`trades.${trade.key}`)}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <p className="trades-more">{t('trades.more')}</p>
      </div>
    </section>
  );
}
