import { ArrowRight, Database, FileCheck2, Globe2, Shield } from "lucide-react";

export default function TrustBoundary() {
  return (
    <section className="security-boundary">
      <div className="security-section-heading">
        <div>
          <span className="security-section-label">CONTROL FLOW</span>
          <h2>Trust boundary</h2>
        </div>
      </div>

      <div className="security-boundary__flow">
        <div className="security-boundary__node">
          <FileCheck2 size={17} />
          <strong>File Upload</strong>
          <span>Type, size and hash validation</span>
        </div>

        <ArrowRight className="security-boundary__arrow" size={17} />

        <div className="security-boundary__node">
          <Shield size={17} />
          <strong>Security Policy</strong>
          <span>Permission and trust evaluation</span>
        </div>

        <ArrowRight className="security-boundary__arrow" size={17} />

        <div className="security-boundary__node security-boundary__node--trusted">
          <Database size={17} />
          <strong>Trusted Runtime</strong>
          <span>Local execution and approved tools</span>
        </div>

        <ArrowRight className="security-boundary__arrow" size={17} />

        <div className="security-boundary__node security-boundary__node--external">
          <Globe2 size={17} />
          <strong>External Call</strong>
          <span>Monitored and policy checked</span>
        </div>
      </div>
    </section>
  );
}