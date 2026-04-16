import styles from './TextDisplay.module.css';

function TextDisplay({ doc, isActive, onFocus, searchQuery }) {
  let lines = doc.text.split("\n");

  const textStyle = {
    fontFamily: doc.fontFamily,
    fontSize: doc.fontSize + "px",
    color: doc.fontColor,
  };

  const renderHighlightedText = (text) => {
    if (!searchQuery) return text;

    try {
      // escape special regex chars so the query is treated as a literal string
      const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
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
      return text;
    }
  };

  return (
    <div
      className={styles.docPanel + (isActive ? " " + styles.active : "")}
      onClick={onFocus}
    >
      <div className={styles.textArea} style={textStyle}>
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