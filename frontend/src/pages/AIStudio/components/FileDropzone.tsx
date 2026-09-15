import {
  FileText,
  FileUp,
  Image,
  Table2,
  X,
} from "lucide-react";
import type { ChangeEvent } from "react";

interface FileDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

function getFileIcon(file: File) {
  if (file.type.startsWith("image/")) {
    return <Image size={15} />;
  }

  if (
    file.type.includes("spreadsheet") ||
    file.name.endsWith(".xlsx") ||
    file.name.endsWith(".xls") ||
    file.name.endsWith(".csv")
  ) {
    return <Table2 size={15} />;
  }

  return <FileText size={15} />;
}

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export function FileDropzone({
  files,
  onFilesChange,
}: FileDropzoneProps) {
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(
      event.target.files ?? [],
    );

    onFilesChange([...files, ...selectedFiles]);

    event.target.value = "";
  };

  const removeFile = (index: number) => {
    onFilesChange(
      files.filter((_, fileIndex) => fileIndex !== index),
    );
  };

  if (files.length === 0) {
    return (
      <label className="file-dropzone__empty">
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          hidden
        />

        <FileUp size={17} />

        <span>
          No files attached yet
        </span>
      </label>
    );
  }

  return (
    <div className="file-dropzone__files">
      {files.map((file, index) => (
        <div
          className="file-item"
          key={`${file.name}-${file.size}-${index}`}
        >
          <div className="file-item__icon">
            {getFileIcon(file)}
          </div>

          <div className="file-item__info">
            <p className="file-item__name">
              {file.name}
            </p>

            <p className="file-item__size">
              {formatFileSize(file.size)}
            </p>
          </div>

          <span className="file-item__ready">
            Ready
          </span>

          <button
            type="button"
            className="file-item__remove"
            onClick={() => removeFile(index)}
            aria-label={`Remove ${file.name}`}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}