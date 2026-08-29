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
          <p className="hero__kicker"><span className="hero__prompt">$</span> Data Analyst & BI Engineer | Python • SQL • Power BI • React</p>
          <h1>
            {personalInfo.displayName}
            <span>{personalInfo.heroRole}</span>
          </h1>
          <p className="hero__headline">{personalInfo.headline}</p>
          <p className="hero__intro">{personalInfo.availabilityDetails}</p>
          <div className="hero__actions">
            <AnimatedButton href="#projects">
              View Flagship Projects <ArrowRight size={18} />
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  );
}
