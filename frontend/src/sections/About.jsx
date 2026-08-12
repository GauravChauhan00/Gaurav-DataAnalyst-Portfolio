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
      
      <div className="about-split">
        
        <motion.div 
          className="about-portrait"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <img src={personalInfo.profilePhoto} alt={personalInfo.shortName} className="about-portrait__img" />
          <div className="about-portrait__overlay">
            <div className="about-portrait__status">
              <span className="status-pulse-dot" />
              <span>Available for projects</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="about-info"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="about-info__bio">
            {personalInfo.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          
          <div className="about-info__facts">
            {personalInfo.quickFacts.map((fact) => (
              <div key={fact} className="about-fact-item">
                <CheckCircle2 size={14} className="about-fact-item__icon" />
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
