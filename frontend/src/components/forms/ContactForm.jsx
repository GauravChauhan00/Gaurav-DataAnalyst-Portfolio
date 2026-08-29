import { useState } from 'react';
import { Send, MailCheck, AlertCircle, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '../../config/apiConfig';
import { validateContactForm } from '../../utils/validators';

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleDirectEmail = () => {
    const subject = encodeURIComponent(values.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`);
    window.location.href = `mailto:gaurav949855@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);
    setStatus({ type: '', message: '' });

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Something went wrong while submitting the form.');
      }

      setStatus({ 
        type: 'success', 
        message: data.message || 'Message sent successfully! I have received your inquiry and will get back to you soon.' 
      });
      setValues(initialValues);
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          'Could not reach the automated API server. You can send your message directly via email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" value={values.name} onChange={handleChange} placeholder="Your full name" />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" value={values.email} onChange={handleChange} placeholder="your@email.com" />
          {errors.email && <small>{errors.email}</small>}
        </label>
      </div>
      <label>
        <span>Subject</span>
        <input name="subject" value={values.subject} onChange={handleChange} placeholder="Freelance work, job opportunity, internship, collaboration..." />
        {errors.subject && <small>{errors.subject}</small>}
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" value={values.message} onChange={handleChange} rows="6" placeholder="Tell me about your project, role, collaboration, or opportunity." />
        {errors.message && <small>{errors.message}</small>}
      </label>

      {status.message && (
        <div className={`form-status form-status--${status.type}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {status.type === 'success' ? <MailCheck size={18} /> : <AlertCircle size={18} />}
            <span>{status.message}</span>
          </div>
          {status.type === 'error' && (
            <button
              type="button"
              onClick={handleDirectEmail}
              className="btn btn--secondary"
              style={{ alignSelf: 'flex-start', marginTop: '4px', fontSize: '0.85rem', padding: '6px 14px' }}
            >
              <ExternalLink size={14} /> Open in Email App (gaurav949855@gmail.com)
            </button>
          )}
        </div>
      )}

      <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
        <Send size={18} /> {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
