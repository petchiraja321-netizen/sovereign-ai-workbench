import {
  ChevronRight,
  FileText,
} from "lucide-react";

import type { Task } from "../../../types/task";
import { TaskStatus } from "./TaskStatus";

interface TaskRowProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskRow({
  task,
  onClick,
}: TaskRowProps) {
  return (
    <button
      type="button"
      className="task-row"
      onClick={() => onClick(task)}
    >
      <div className="task-row__main">
        <div className="task-row__file">
          <FileText size={15} />
        </div>

        <div className="task-row__identity">
          <strong>{task.title}</strong>

          <span>
            {task.id} · {task.typeLabel} ·{" "}
            {task.inputCount} documents
          </span>
        </div>
      </div>

      <div className="task-row__status">
        <TaskStatus status={task.status} />
      </div>

      <div className="task-row__model">
        {task.model}
      </div>

      <div className="task-row__time">
        {task.createdAt}
      </div>

      <div className="task-row__arrow">
        <ChevronRight size={15} />
      </div>
    </button>
  );
}