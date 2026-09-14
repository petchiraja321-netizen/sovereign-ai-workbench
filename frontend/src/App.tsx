import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { StatusBadge } from "./components/ui/StatusBadge";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <section>
        <p
          style={{
            color: "var(--color-success)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.08em",
          }}
        >
          SOVEREIGN AI WORKBENCH
        </p>

        <h1
          style={{
            marginTop: "8px",
            fontSize: "32px",
            letterSpacing: "-0.03em",
          }}
        >
          Design System
        </h1>
      </section>

      <Card>
        <div style={{ padding: "24px" }}>
          <h2 style={{ marginBottom: "8px" }}>
            Component Preview
          </h2>

          <p
            style={{
              color: "var(--color-text-secondary)",
              marginBottom: "20px",
            }}
          >
            Sovereign interface foundation is operational.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Button>
              Run Sovereign AI
            </Button>

            <Button variant="secondary">
              View Details
            </Button>

            <Button variant="ghost">
              Cancel
            </Button>

            <StatusBadge
              status="online"
              label="System Online"
            />

            <StatusBadge
              status="processing"
              label="Processing"
            />

            <StatusBadge
              status="warning"
              label="Approval Required"
            />
          </div>
        </div>
      </Card>
    </main>
  );
}

export default App;