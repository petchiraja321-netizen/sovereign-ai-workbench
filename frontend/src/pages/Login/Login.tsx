import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Enter your credentials to continue.");
      return;
    }

    console.log("Authentication will be connected to backend API.");
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #05080d;
          color: #f4f7fa;
          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        button,
        input {
          font: inherit;
        }

        .sovereign-login {
          min-height: 100vh;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(420px, 0.85fr);
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 20% 45%,
              rgba(53, 224, 161, 0.07),
              transparent 32%
            ),
            radial-gradient(
              circle at 80% 25%,
              rgba(91, 184, 255, 0.04),
              transparent 30%
            ),
            #05080d;
        }

        .sovereign-login::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            );
          background-size: 44px 44px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }

        .sovereign-login__visual {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding: 64px 9vw 80px 8vw;
          border-right: 1px solid #1d2a38;
        }

        .sovereign-login__content {
          position: relative;
          z-index: 2;
          max-width: 650px;
        }

        .sovereign-login__label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          color: #35e0a1;
          font-family: "JetBrains Mono", Consolas, monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .sovereign-login__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #35e0a1;
          box-shadow: 0 0 0 5px rgba(53, 224, 161, 0.08);
          animation: sovereignPulse 2s ease-in-out infinite;
        }

        @keyframes sovereignPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.55;
            transform: scale(0.85);
          }
        }

        .sovereign-login__title {
          margin: 0;
          color: #f4f7fa;
          font-size: clamp(44px, 5vw, 74px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 750;
        }

        .sovereign-login__title span {
          color: #a3afbd;
        }

        .sovereign-login__description {
          max-width: 560px;
          margin: 28px 0 0;
          color: #a3afbd;
          font-size: 15px;
          line-height: 1.75;
        }

        .sovereign-login__capabilities {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 38px;
        }

        .sovereign-login__capability {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #a3afbd;
          font-size: 12px;
        }

        .sovereign-login__capability svg {
          flex-shrink: 0;
          color: #35e0a1;
        }

        .sovereign-login__footer {
          display: flex;
          justify-content: space-between;
          position: absolute;
          left: 8vw;
          right: 9vw;
          bottom: 28px;
          color: #718096;
          font-family: "JetBrains Mono", Consolas, monospace;
          font-size: 8px;
          letter-spacing: 0.1em;
          z-index: 2;
        }

        .sovereign-login__panel {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          padding: 48px;
          background: rgba(255, 255, 255, 0.008);
        }

        .sovereign-login__card {
          width: min(100%, 430px);
          padding: 34px;
          border: 1px solid #1d2a38;
          border-radius: 18px;
          background: rgba(14, 22, 33, 0.94);
          box-shadow:
            0 24px 60px rgba(0, 0, 0, 0.42),
            0 0 0 1px rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(18px);
        }

        .sovereign-login__card-header {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .sovereign-login__lock {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(53, 224, 161, 0.22);
          border-radius: 11px;
          background: rgba(53, 224, 161, 0.07);
          color: #35e0a1;
        }

        .sovereign-login__eyebrow {
          margin: 0;
          color: #718096;
          font-family: "JetBrains Mono", Consolas, monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.13em;
        }

        .sovereign-login__heading {
          margin: 3px 0 0;
          color: #f4f7fa;
          font-size: 23px;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        .sovereign-login__card-description {
          margin: 20px 0 0;
          color: #a3afbd;
          font-size: 12px;
          line-height: 1.65;
        }

        .sovereign-login__form {
          display: flex;
          flex-direction: column;
          gap: 19px;
          margin-top: 28px;
        }

        .sovereign-login__field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .sovereign-login__field label {
          color: #a3afbd;
          font-size: 11px;
          font-weight: 650;
        }

        .sovereign-login__input {
          width: 100%;
          height: 45px;
          padding: 0 13px;
          border: 1px solid #1d2a38;
          border-radius: 8px;
          outline: none;
          background: #0a1018;
          color: #f4f7fa;
          font-size: 12px;
          transition:
            border-color 150ms ease,
            box-shadow 150ms ease,
            background 150ms ease;
        }

        .sovereign-login__input::placeholder {
          color: #718096;
        }

        .sovereign-login__input:hover {
          border-color: #263648;
        }

        .sovereign-login__input:focus {
          border-color: rgba(53, 224, 161, 0.55);
          box-shadow: 0 0 0 3px rgba(53, 224, 161, 0.07);
          background: #0e1621;
        }

        .sovereign-login__label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .sovereign-login__forgot {
          padding: 0;
          border: 0;
          background: transparent;
          color: #5bb8ff;
          font-size: 10px;
          cursor: pointer;
        }

        .sovereign-login__forgot:hover {
          color: #f4f7fa;
        }

        .sovereign-login__password {
          position: relative;
        }

        .sovereign-login__password .sovereign-login__input {
          padding-right: 44px;
        }

        .sovereign-login__toggle {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 5px;
          right: 5px;
          padding: 0;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #718096;
          cursor: pointer;
        }

        .sovereign-login__toggle:hover {
          background: #131e2b;
          color: #f4f7fa;
        }

        .sovereign-login__error {
          padding: 10px 12px;
          border: 1px solid rgba(255, 92, 108, 0.22);
          border-radius: 8px;
          background: rgba(255, 92, 108, 0.07);
          color: #ff5c6c;
          font-size: 11px;
        }

        .sovereign-login__submit {
          width: 100%;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 8px;
          background: #35e0a1;
          color: #04100b;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
          transition:
            transform 150ms ease,
            background 150ms ease,
            box-shadow 150ms ease;
        }

        .sovereign-login__submit:hover {
          background: #4ae8ad;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(53, 224, 161, 0.16);
        }

        .sovereign-login__security {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 22px;
          padding: 12px;
          border: 1px solid #1d2a38;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.012);
        }

        .sovereign-login__security svg {
          flex-shrink: 0;
          margin-top: 1px;
          color: #35e0a1;
        }

        .sovereign-login__security-content {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .sovereign-login__security strong {
          color: #a3afbd;
          font-size: 10px;
        }

        .sovereign-login__security span {
          color: #718096;
          font-size: 9px;
          line-height: 1.5;
        }

        .sovereign-login__card-footer {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin: 26px 0 0;
          color: #718096;
          font-family: "JetBrains Mono", Consolas, monospace;
          font-size: 8px;
          letter-spacing: 0.06em;
        }

        @media (max-width: 900px) {
          .sovereign-login {
            grid-template-columns: 1fr;
          }

          .sovereign-login__visual {
            min-height: auto;
            padding: 48px 32px 42px;
            border-right: 0;
            border-bottom: 1px solid #1d2a38;
          }

          .sovereign-login__title {
            font-size: clamp(40px, 9vw, 58px);
          }

          .sovereign-login__description {
            margin-top: 20px;
          }

          .sovereign-login__capabilities {
            margin-top: 28px;
          }

          .sovereign-login__footer {
            display: none;
          }

          .sovereign-login__panel {
            min-height: auto;
            padding: 48px 24px 64px;
          }
        }

        @media (max-width: 520px) {
          .sovereign-login__visual {
            padding: 36px 20px 32px;
          }

          .sovereign-login__label {
            margin-bottom: 20px;
          }

          .sovereign-login__title {
            font-size: 38px;
          }

          .sovereign-login__description {
            font-size: 13px;
          }

          .sovereign-login__capability {
            font-size: 11px;
          }

          .sovereign-login__panel {
            padding: 32px 16px 48px;
          }

          .sovereign-login__card {
            padding: 24px 20px;
            border-radius: 12px;
          }
        }
      `}</style>

      <main className="sovereign-login">
        <section className="sovereign-login__visual">
          <div className="sovereign-login__content">
            <div className="sovereign-login__label">
              <span className="sovereign-login__dot" />
              SOVEREIGN CORE
            </div>

            <h1 className="sovereign-login__title">
              Intelligence.
              <br />
              <span>Without Compromise.</span>
            </h1>

            <p className="sovereign-login__description">
              A secure enterprise AI workbench for private,
              auditable and evidence-driven intelligence.
            </p>

            <div className="sovereign-login__capabilities">
              <div className="sovereign-login__capability">
                <ShieldCheck size={16} />
                <span>Private AI execution</span>
              </div>

              <div className="sovereign-login__capability">
                <LockKeyhole size={16} />
                <span>Enterprise security boundaries</span>
              </div>

              <div className="sovereign-login__capability">
                <ArrowRight size={16} />
                <span>Traceable agent workflows</span>
              </div>
            </div>
          </div>

          <div className="sovereign-login__footer">
            <span>SOVEREIGN AI WORKBENCH</span>
            <span>SECURE ENVIRONMENT</span>
          </div>
        </section>

        <section className="sovereign-login__panel">
          <div className="sovereign-login__card">
            <div className="sovereign-login__card-header">
              <div className="sovereign-login__lock">
                <LockKeyhole size={19} />
              </div>

              <div>
                <p className="sovereign-login__eyebrow">
                  SECURE ACCESS
                </p>

                <h2 className="sovereign-login__heading">
                  Welcome back
                </h2>
              </div>
            </div>

            <p className="sovereign-login__card-description">
              Sign in to access the Sovereign AI Workbench.
            </p>

            <form
              className="sovereign-login__form"
              onSubmit={handleSubmit}
            >
              <div className="sovereign-login__field">
                <label htmlFor="sovereign-email">
                  Work email
                </label>

                <input
                  id="sovereign-email"
                  className="sovereign-login__input"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  autoComplete="email"
                />
              </div>

              <div className="sovereign-login__field">
                <div className="sovereign-login__label-row">
                  <label htmlFor="sovereign-password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="sovereign-login__forgot"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="sovereign-login__password">
                  <input
                    id="sovereign-password"
                    className="sovereign-login__input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="sovereign-login__toggle"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="sovereign-login__error">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                fullWidth
              >
                Sign in
                <ArrowRight size={16} />
              </Button>
            </form>

            <div className="sovereign-login__security">
              <ShieldCheck size={15} />

              <div className="sovereign-login__security-content">
                <strong>Protected environment</strong>

                <span>
                  Access is monitored and audited.
                </span>
              </div>
            </div>

            <p className="sovereign-login__card-footer">
              <span>Sovereign AI Workbench</span>
              <span>•</span>
              <span>MRPL</span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;