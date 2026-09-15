import type { ChangeEvent } from "react";

import {
  FileUp,
  Image,
  FileText,
  Table2,
  X,
} from "lucide-react";

interface FileDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
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

  return (
    <div className="file-dropzone">
      <label className="file-dropzone__area">
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          hidden
        />

        <div className="file-dropzone__icon">
          <FileUp size={22} />
        </div>

        <div>
          <p className="file-dropzone__title">
            Drop files here or browse
          </p>

          <p className="file-dropzone__description">
            PDF, DOCX, XLSX, CSV and images
          </p>
        </div>
      </label>

      {files.length > 0 && (
        <div className="file-dropzone__files">
          {files.map((file, index) => (
            <div
              className="file-item"
              key={`${file.name}-${index}`}
            >
              <div className="file-item__icon">
                {file.type.includes("image") ? (
                  <Image size={16} />
                ) : file.type.includes("sheet") ||
                  file.name.endsWith(".xlsx") ||
                  file.name.endsWith(".xls") ||
                  file.name.endsWith(".csv") ? (
                  <Table2 size={16} />
                ) : (
                  <FileText size={16} />
                )}
              </div>

              <div className="file-item__info">
                <p className="file-item__name">
                  {file.name}
                </p>

                <p className="file-item__size">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

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
      )}
    </div>
  );
}