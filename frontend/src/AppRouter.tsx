import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AppShell } from "./components/layout/AppShell";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard";
import AIStudio from "./pages/AIStudio/AIStudio";
import Knowledge from "./pages/Knowledge";
import Tasks from "./pages/Tasks";
import Security from "./pages/Security";
import Audit from "./pages/Audit";
import Deliverables from "./pages/Deliverables";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Application Shell */}
        <Route element={<AppShell />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/ai-studio"
            element={<AIStudio />}
          />

          <Route
            path="/knowledge"
            element={<Knowledge />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/security"
            element={<Security />}
          />

          <Route
            path="/audit"
            element={<Audit />}
          />

          <Route
            path="/deliverables"
            element={<Deliverables />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          {/* Root redirect */}
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* Unknown routes */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;