import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Sparkles } from 'lucide-react';
import AnimatedButton from '../components/common/AnimatedButton';
import Badge from '../components/common/Badge';
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
          <Badge tone="accent">
            <Sparkles size={14} /> {personalInfo.availability}
          </Badge>
          <p className="hero__kicker">Data Analyst & Full-Stack Developer</p>
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
              <span>const profile = {'{'}</span>
              <span> role: 'analyst + developer',</span>
              <span> focus: 'clean data + reliable systems',</span>
              <span> status: 'open_to_work'</span>
              <span>{'}'}</span>
            </code>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
