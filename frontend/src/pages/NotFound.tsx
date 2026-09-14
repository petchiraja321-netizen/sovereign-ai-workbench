function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        textAlign: "center",
      }}
    >
      <div>
        <p
          style={{
            color: "var(--color-danger)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
          }}
        >
          404 // ROUTE NOT FOUND
        </p>

        <h1
          style={{
            marginTop: "8px",
            fontSize: "32px",
          }}
        >
          Page Not Found
        </h1>
      </div>
    </main>
  );
}

export default NotFound;