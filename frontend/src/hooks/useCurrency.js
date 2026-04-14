import { useState, useEffect } from 'react';
import { useCountry } from '../context/CountryContext';

const CAD_CURRENCY = { code: 'CAD', symbol: 'CA$', rate: 1.5 };
const CHF_CURRENCY = { code: 'CHF', symbol: 'CHF', rate: 0.95 };
const EUR_CURRENCY = { code: 'EUR', symbol: '€', rate: 1 };

export function useCurrency() {
  const { selectedCountry } = useCountry();
  const [ipCountry, setIpCountry] = useState(null);

  useEffect(() => {
    fetch('https://api.country.is/')
      .then((res) => res.json())
      .then((data) => setIpCountry(data.country))
      .catch(() => {});
  }, []);

  const isCanada = selectedCountry?.code === 'CA' || ipCountry === 'CA';
  const isSwitzerland = selectedCountry?.code === 'CH' || ipCountry === 'CH';

  const currency = isSwitzerland ? CHF_CURRENCY : isCanada ? CAD_CURRENCY : EUR_CURRENCY;

  const convert = (eurPrice) => {
    if (!eurPrice) return eurPrice;
    return Math.round(Number(eurPrice) * currency.rate);
  };

  return { currency, convert };
}
