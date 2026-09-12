# Sovereign AI Workbench — Frontend Context

## Project

Sovereign AI Workbench

## SIH Problem Statement

SIH26117 — Mangalore Refinery and Petrochemicals Limited (MRPL)

## Frontend Owner

Member 3 — Frontend Developer

## Frontend Goal

Build a professional enterprise-grade AI workbench.

The application must NOT look like a normal chatbot.

It should communicate:

- Local AI
- Agentic workflow
- RAG
- Multimodal AI
- Tool execution
- Evidence verification
- Human approval
- Security
- Auditability
- Deliverable generation

## Frontend Stack

- React
- Vite
- TypeScript
- CSS
- Three.js
- React Three Fiber
- Drei
- Framer Motion
- Lucide React
- Recharts

## Backend

Java + Spring Boot

## AI

Python
LangGraph
Local Qwen
Qwen-VL

## RAG

Qdrant
BGE-M3
PyMuPDF
Tesseract

## Important Rules

1. Do not implement AI logic in the frontend.
2. Do not call Qwen directly from the browser.
3. Do not call external AI APIs.
4. Frontend communicates with Spring Boot APIs.
5. Keep components reusable.
6. Do not modify other team members' modules.
7. Use mock data until backend APIs are ready.
8. Keep UI and API logic separated.
9. Do not expose secrets in frontend code.
10. 3D should represent system state, not merely decoration.

## Visual Direction

Industrial AI Command Center.

Professional.
Dark.
Minimal.
Futuristic.
Enterprise-grade.

Avoid:

- Generic chatbot UI
- Excessive neon
- Gaming-style UI
- Unnecessary gradients
- Excessive animation
- Giant decorative 3D objects

## Main Routes

/login
/dashboard
/ai-studio
/knowledge
/tasks
/security
/audit
/deliverables
/settings

## Main AI Workflow

Security Check
→ Task Classification
→ Model Selection
→ Document Retrieval
→ Reasoning
→ Evidence Verification
→ Human Approval if required
→ Deliverable Generation
→ Completed

## Frontend Responsibilities

- UI/UX
- Responsive layout
- File upload interface
- Task interface
- Agent progress visualization
- Evidence visualization
- Security monitor
- Audit visualization
- Deliverable interface
- 3D system visualization
- Backend API integration