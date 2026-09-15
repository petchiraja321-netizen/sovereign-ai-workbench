import { useState } from "react";

import { WorkspaceHeader } from "./components/WorkspaceHeader";
import { TaskComposer } from "./components/TaskComposer";
import { AgentExecutionPanel } from "./components/execution/AgentExecutionPanel";

import "./ai-studio.css";
import "./components/execution/agent-execution.css";

function AIStudio() {
  const [isExecuting, setIsExecuting] =
    useState(false);

  const [executionData, setExecutionData] =
    useState({
      taskType: "Analyse",
      task: "",
      filesCount: 0,
    });

  const handleExecute = (
    taskType: string,
    task: string,
    filesCount: number,
  ) => {
    setExecutionData({
      taskType,
      task,
      filesCount,
    });

    setIsExecuting(true);
  };

  return (
    <div className="ai-studio">
      <WorkspaceHeader />

      {!isExecuting ? (
        <TaskComposer
          onExecute={handleExecute}
        />
      ) : (
        <AgentExecutionPanel
          taskType={executionData.taskType}
          task={executionData.task}
          filesCount={executionData.filesCount}
          onComplete={() => setIsExecuting(false)}
        />
      )}
    </div>
  );
}

export default AIStudio;