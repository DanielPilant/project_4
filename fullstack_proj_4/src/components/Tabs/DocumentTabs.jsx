import TextDisplay from '../Display/TextDisplay.jsx';

function DocumentTabs({ documents, activeDocId, onFocus, onClose }) {
  return (
    <div className="docs-container">
      {documents.map((doc) => (
        <div key={doc.id} style={{ flex: 1, minWidth: 280 }}>
          {/* Tab header: shows file name and a close button */}
          <div className="doc-panel-header">
            <span>{doc.name}</span>
            <button onClick={() => onClose(doc.id)}>X</button>
          </div>
          {/* Formatted text display for this document */}
          <TextDisplay
            doc={doc}
            isActive={doc.id === activeDocId}
            onFocus={() => onFocus(doc.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default DocumentTabs;
