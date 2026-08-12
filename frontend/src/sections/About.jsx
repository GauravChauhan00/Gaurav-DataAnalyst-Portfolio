import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { personalInfo } from '../data/personalInfo';

export default function About() {
  return (
    <section id="about" className="section-shell about section-pad">
      <SectionHeader
        eyebrow="About Me"
        title="A data-quality minded analyst with web development skills."
        description="Clean reporting, reliable validation, and polished digital experiences — that is the direction of this portfolio."
      />
      
      <motion.div 
        className="about-card-premium"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="about-card-premium__header">
          <div className="about-card-premium__avatar-box">
            <img src={personalInfo.profilePhoto} alt={personalInfo.shortName} />
            <span className="about-card-premium__status-dot" />
          </div>
          <div className="about-card-premium__title-group">
            <h3>{personalInfo.displayName}</h3>
            <span className="about-card-premium__role">{personalInfo.title}</span>
          </div>
        </div>
        
        <div className="about-card-premium__body">
          {personalInfo.about.map((paragraph) => (
            <p key={paragraph} className="about-card-premium__text">{paragraph}</p>
          ))}
        </div>
        
        <div className="about-card-premium__footer">
          <div className="about-card-premium__facts-row">
            {personalInfo.quickFacts.map((fact) => (
              <div key={fact} className="about-fact-pill">
                <CheckCircle2 size={12} className="about-fact-pill__icon" />
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
