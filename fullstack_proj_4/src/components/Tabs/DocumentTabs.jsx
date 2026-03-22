import TextDisplay from '../Display/TextDisplay.jsx';

// ============================================================
// DocumentTabs — Renders all open documents as panels
// Each panel has a header (name + close button) and a TextDisplay.
// Props:
//   documents   – array of all open document objects
//   activeDocId – the ID of the currently focused document
//   onFocus     – callback(docId) to set a document as active
//   onClose     – callback(docId) to close a document
// ============================================================
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
