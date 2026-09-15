import {
  ArrowUp,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { FileDropzone } from "./FileDropzone";

export function TaskComposer() {
  const [task, setTask] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [showFiles, setShowFiles] = useState(false);

  const handleSubmit = () => {
    if (!task.trim() && files.length === 0) {
      return;
    }

    console.log("Sovereign task submitted:", {
      task,
      files,
    });
  };

  return (
    <div className="task-composer">
      <div className="task-composer__header">
        <div>
          <div className="task-composer__title">
            <Sparkles size={15} />
            New AI Task
          </div>

          <p className="task-composer__subtitle">
            Ask a question, analyse documents or generate
            an enterprise deliverable.
          </p>
        </div>

        <span className="task-composer__mode">
          LOCAL AI
        </span>
      </div>

      <div className="task-composer__input-wrapper">
        <textarea
          value={task}
          onChange={(event) => setTask(event.target.value)}
          className="task-composer__textarea"
          placeholder="Describe what you want Sovereign AI to do..."
          rows={6}
        />

        <div className="task-composer__actions">
          <button
            type="button"
            className="task-composer__attach"
            onClick={() => setShowFiles((value) => !value)}
          >
            <Paperclip size={15} />
            Attach files
            {files.length > 0 && (
              <span>{files.length}</span>
            )}
          </button>

          <button
            type="button"
            className="task-composer__submit"
            onClick={handleSubmit}
            disabled={!task.trim() && files.length === 0}
          >
            Run Sovereign AI
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      {showFiles && (
        <FileDropzone
          files={files}
          onFilesChange={setFiles}
        />
      )}
    </div>
  );
}