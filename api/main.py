import os
from uuid import uuid4

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from agent.graph import agent_graph
from api.schemas import AgentRequest, AgentResponse


# ----------------------------------------------------------------
# Sovereign mode: force-disable LangSmith cloud tracing.
# ----------------------------------------------------------------
os.environ.pop("LANGSMITH_API_KEY", None)
os.environ.pop("LANGSMITH_ENDPOINT", None)
os.environ["LANGSMITH_TRACING"] = "false"


app = FastAPI(
    title="Sovereign AI Workbench - Local Qwen Agent Service",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1",
        "http://localhost",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "mode": "local_only",
        "model": "qwen3:8b",
        "ollama_endpoint": "http://127.0.0.1:11434",
        "langsmith_tracing": os.environ.get(
            "LANGSMITH_TRACING",
            "false",
        ),
    }


@app.post("/agent/invoke", response_model=AgentResponse)
def invoke_agent(request: AgentRequest):
    request_id = request.request_id or str(uuid4())

    initial_state = {
        "request_id": request_id,
        "user_input": request.user_input,
        "input_type": request.input_type,
        "metadata": request.metadata,

        "task_category": "unknown",
        "model_to_use": "local_qwen3_8b",
        "route_reason": "",

        "plan": [],
        "tool_calls": [],
        "tool_results": [],

        "evidence_items": [],
        "evidence_confidence": 0.0,
        "evidence_verified": False,

        "needs_human_approval": False,
        "approval_reason": None,
        "human_approval_status": None,

        "progress_events": [],
        "audit_events": [],

        "retry_count": 0,
        "error_message": None,
        "status": "started",
    }

    try:
        result = agent_graph.invoke(initial_state)

        final_status = result.get("status", "completed")

        return AgentResponse(
            success=final_status != "failed",
            request_id=request_id,
            status=final_status,
            task_category=result.get("task_category"),
            model_to_use=result.get("model_to_use"),
            route_reason=result.get("route_reason"),

            final_answer=result.get("final_answer"),
            structured_output=result.get("structured_output", {}),

            evidence_items=result.get("evidence_items", []),
            evidence_confidence=result.get("evidence_confidence", 0.0),
            evidence_verified=result.get("evidence_verified", False),

            needs_human_approval=result.get(
                "needs_human_approval",
                False,
            ),
            approval_reason=result.get("approval_reason"),

            tool_results=result.get("tool_results", []),
            progress_events=result.get("progress_events", []),
            audit_events=result.get("audit_events", []),

            retry_count=result.get("retry_count", 0),
            error_message=result.get("error_message"),
        )

    except Exception as error:
        return AgentResponse(
            success=False,
            request_id=request_id,
            status="failed",
            task_category="error",
            model_to_use="local_qwen3_8b",
            route_reason="Agent graph execution raised an exception.",
            final_answer="Agent workflow failed before final answer generation.",
            structured_output={
                "status": "failed",
                "message": "Agent graph execution failed.",
            },
            error_message=str(error),
        )