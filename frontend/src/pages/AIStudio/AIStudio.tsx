import { WorkspaceHeader } from "./components/WorkspaceHeader";
import { TaskComposer } from "./components/TaskComposer";
import "./ai-studio.css";

function AIStudio() {
  return (
    <div className="ai-studio">
      <WorkspaceHeader />

      <TaskComposer />
    </div>
  );
}

export default AIStudio;