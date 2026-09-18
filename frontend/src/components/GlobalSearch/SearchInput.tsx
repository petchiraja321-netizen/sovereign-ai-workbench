import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SearchInput({
  value,
  onChange,
  inputRef,
}: SearchInputProps) {
  return (
    <div className="global-search-input">
      <Search
        size={18}
        className="global-search-input__icon"
      />

      <input
        ref={inputRef}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search the Sovereign Workbench..."
        autoComplete="off"
        spellCheck={false}
        aria-label="Search the Sovereign Workbench"
      />

      {value && (
        <button
          type="button"
          className="global-search-input__clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}

      <kbd>ESC</kbd>
    </div>
  );
}