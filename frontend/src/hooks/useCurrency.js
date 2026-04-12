import { useState, useEffect } from 'react';
import { useCountry } from '../context/CountryContext';

const EUR_TO_CAD = 1.5;

const CAD_CURRENCY = { code: 'CAD', symbol: 'CA$', rate: EUR_TO_CAD };
const EUR_CURRENCY = { code: 'EUR', symbol: '€', rate: 1 };

export function useCurrency() {
  const { selectedCountry } = useCountry();
  const [ipCountry, setIpCountry] = useState(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => setIpCountry(data.country_code))
      .catch(() => {});
  }, []);

  const isCanada = selectedCountry?.code === 'CA' || ipCountry === 'CA';
  const currency = isCanada ? CAD_CURRENCY : EUR_CURRENCY;

  const convert = (eurPrice) => {
    if (!eurPrice) return eurPrice;
    return Math.round(Number(eurPrice) * currency.rate);
  };

  return { currency, convert };
}
