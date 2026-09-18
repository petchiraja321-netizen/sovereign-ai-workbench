import {
  ClipboardList,
  Plus,
} from "lucide-react";

interface TasksHeaderProps {
  onNewTask: () => void;
}

export function TasksHeader({
  onNewTask,
}: TasksHeaderProps) {
  return (
    <header className="tasks-header">
      <div className="tasks-header__identity">
        <div className="tasks-header__icon">
          <ClipboardList
            size={18}
            strokeWidth={1.8}
          />
        </div>

        <div>
          <span className="tasks-header__eyebrow">
            MISSION CONTROL
          </span>

          <h1>Tasks</h1>

          <p>
            Monitor and manage sovereign AI
            executions.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="tasks-header__new-button"
        onClick={onNewTask}
      >
        <Plus size={16} />
        <span>New Task</span>
      </button>
    </header>
  );
}