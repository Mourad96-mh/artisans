import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './i18n';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { ArtisanAuthProvider, useArtisanAuth } from './context/ArtisanAuthContext';
import ArtisanLoginPage from './pages/artisan/ArtisanLoginPage';
import ArtisanDashboardPage from './pages/artisan/ArtisanDashboardPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import DevenirProPage from './pages/DevenirProPage';
import PacksPage from './pages/PacksPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import WhatsAppWidget from './components/WhatsAppWidget';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  if (loading) return null;
  return admin ? children : <Navigate to="/admin/login" replace />;
}

function ArtisanProtectedRoute({ children }) {
  const { artisan, loading } = useArtisanAuth();
  if (loading) return null;
  return artisan ? children : <Navigate to="/artisan/login" replace />;
}

function PublicRoutes() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
          <Route path="/devenir-pro" element={<DevenirProPage />} />
          <Route path="/packs" element={<PacksPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <ArtisanAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
            <Route path="/artisan/login" element={<ArtisanLoginPage />} />
            <Route path="/artisan/dashboard" element={<ArtisanProtectedRoute><ArtisanDashboardPage /></ArtisanProtectedRoute>} />
            <Route path="/*" element={<PublicRoutes />} />
          </Routes>
        </BrowserRouter>
      </ArtisanAuthProvider>
    </AdminAuthProvider>
  );
}
