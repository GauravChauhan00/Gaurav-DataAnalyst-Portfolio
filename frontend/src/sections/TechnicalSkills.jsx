import { motion } from 'framer-motion';
import { BarChart3, Database, Globe, Cpu, CheckSquare, Wrench } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { technicalSkills } from '../data/skills';

const categoryIcons = {
  'Analytics & BI': BarChart3,
  'Database & Programming': Database,
  'Frontend Development': Globe,
  'Backend & APIs': Cpu,
  'QA & Data Quality': CheckSquare,
  'Tools & Workflow': Wrench
};

const categoryColors = {
  'Analytics & BI': '#00f0ff',
  'Database & Programming': '#a855f7',
  'Frontend Development': '#00f0ff',
  'Backend & APIs': '#10b981',
  'QA & Data Quality': '#ec4899',
  'Tools & Workflow': '#f59e0b'
};

export default function TechnicalSkills() {
  return (
    <section id="skills" className="section-shell section-pad">
      <SectionHeader
        eyebrow="Technical Stack"
        title="Tools & Technologies"
        description="A list of technical skills grouped by execution layer, sorted by text length."
      />
      
      <div className="skills-showcase">
        {technicalSkills.map((group, index) => {
          const Icon = categoryIcons[group.category] || Database;
          const color = categoryColors[group.category] || '#00f0ff';
          
          return (
            <motion.div 
              key={group.category}
              className="skills-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
            >
              {/* Row Left: Index & Meta */}
              <div className="skills-row__meta">
                <span className="skills-row__index">/0{index + 1}</span>
                <div className="skills-row__title-wrap">
                  <div className="skills-row__icon-box" style={{ color: color, background: `${color}12` }}>
                    <Icon size={15} />
                  </div>
                  <h3>{group.category}</h3>
                </div>
                <p className="skills-row__desc">{group.description}</p>
              </div>

              {/* Row Right: Skills Chips */}
              <div className="skills-row__badges">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    <span 
                      className="skill-chip__dot" 
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
