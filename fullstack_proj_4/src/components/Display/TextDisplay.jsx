// ============================================================
// TextDisplay — Renders one document's formatted text
// Props:
//   doc      – the document object (text, fontFamily, fontSize, fontColor, lang)
//   isActive – boolean, true when this is the focused document
//   onFocus  – callback fired when the user clicks this panel
// ============================================================
function TextDisplay({ doc, isActive, onFocus }) {
  // Build inline styles from the document's font settings
  const textStyle = {
    fontFamily: doc.fontFamily,
    fontSize: doc.fontSize + 'px',
    color: doc.fontColor,
    // Switch to right-to-left when the language is Hebrew
    direction: doc.lang === 'he' ? 'rtl' : 'ltr'
  };

  return (
    <div
      className={'doc-panel' + (isActive ? ' active' : '')}
      onClick={onFocus}
    >
      {/* The visible formatted text area */}
      <div className="text-display" style={textStyle}>
        {doc.text || '(empty)'}
      </div>
    </div>
  );
}

export default TextDisplay;
