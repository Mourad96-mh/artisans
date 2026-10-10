import { useTranslation } from 'react-i18next';

// All prices are displayed in Canadian dollars, whatever the visitor's country.
const CAD_CURRENCY = { code: 'CAD', symbol: '$ CA' };

export function useCurrency() {
  const { i18n } = useTranslation();
  const currency = CAD_CURRENCY;
  const locale = i18n.language?.startsWith('en') ? 'en-CA' : 'fr-CA';

  // Shows cents only when the price has them: 399 → "399", 239.99 → "239,99" (fr) / "239.99" (en).
  const convert = (price) => {
    if (!price) return price;
    const value = Number(price);
    const hasCents = !Number.isInteger(value);
    return value.toLocaleString(locale, {
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: 2,
    });
  };

  return { currency, convert };
}
