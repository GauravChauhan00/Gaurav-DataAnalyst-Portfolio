import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import AnimatedButton from '../components/common/AnimatedButton';
import HeroScene from '../three/HeroScene';
import { personalInfo } from '../data/personalInfo';
import { socialLinks } from '../data/socialLinks';

export default function Hero() {
  return (
    <section id="home" className="hero section-shell">
      <div className="hero__background">
        <span />
        <span />
        <span />
      </div>
      <div className="hero__grid">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="hero__kicker"><span className="hero__prompt">$</span> Data Analyst & Full-Stack Developer</p>
          <h1>
            {personalInfo.displayName}
            <span>{personalInfo.heroRole}</span>
          </h1>
          <p className="hero__headline">{personalInfo.headline}</p>
          <p className="hero__intro">{personalInfo.availabilityDetails}</p>
          <div className="hero__actions">
            <AnimatedButton href="#projects">
              View Projects <ArrowRight size={18} />
            </AnimatedButton>
            <AnimatedButton href={personalInfo.resumePath} variant="secondary" download>
              <Download size={18} /> Download Resume
            </AnimatedButton>
            <AnimatedButton href="#contact" variant="ghost">
              <Mail size={18} /> Contact Me
            </AnimatedButton>
          </div>
          <div className="hero__socials">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" aria-label={link.label}>
                  <Icon size={18} /> {link.label}
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.12 }}
        >
          <HeroScene />
          <div className="terminal-card">
            <div className="terminal-card__bar">
              <span />
              <span />
              <span />
            </div>
            <code>
              <span><span className="token-keyword">const</span> profile = {'{'}</span>
              <span>  role: <span className="token-string">'analyst + developer'</span>,</span>
              <span>  focus: <span className="token-string">'clean data + reliable systems'</span>,</span>
              <span>  status: <span className="token-string token-string--highlight">'open_to_work'</span> <span className="token-comment">// active</span></span>
              <span>{'}'}</span>
            </code>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
