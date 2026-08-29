import { motion } from 'framer-motion';
import { BarChart3, Database, Globe, Cpu, Wrench } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { technicalSkills } from '../data/skills';

const categoryMeta = {
  'Analytics & Power BI': {
    icon: BarChart3,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.02) 100%)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    tag: 'BI & Reporting'
  },
  'SQL & Databases': {
    icon: Database,
    color: '#0284c7',
    gradient: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(2, 132, 199, 0.02) 100%)',
    borderColor: 'rgba(2, 132, 199, 0.3)',
    tag: 'Querying & Warehousing'
  },
  'Python for Data': {
    icon: Cpu,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.02) 100%)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    tag: 'ETL & Analytics'
  },
  'Frontend Basics': {
    icon: Globe,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.02) 100%)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    tag: 'UI & Dashboards'
  },
  'Tools & Workflow': {
    icon: Wrench,
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.02) 100%)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    tag: 'Workflow & Versioning'
  }
};

function SkillCard({ group, index }) {
  const meta = categoryMeta[group.category] || {
    icon: Database,
    color: 'var(--primary)',
    gradient: 'var(--glass)',
    borderColor: 'var(--border)',
    tag: 'Core'
  };
  const Icon = meta.icon;

  return (
    <motion.div 
      className="premium-skill-card"
      style={{ 
        '--card-accent': meta.color,
        '--card-gradient': meta.gradient,
        '--card-border': meta.borderColor
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="premium-skill-card__glow" />
      
      <div className="premium-skill-card__top">
        <div className="premium-skill-card__icon-wrap">
          <Icon size={20} />
        </div>
        <div className="premium-skill-card__header-info">
          <span className="premium-skill-card__tag">{meta.tag}</span>
          <h3>{group.category}</h3>
        </div>
      </div>

      <p className="premium-skill-card__desc">{group.description}</p>
      
      <div className="premium-skill-card__chips">
        {group.skills.map((skill) => (
          <motion.span 
            key={skill} 
            className="premium-skill-chip"
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <span className="premium-skill-chip__bullet" />
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function TechnicalSkills() {
  const topRowSkills = technicalSkills.slice(0, 3);
  const bottomRowSkills = technicalSkills.slice(3, 5);

  return (
    <section id="skills" className="section-shell section-pad skills-showcase">
      <SectionHeader
        eyebrow="Core Technical Stack"
        title="Tools & Technologies I Work With"
        description="Focused on practical, interview-ready data tools — from database querying and data modeling to interactive dashboards."
      />
      
      <div className="skills-pyramid-container">
        {/* Top Row: 3 Cards */}
        <div className="skills-pyramid-row skills-pyramid-row--top">
          {topRowSkills.map((group, index) => (
            <SkillCard key={group.category} group={group} index={index} />
          ))}
        </div>

        {/* Bottom Row: 2 Cards Centered */}
        <div className="skills-pyramid-row skills-pyramid-row--bottom">
          {bottomRowSkills.map((group, index) => (
            <SkillCard key={group.category} group={group} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
