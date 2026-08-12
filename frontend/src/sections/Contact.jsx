import { Mail, MapPin, Send } from 'lucide-react';
import ContactForm from '../components/forms/ContactForm';
import SectionHeader from '../components/common/SectionHeader';
import { personalInfo } from '../data/personalInfo';

export default function Contact() {
  return (
    <section id="contact" className="section-shell section-pad contact">
      <SectionHeader
        eyebrow="Contact"
        title="Let’s talk about work, projects, internships, or collaboration"
        description="The form stores every client/recruiter inquiry in the SQLite database through the backend API."
      />
      <div className="contact__grid">
        <div className="contact__panel glass-card">
          <h3>Best fit opportunities</h3>
          <div className="service-list">
            {personalInfo.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
          <div className="contact__direct">
            <a href={`mailto:${personalInfo.email}`}>
              <Mail size={18} /> {personalInfo.email}
            </a>
            <span>
              <MapPin size={18} /> {personalInfo.location}
            </span>
            <span>
              <span className="status-pulse-dot" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} /> {personalInfo.availability}
            </span>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
