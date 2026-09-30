// All prices are displayed in US dollars, whatever the visitor's country.
const USD_CURRENCY = { code: 'USD', symbol: '$' };

export function useCurrency() {
  const currency = USD_CURRENCY;

  const convert = (price) => {
    if (!price) return price;
    return Math.round(Number(price));
  };

  return { currency, convert };
}
