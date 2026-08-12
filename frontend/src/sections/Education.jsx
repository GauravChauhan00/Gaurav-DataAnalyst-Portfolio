import { motion } from 'framer-motion';
import { education } from '../data/education';
import SectionHeader from '../components/common/SectionHeader';

export default function Education() {
  return (
    <section id="education" className="section-shell section-pad">
      <SectionHeader 
        eyebrow="Education" 
        title="Academic Background" 
        description="A quick overview of my formal engineering and school qualifications." 
      />
      
      <div className="education-list">
        {education.map((item, index) => (
          <motion.div 
            key={`${item.degree}-${index}`} 
            className="education-row"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <div className="education-row__main">
              <h3>{item.degree}</h3>
              <span className="education-row__inst">{item.institution}</span>
            </div>
            
            <div className="education-row__meta">
              <span className="education-row__score">{item.score}</span>
              <span className="education-row__date">{item.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
