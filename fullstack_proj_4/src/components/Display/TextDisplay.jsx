import styles from "./TextDisplay.module.css";

function TextDisplay({ doc, isActive, onFocus, searchQuery }) {
  let lines = doc.text.split("\n");

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
