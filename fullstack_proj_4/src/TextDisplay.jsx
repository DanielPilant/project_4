// Displays formatted text for a single document
function TextDisplay({ doc, isActive, onFocus }) {
  // Apply the document's font settings as inline styles
  const textStyle = {
    fontFamily: doc.fontFamily,
    fontSize: doc.fontSize + 'px',
    color: doc.fontColor,
    // Right-to-left direction for Hebrew
    direction: doc.lang === 'he' ? 'rtl' : 'ltr'
  };

  return (
    <div
      className={'doc-panel' + (isActive ? ' active' : '')}
      onClick={onFocus}
    >
      {/* Formatted text display area */}
      <div className="text-display" style={textStyle}>
        {doc.text || '(empty)'}
      </div>
    </div>
  );
}

export default TextDisplay;
