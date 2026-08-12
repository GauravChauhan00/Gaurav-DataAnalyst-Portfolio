import { motion } from 'framer-motion';
import { BarChart3, Database, Globe, Cpu, CheckSquare, Wrench } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { technicalSkills } from '../data/skills';

const categoryIcons = {
  'Analytics & BI': BarChart3,
  'Database & Programming': Database,
  'Frontend Development': Globe,
  'Backend & APIs': Cpu,
  'Tools & Workflow': Wrench,
  'QA & Data Quality': CheckSquare
};

const categoryColors = {
  'Analytics & BI': 'var(--color-analytics)',
  'Database & Programming': 'var(--color-db)',
  'Frontend Development': 'var(--color-frontend)',
  'Backend & APIs': 'var(--color-backend)',
  'Tools & Workflow': 'var(--color-tools)',
  'QA & Data Quality': 'var(--color-qa)'
};

export default function TechnicalSkills() {
  return (
    <section id="skills" className="section-shell section-pad">
      <SectionHeader
        eyebrow="Technical Stack"
        title="Tools & Technologies"
        description="A list of technical skills grouped by execution layer, sorted by text length."
      />
      
      <div className="skills-grid-symmetric">
        {technicalSkills.map((group, index) => {
          const Icon = categoryIcons[group.category] || Database;
          const color = categoryColors[group.category] || 'var(--primary)';
          
          return (
            <motion.div 
              key={group.category} 
              className="skill-card-compact"
              style={{ '--cat-color': color }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <div className="skill-card-compact__header">
                <div className="skill-card-compact__icon-box">
                  <Icon size={14} />
                </div>
                <h3>{group.category}</h3>
              </div>
              
              <div className="skill-card-compact__badges">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-chip-compact">
                    <span className="skill-chip-compact__dot" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
