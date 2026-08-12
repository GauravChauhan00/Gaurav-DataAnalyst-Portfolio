import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { personalInfo } from '../../data/personalInfo';
import ThemeToggle from '../common/ThemeToggle';

export default function Navbar({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setIsOpen(false);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    close();
    const sectionId = href.replace('#', '');
    // If not on the home page, navigate home first, then scroll
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for home page to mount, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <a className="navbar__brand" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); close(); }}>
        <span className="brand-mark">&lt;/&gt;</span>
        <span>{personalInfo.displayName}</span>
        <span className="navbar__status">
          <span className="status-pulse-dot" />
          <span className="navbar__status-text">{personalInfo.availability}</span>
        </span>
      </a>

      <nav className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
        {siteConfig.navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
            {link.label}
          </a>
        ))}
        <a className="navbar__resume" href={personalInfo.resumePath} download onClick={close}>
          Resume
        </a>
      </nav>

      <div className="navbar__actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button className="navbar__menu" type="button" onClick={() => setIsOpen((value) => !value)} aria-label="Open navigation menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
