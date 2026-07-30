import { useMemo, useState } from 'react';
import { Award, Layers } from 'lucide-react';
import CertificateCard from '../components/cards/CertificateCard';
import CourseBundleCard from '../components/cards/CourseBundleCard';
import SectionHeader from '../components/common/SectionHeader';
import CertificateModal from '../components/modals/CertificateModal';
import CourseCertificateModal from '../components/modals/CourseCertificateModal';
import { certificateCategories, courseBundles, singleCertificates } from '../data/certificates';
import { normalizeText } from '../utils/helpers';

export default function Certifications() {
  const [activeTab, setActiveTab] = useState('bundles'); // 'bundles' or 'singles'
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedOrg, setSelectedOrg] = useState('All Organizations');
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeBundle, setActiveBundle] = useState(null);
  const [lastOpenBundle, setLastOpenBundle] = useState(null);

  // Total courses helper
  const totalBundleCourses = useMemo(() => {
    return courseBundles.reduce((acc, curr) => acc + curr.totalCertificates, 0);
  }, []);

  // Compute list of organizations with counts for active tab
  const organizationList = useMemo(() => {
    const list = activeTab === 'bundles' ? courseBundles : singleCertificates;
    const counts = {};
    list.forEach((item) => {
      const org = item.organization || item.issuer || 'Other';
      counts[org] = (counts[org] || 0) + 1;
    });
    const sortedOrgs = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    return [
      { name: 'All Organizations', count: list.length },
      ...sortedOrgs.map((org) => ({ name: org, count: counts[org] }))
    ];
  }, [activeTab]);

  const filteredSingles = useMemo(() => {
    const q = normalizeText(query);
    return singleCertificates.filter((certificate) => {
      const org = certificate.organization || certificate.issuer || 'Other';
      const matchesQuery = !q || normalizeText(`${certificate.title} ${org} ${certificate.category}`).includes(q);
      const matchesCategory = category === 'All' || certificate.category === category;
      const matchesOrg = selectedOrg === 'All Organizations' || org === selectedOrg;
      return matchesQuery && matchesCategory && matchesOrg;
    });
  }, [query, category, selectedOrg]);

  const filteredBundles = useMemo(() => {
    const q = normalizeText(query);
    return courseBundles.filter((bundle) => {
      const org = bundle.organization || bundle.issuer || 'Other';
      const matchesQuery = !q || normalizeText(`${bundle.courseName} ${org} ${bundle.category}`).includes(q);
      const matchesCategory = category === 'All' || bundle.category === category;
      const matchesOrg = selectedOrg === 'All Organizations' || org === selectedOrg;
      return matchesQuery && matchesCategory && matchesOrg;
    });
  }, [query, category, selectedOrg]);

  return (
    <section id="certifications" className="section-shell section-pad certifications">
      <SectionHeader
        eyebrow="Certifications"
        title="Professional Credentials & Specializations"
        description="Structured certificate library of course specialization bundles and individual certificates."
      />

      {/* Two main category cards */}
      <div className="cert-tabs-grid">
        <button
          className={`cert-tab-card glass-card ${activeTab === 'bundles' ? 'cert-tab-card--active' : ''}`}
          onClick={() => {
            setActiveTab('bundles');
            setQuery('');
            setCategory('All');
            setSelectedOrg('All Organizations');
          }}
        >
          <div className="cert-tab-card__icon">
            <Layers size={24} />
          </div>
          <div className="cert-tab-card__content">
            <h3>Specialization Bundles</h3>
            <p>{courseBundles.length} Bundles ({totalBundleCourses} Certificates)</p>
          </div>
        </button>

        <button
          className={`cert-tab-card glass-card ${activeTab === 'singles' ? 'cert-tab-card--active' : ''}`}
          onClick={() => {
            setActiveTab('singles');
            setQuery('');
            setCategory('All');
            setSelectedOrg('All Organizations');
          }}
        >
          <div className="cert-tab-card__icon">
            <Award size={24} />
          </div>
          <div className="cert-tab-card__content">
            <h3>Single Certificates</h3>
            <p>{singleCertificates.length} Individual Credentials</p>
          </div>
        </button>
      </div>

      <div className="certificate-controls">
        <input 
          value={query} 
          onChange={(event) => setQuery(event.target.value)} 
          placeholder={activeTab === 'bundles' ? "Search specialization bundles, companies..." : "Search single certificates, companies, categories..."} 
        />
        <select value={selectedOrg} onChange={(event) => setSelectedOrg(event.target.value)} aria-label="Filter by Organization">
          {organizationList.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name} ({item.count})
            </option>
          ))}
        </select>
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by Category">
          {certificateCategories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {activeTab === 'singles' && (
        <div className="certification-block">
          <div className="block-title">
            <h3>Single Certificates</h3>
            <span>{filteredSingles.length} shown</span>
          </div>
          <div className="certificates-list">
            {filteredSingles.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} onView={setActiveCertificate} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'bundles' && (
        <div className="certification-block">
          <div className="block-title">
            <h3>Course Certificate Bundles</h3>
            <span>{filteredBundles.length} shown</span>
          </div>
          <div className="course-grid">
            {filteredBundles.map((bundle) => (
              <CourseBundleCard key={bundle.id} bundle={bundle} onOpen={setActiveBundle} />
            ))}
          </div>
        </div>
      )}

      <CertificateModal
        certificate={activeCertificate}
        onClose={() => {
          setActiveCertificate(null);
          if (lastOpenBundle) {
            setTimeout(() => {
              setActiveBundle(lastOpenBundle);
              setLastOpenBundle(null);
            }, 50);
          }
        }}
      />
      <CourseCertificateModal
        bundle={activeBundle}
        onClose={() => {
          setActiveBundle(null);
          setLastOpenBundle(null);
        }}
        onViewCertificate={(certificate) => {
          // Close bundle modal first, then open certificate preview on top
          setLastOpenBundle(activeBundle);
          setActiveBundle(null);
          setTimeout(() => setActiveCertificate({ ...certificate, issuer: activeBundle?.platform }), 50);
        }}
      />
    </section>
  );
}
