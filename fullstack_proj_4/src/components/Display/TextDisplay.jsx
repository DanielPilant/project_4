import styles from './TextDisplay.module.css';

// ============================================================
// TextDisplay — Renders one document's formatted text
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
      className={styles.docPanel + (isActive ? " " + styles.active : "")}
      onClick={onFocus}
    >
      {/* The visible formatted text area */}
      <div className={styles.textArea} style={textStyle}>
        {lines.map((line, i) => (
          <div key={i} dir="auto">
            {/* Render the plain text line without highlighting */}
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextDisplay;