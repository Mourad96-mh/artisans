import { createContext, useContext, useState, useEffect } from 'react';
import { artisanLogin, verifyArtisanToken } from '../services/api';

const ArtisanAuthContext = createContext(null);

export function ArtisanAuthProvider({ children }) {
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('artisan_token');
    if (!token) { setLoading(false); return; }
    verifyArtisanToken()
      .then((data) => setArtisan(data))
      .catch(() => localStorage.removeItem('artisan_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await artisanLogin(email, password);
    localStorage.setItem('artisan_token', data.token);
    setArtisan({ email: data.email });
  };

  const logout = () => {
    localStorage.removeItem('artisan_token');
    setArtisan(null);
  };

  return (
    <ArtisanAuthContext.Provider value={{ artisan, loading, login, logout }}>
      {children}
    </ArtisanAuthContext.Provider>
  );
}

export function useArtisanAuth() {
  return useContext(ArtisanAuthContext);
}
