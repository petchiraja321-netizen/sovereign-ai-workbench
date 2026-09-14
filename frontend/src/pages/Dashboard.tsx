function Dashboard() {
  return (
    <section>
      <p
        style={{
          color: "var(--color-success)",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.1em",
        }}
      >
        OVERVIEW
      </p>

      <h1
        style={{
          marginTop: "8px",
          fontSize: "30px",
        }}
      >
        Dashboard
      </h1>

      <p
        style={{
          marginTop: "8px",
          color: "var(--color-text-secondary)",
        }}
      >
        Sovereign AI Workbench operational overview.
      </p>
    </section>
  );
}

export default Dashboard;