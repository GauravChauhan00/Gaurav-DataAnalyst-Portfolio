import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Database, Globe, Cpu, CheckSquare, Wrench } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { technicalSkills } from '../data/skills';

const categoryIcons = {
  'Analytics & BI': BarChart3,
  'Database & Programming': Database,
  'Web Development': Globe,
  'Backend & APIs': Cpu,
  'QA & Data Quality': CheckSquare,
  'Tools & Workflow': Wrench
};

const categoryColors = {
  'Analytics & BI': '#00f0ff',
  'Database & Programming': '#a855f7',
  'Web Development': '#00f0ff',
  'Backend & APIs': '#10b981',
  'QA & Data Quality': '#ec4899',
  'Tools & Workflow': '#f59e0b'
};

export default function TechnicalSkills() {
  const [activeCategory, setActiveCategory] = useState(technicalSkills[0].category);
  const activeGroup = technicalSkills.find(g => g.category === activeCategory) || technicalSkills[0];
  const ActiveIcon = categoryIcons[activeCategory] || Database;
  const activeColor = categoryColors[activeCategory] || '#00f0ff';

  return (
    <section id="skills" className="section-shell section-pad">
      <SectionHeader
        eyebrow="Technical Skills"
        title="Analytics, QA validation, and web development stack"
        description="Select a category to view the sorted technical skills and tools."
      />
      
      <div className="skills-board glass-card">
        {/* Sidebar Tabs */}
        <div className="skills-board__sidebar">
          {technicalSkills.map((group) => {
            const Icon = categoryIcons[group.category] || Database;
            const isActive = group.category === activeCategory;
            return (
              <button
                key={group.category}
                className={`skills-tab-btn ${isActive ? 'skills-tab-btn--active' : ''}`}
                onClick={() => setActiveCategory(group.category)}
              >
                <span className="skills-tab-btn__icon">
                  <Icon size={18} />
                </span>
                <span className="skills-tab-btn__label">{group.category}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="skills-board__content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="skills-detail"
            >
              <div className="skills-detail__header">
                <div 
                  className="skills-detail__icon-wrapper" 
                  style={{ 
                    color: activeColor, 
                    background: `${activeColor}12`,
                    borderColor: `${activeColor}25`
                  }}
                >
                  <ActiveIcon size={20} />
                </div>
                <h2>{activeGroup.category}</h2>
              </div>
              
              <p className="skills-detail__description">{activeGroup.description}</p>
              
              <div className="skills-detail__badges">
                {activeGroup.skills.map((skill) => (
                  <span key={skill} className="skill-badge-new">
                    <span 
                      className="skill-badge-new__dot" 
                      style={{ 
                        background: activeColor,
                        boxShadow: `0 0 8px ${activeColor}`
                      }} 
                    />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
