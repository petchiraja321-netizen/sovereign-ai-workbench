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
import { Knowledge } from "./pages/Knowledge/Knowledge";
import Tasks from "./pages/Tasks/Tasks";
import Security from "./pages/Security/Security";
import Audit from "./pages/Audit/Audit";
import Deliverables from "./pages/Deliverables";
import Approvals from "./pages/Approvals/Approvals";
import Notifications from "./pages/Notifications/Notifications";
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
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* AI Studio */}
          <Route
            path="/ai-studio"
            element={<AIStudio />}
          />

          {/* Knowledge Base */}
          <Route
            path="/knowledge"
            element={<Knowledge />}
          />

          {/* Tasks */}
          <Route
            path="/tasks"
            element={<Tasks />}
          />

          {/* Security */}
          <Route
            path="/security"
            element={<Security />}
          />

          {/* Audit */}
          <Route
            path="/audit"
            element={<Audit />}
          />

          {/* Deliverables */}
          <Route
            path="/deliverables"
            element={<Deliverables />}
          />

          {/* Human Approvals */}
          <Route
            path="/approvals"
            element={<Approvals />}
          />

          {/* Notifications */}
          <Route
            path="/notifications"
            element={<Notifications />}
          />

          {/* Settings */}
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