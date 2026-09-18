# Sovereign AI Workbench — Enhanced Member 3 Frontend

Updated enterprise UI for SIH26117 / MRPL.

### Changes
- Renamed "Command Dashboard" to **Control Center**.
- Removed visible model name and "Network: Isolated" messaging from the frontend.
- Added animated core, orbiting nodes, particles, scanline, radar and system-health graphics.
- Added hover animations, button ripple effects, page transitions and glowing UI.
- Added drag-and-drop upload animation.
- Added draggable/swappable dashboard metric cards.
- Added 3D hover effect on dashboard cards.
- Added animated workflow nodes and execution trace.
- Kept Audit Log because it is an enterprise traceability requirement. It records who did what, when, and the status.
- AI logic is NOT implemented in JavaScript.
- Spring Boot integration remains the frontend API boundary.

### Backend API
`POST http://localhost:8080/api/agent/tasks`

Example response:
```json
{
  "answer": "verified answer",
  "evidence": [
    {"file":"report.pdf","detail":"Page 4, section 2.1"}
  ]
}
```

Change `API_BASE` or the endpoint in `app.js` to match your Spring Boot controller.


## V3 UI clarification
"Agent Workspace" is only the frontend control area. The actual AI execution remains in the team's backend stack (Spring Boot + LangGraph + local Qwen). Opening `index.html` alone does not execute Qwen or LangGraph.

V3 adds:
- Page transitions on every section
- Ripple click animations
- 3D hover/tilt effects
- Magnetic buttons
- Animated file/drop zone
- Animated workflow steps
- Drag-and-swap dashboard cards
- Animated security/telemetry cards
- Animated audit table rows
- Animated settings fields
- Toast feedback


## V4 information hierarchy
The Dashboard is intentionally an operational overview only. It does not present the AI/model as a separate dashboard feature.

**Agent Workspace is the single execution area** for:
- Task input
- PDF/image/Excel upload
- Agent progress
- Reasoning workflow visualization
- Evidence
- Human approval
- Deliverables
- Final result

The dashboard only provides system/workspace overview and a route into Agent Workspace.

## V5 UI changes
- Removed the startup login screen; the workbench opens directly.
- Removed the User ID and Access Key/password fields from the frontend startup flow.
- Removed the `AI` text from the animated core; the animation now shows only `CORE`.
