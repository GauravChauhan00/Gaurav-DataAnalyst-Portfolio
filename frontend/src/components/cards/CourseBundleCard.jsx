import { Building2, Layers3 } from 'lucide-react';
import Badge from '../common/Badge';

export default function CourseBundleCard({ bundle, onOpen }) {
  const orgName = bundle.organization || bundle.issuer || 'Industry Credential';
  const platformName = bundle.platform || 'Coursera';

  return (
    <article className="course-bundle-card">
      <div className="course-bundle-card__header">
        <div className="course-bundle-card__icon">
          <Layers3 size={24} />
        </div>
        <Badge tone="accent">Course Bundle</Badge>
      </div>

      <div className="course-bundle-card__org">
        <Building2 size={13} className="org-icon" />
        <strong className="org-name">{orgName}</strong>
        <span className="org-via">via {platformName}</span>
      </div>

      <h3>{bundle.courseName}</h3>
      <p>{bundle.description}</p>
      <div className="course-bundle-card__meta">
        <span>{bundle.category}</span>
        <span>{bundle.totalCertificates} certificates</span>
      </div>
      <button type="button" className="small-btn" onClick={() => onOpen(bundle)}>
        Open Bundle
      </button>
    </article>
  );
}
