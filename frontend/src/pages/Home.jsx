import { motion } from 'framer-motion';
import { pageTransition } from '../animations/pageTransitions';
import About from '../sections/About';
import Certifications from '../sections/Certifications';
import Contact from '../sections/Contact';
import Education from '../sections/Education';
import Experience from '../sections/Experience';
import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import SoftSkills from '../sections/SoftSkills';
import TechnicalSkills from '../sections/TechnicalSkills';

export default function Home() {
  return (
    <motion.main {...pageTransition}>
      <Hero />
      <About />
      <Education />
      <TechnicalSkills />
      <SoftSkills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
    </motion.main>
  );
}
