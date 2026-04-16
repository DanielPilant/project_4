// ============================================================
// TextDisplay — Renders one document's formatted text
// ============================================================
function TextDisplay({ doc, isActive, onFocus, searchQuery }) {
  // Split the document's text into lines at newline characters
  let lines = doc.text.split("\n");

  // Build inline styles from the document's font settings
  const textStyle = {
    fontFamily: doc.fontFamily,
    fontSize: doc.fontSize + "px",
    color: doc.fontColor,
  };

  // Function to highlight matched text based on the search query
  const renderHighlightedText = (text) => {
    if (!searchQuery) return text;

    try {
      // Escape special regex characters in the search query to prevent crashes
      const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Create a case-insensitive regular expression
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
      
      // Split the text, keeping the matched parts in the resulting array
      const parts = text.split(regex);

      return parts.map((part, index) =>
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: '#fef08a' }}>
            {part}
          </span>
        ) : (
          part
        )
      );
    } catch {
      // Fallback in case of unexpected regex errors
      return text;
    }
  };

  return (
    <div
      className={"doc-panel" + (isActive ? " active" : "")}
      onClick={onFocus}
    >
      {/* The visible formatted text area */}
      <div className="text-area" style={textStyle}>
        {lines.map((line, i) => (
          <div key={i} dir="auto">
            {renderHighlightedText(line)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextDisplay;