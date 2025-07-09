import React, { useState, useRef, useEffect } from "react";

const AutocompleteInput = ({
  value = [],
  onChange,
  placeholder = "Enter name",
  suggestions = [],
  className = "form-input",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  
  const dropdownRef = useRef(null);

  // Filter suggestions based on input value
  useEffect(() => {
    if (isOpen) {
      const filtered = suggestions
        .filter(
          (s) =>
            !value.includes(s) &&
            s.toLowerCase().includes(inputValue.trim().toLowerCase())
        );
      setFilteredSuggestions(filtered);
      setHighlightedIndex(-1);
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue, suggestions, value, isOpen]);

  // Handle input focus
  const handleFocus = () => {
    setIsOpen(true);
    setFilteredSuggestions(suggestions);
  };

  // Handle input blur (with delay to allow for clicks)
  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }, 200);
  };

  // Handle input change
  const handleChange = (e) => {
    const val = e.target.value;
    // If semicolon is present, split and add tags
    if (val.includes(";")) {
      const parts = val.split(";");
      const namesToAdd = parts
        .slice(0, -1)
        .map((n) => n.trim())
        .filter(
          (n) =>
            n.length > 0 &&
            !value.includes(n) &&
            suggestions.some((s) => s.toLowerCase() === n.toLowerCase())
        );
      if (namesToAdd.length > 0) {
        onChange([...value, ...namesToAdd]);
      }
      setInputValue(parts[parts.length - 1]);
    } else {
      setInputValue(val);
      setIsOpen(true);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (!value.includes(suggestion)) {
      onChange([...value, suggestion]);
    }
    setInputValue("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Remove tag
  const handleRemoveTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (isOpen && filteredSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[highlightedIndex]);
        } else if (
          inputValue.trim().length > 0 &&
          suggestions.some(
            (s) =>
              s.toLowerCase() === inputValue.trim().toLowerCase() &&
              !value.includes(s)
          )
        ) {
          // Add tag if input matches a suggestion
          const matched = suggestions.find(
            (s) =>
              s.toLowerCase() === inputValue.trim().toLowerCase() &&
              !value.includes(s)
          );
          if (matched) {
            onChange([...value, matched]);
            setInputValue("");
            setIsOpen(false);
          }
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }
    // Remove last tag with backspace if input is empty
    if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="autocomplete-container">
      <div className="tags-input-wrapper">
        {value.map((tag) => (
          <span key={tag} className="tag">
            <span>{tag}</span>
            <button
              type="button"
              className="tag-remove"
              onClick={() => handleRemoveTag(tag)}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className={`${className} floating-input`}
          autoComplete="off"
        />
      </div>
      {isOpen && filteredSuggestions.length > 0 && (
        <div ref={dropdownRef} className="autocomplete-dropdown">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`autocomplete-item${index === highlightedIndex ? " highlighted" : ""}`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div className="person-avatar">
                {suggestion
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <span className="person-name">{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
