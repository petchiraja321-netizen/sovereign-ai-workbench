import { AppShell } from "./components/layout/AppShell";

function App() {
  return (
    <AppShell>
      <section>
        <p
          style={{
            color: "var(--color-success)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            marginBottom: "8px",
          }}
        >
          SOVEREIGN AI WORKBENCH
        </p>

        <h1
          style={{
            fontSize: "32px",
            letterSpacing: "-0.03em",
            marginBottom: "8px",
          }}
        >
          Application Shell
        </h1>

        <p
          style={{
            color: "var(--color-text-secondary)",
          }}
        >
          Sovereign workspace foundation is operational.
        </p>
      </section>
    </AppShell>
  );
}

export default App;