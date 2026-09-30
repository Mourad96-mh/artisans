import { createContext, useContext, useState } from 'react';

const CountryContext = createContext(null);

export const countries = [
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
];

export function CountryProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry, countries }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
