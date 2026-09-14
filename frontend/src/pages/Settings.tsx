function Settings() {
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
        CONFIGURATION
      </p>

      <h1
        style={{
          marginTop: "8px",
          fontSize: "30px",
        }}
      >
        Settings
      </h1>

      <p
        style={{
          marginTop: "8px",
          color: "var(--color-text-secondary)",
        }}
      >
        Workbench preferences and system configuration.
      </p>
    </section>
  );
}

export default Settings;