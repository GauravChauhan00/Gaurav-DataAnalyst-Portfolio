import { personalInfo } from '../../data/personalInfo';
import { socialLinks } from '../../data/socialLinks';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand-block">
          <a className="footer__brand" href="#home">
            <span className="brand-mark">&lt;/&gt;</span>
            <span>{personalInfo.displayName}</span>
          </a>
          <p className="footer__sig">{personalInfo.signature}</p>
        </div>
        
        <div className="footer__links-block">
          <div className="footer__links-group">
            <h4>Explore</h4>
            <div className="footer__links-row">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          
          <div className="footer__links-group">
            <h4>Connect</h4>
            <div className="footer__links-row">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {personalInfo.shortName}. All rights reserved.</span>
      </div>
    </footer>
  );
}
