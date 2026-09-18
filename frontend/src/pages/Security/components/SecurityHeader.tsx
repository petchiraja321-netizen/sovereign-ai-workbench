import { ShieldCheck } from "lucide-react";

export default function SecurityHeader() {
  return (
    <header className="security-header">
      <div className="security-header__brand">
        <div className="security-header__icon">
          <ShieldCheck size={20} />
        </div>

        <div>
          <strong>Security Center</strong>
          <span>Enterprise security and control</span>
        </div>
      </div>

      <div className="security-header__status">
        <span />
        System Secure
      </div>
    </header>
  );
}