import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import "./app-shell.css";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-shell__main">
        <Topbar />

        <main className="app-shell__content">
          {children}
        </main>
      </div>
    </div>
  );
}