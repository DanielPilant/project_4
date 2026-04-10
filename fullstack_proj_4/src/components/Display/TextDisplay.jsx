// ============================================================
// TextDisplay — Renders one document's formatted text
// Props:
//   doc      – the document object (text, fontFamily, fontSize, fontColor, lang)
//   isActive – boolean, true when this is the focused document
//   onFocus  – callback fired when the user clicks this panel
// ============================================================
function TextDisplay({ doc, isActive, onFocus }) {
  // Split the document's text into lines at newline characters
  let lines = doc.text.split("\n");

  // Build inline styles from the document's font settings
  const textStyle = {
    fontFamily: doc.fontFamily,
    fontSize: doc.fontSize + "px",
    color: doc.fontColor,
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
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextDisplay;
