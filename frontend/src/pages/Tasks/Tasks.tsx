import { useMemo, useState } from "react";

import "./tasks.css";

import {
  mockTasks,
  getTaskStats,
} from "../../api/tasks";

import type {
  Task,
  TaskFilterState,
  TaskSort,
  TaskStatus,
  TaskType,
} from "../../types/task";

import { TasksHeader } from "./components/TasksHeader";
import { TaskStats } from "./components/TaskStats";
import { TaskToolbar } from "./components/TaskToolbar";
import { TaskFilters } from "./components/TaskFilters";
import { TaskTable } from "./components/TaskTable";
import { TaskDetails } from "./components/TaskDetails";

export function Tasks() {
  const [filters, setFilters] =
    useState<TaskFilterState>({
      search: "",
      status: "all",
      type: "all",
      model: "all",
      sortBy: "newest",
    });

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const [viewMode, setViewMode] =
    useState<"list" | "grid">("list");

  const filteredTasks = useMemo(() => {
    const search =
      filters.search
        .trim()
        .toLowerCase();

    const result = mockTasks.filter(
      (task) => {
        const matchesSearch =
          search.length === 0 ||
          task.title
            .toLowerCase()
            .includes(search) ||
          task.id
            .toLowerCase()
            .includes(search) ||
          task.typeLabel
            .toLowerCase()
            .includes(search) ||
          task.model
            .toLowerCase()
            .includes(search);

        const matchesStatus =
          filters.status === "all" ||
          task.status === filters.status;

        const matchesType =
          filters.type === "all" ||
          task.type === filters.type;

        const matchesModel =
          filters.model === "all" ||
          task.model === filters.model;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesType &&
          matchesModel
        );
      },
    );

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "oldest":
          return a.id.localeCompare(b.id);

        case "updated":
          return b.updatedAt.localeCompare(
            a.updatedAt,
          );

        case "status":
          return a.status.localeCompare(
            b.status,
          );

        case "newest":
        default:
          return b.id.localeCompare(a.id);
      }
    });

    return result;
  }, [filters]);

  const stats = useMemo(
    () => getTaskStats(mockTasks),
    [],
  );

  const handleSearchChange = (
    search: string,
  ) => {
    setFilters((current) => ({
      ...current,
      search,
    }));
  };

  const handleStatusChange = (
    status: TaskStatus | "all",
  ) => {
    setFilters((current) => ({
      ...current,
      status,
    }));
  };

  const handleTypeChange = (
    type: TaskType | "all",
  ) => {
    setFilters((current) => ({
      ...current,
      type,
    }));
  };

  const handleModelChange = (
    model: string,
  ) => {
    setFilters((current) => ({
      ...current,
      model,
    }));
  };

  const handleSortChange = () => {
    setFilters((current) => {
      const nextSort: Record<
        TaskSort,
        TaskSort
      > = {
        newest: "oldest",
        oldest: "updated",
        updated: "status",
        status: "newest",
      };

      return {
        ...current,
        sortBy:
          nextSort[current.sortBy],
      };
    });
  };

  const handleClearFilters = () => {
    setFilters((current) => ({
      ...current,
      search: "",
      status: "all",
      type: "all",
      model: "all",
    }));
  };

  const handleNewTask = () => {
    console.info(
      "New task flow will be connected in a later step.",
    );
  };

  return (
    <main className="tasks-page">
      <div className="tasks-page__container">
        <TasksHeader
          onNewTask={handleNewTask}
        />

        <TaskStats stats={stats} />

        <TaskToolbar
          search={filters.search}
          onSearchChange={
            handleSearchChange
          }
          onFilterClick={() =>
            setFiltersOpen(
              (current) => !current,
            )
          }
          onSortChange={handleSortChange}
          sortBy={filters.sortBy}
          resultCount={
            filteredTasks.length
          }
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <TaskFilters
          open={filtersOpen}
          filters={filters}
          onStatusChange={
            handleStatusChange
          }
          onTypeChange={
            handleTypeChange
          }
          onModelChange={
            handleModelChange
          }
          onClear={handleClearFilters}
        />

        <TaskTable
          tasks={filteredTasks}
          onTaskClick={setSelectedTask}
        />
      </div>

      <TaskDetails
        task={selectedTask}
        onClose={() =>
          setSelectedTask(null)
        }
      />
    </main>
  );
}

export default Tasks;