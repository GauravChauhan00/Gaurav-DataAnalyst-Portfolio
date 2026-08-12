import { personalInfo } from '../../data/personalInfo';
import { socialLinks } from '../../data/socialLinks';

export default function Footer() {
  return (
    <footer className="footer-elite">
      <div className="footer-elite__container">
        
        <div className="footer-elite__left">
          <a className="footer-elite__brand" href="#home">
            <span className="brand-mark">&lt;/&gt;</span>
            <span>{personalInfo.displayName}</span>
          </a>
          <span className="footer-elite__copy">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        
        <nav className="footer-elite__nav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        
        <div className="footer-elite__socials">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a 
                key={link.label} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer" 
                className={`footer-icon-btn footer-icon-btn--${link.label.toLowerCase()}`}
                title={link.label}
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
        
      </div>
    </footer>
  );
}
