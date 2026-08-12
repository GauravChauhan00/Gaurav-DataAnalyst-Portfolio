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
  'Analytics & BI': '#00f0ff',
  'Database & Programming': '#a855f7',
  'Frontend Development': '#00f0ff',
  'Backend & APIs': '#10b981',
  'Tools & Workflow': '#f59e0b',
  'QA & Data Quality': '#ec4899'
};

export default function TechnicalSkills() {
  return (
    <section id="skills" className="section-shell section-pad">
      <SectionHeader
        eyebrow="Technical Stack"
        title="Tools & Technologies"
        description="A list of technical skills grouped by execution layer, sorted by text length."
      />
      
      <div className="skills-masonry">
        {technicalSkills.map((group, index) => {
          const Icon = categoryIcons[group.category] || Database;
          const color = categoryColors[group.category] || '#00f0ff';
          
          return (
            <motion.div 
              key={group.category} 
              className="skill-card-compact"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <div className="skill-card-compact__header">
                <div className="skill-card-compact__icon-box" style={{ color: color, background: `${color}12` }}>
                  <Icon size={14} />
                </div>
                <h3>{group.category}</h3>
              </div>
              
              <div className="skill-card-compact__badges">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-chip-compact">
                    <span 
                      className="skill-chip-compact__dot" 
                      style={{ 
                        background: color,
                        boxShadow: `0 0 6px ${color}`
                      }} 
                    />
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
