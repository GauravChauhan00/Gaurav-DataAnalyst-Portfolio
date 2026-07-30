import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import SmoothScroll from './components/layout/SmoothScroll';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/ProjectDetail';
import { API_BASE_URL } from './config/apiConfig';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) return savedTheme;
  return 'light';
};

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      const hasVisited = sessionStorage.getItem('visited_portfolio_session');
      if (!hasVisited) {
        sessionStorage.setItem('visited_portfolio_session', 'true');
        fetch(`${API_BASE_URL}/api/analytics/visit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || 'Direct',
            screen: `${window.screen.width}x${window.screen.height}`
          })
        }).catch(() => {});
      }
    } catch (e) {
      // Ignore quota/storage errors
    }
  }, []);

  return (
    <div className="app-shell">
      <SmoothScroll />
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
