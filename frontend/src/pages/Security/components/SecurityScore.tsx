import { ShieldCheck } from "lucide-react";

type Props = {
  score: number;
};

export default function SecurityScore({ score }: Props) {
  return (
    <div className="security-score">
      <div className="security-score__header">
        <div>
          <span className="security-section-label">SECURITY SCORE</span>
          <h2>Overall security posture</h2>
        </div>

        <ShieldCheck size={20} />
      </div>

      <div className="security-score__body">
        <div
          className="security-score__circle"
          style={{
            background: `conic-gradient(#12b76a ${score}%, #eaecf0 ${score}% 100%)`,
          }}
        >
          <div className="security-score__circle-inner">
            <strong>{score}</strong>
            <span>/ 100</span>
          </div>
        </div>

        <div className="security-score__copy">
          <strong>Protected environment</strong>
          <p>
            File validation, policy enforcement, network monitoring and audit
            logging are currently enabled.
          </p>
        </div>
      </div>
    </div>
  );
}