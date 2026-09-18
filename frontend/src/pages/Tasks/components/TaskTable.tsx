import type { Task } from "../../../types/task";
import { TaskRow } from "./TaskRow";

interface TaskTableProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function TaskTable({
  tasks,
  onTaskClick,
}: TaskTableProps) {
  return (
    <section className="task-table">
      <div className="task-table__header">
        <span>TASK</span>
        <span>STATUS</span>
        <span>MODEL</span>
        <span>CREATED</span>
        <span />
      </div>

      <div className="task-table__body">
        {tasks.length === 0 ? (
          <div className="task-table__empty">
            <strong>No tasks found</strong>
            <span>
              Try changing your search or
              filters.
            </span>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onClick={onTaskClick}
            />
          ))
        )}
      </div>
    </section>
  );
}