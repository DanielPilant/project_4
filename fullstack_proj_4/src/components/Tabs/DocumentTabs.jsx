import TextDisplay from '../Display/TextDisplay.jsx';
import styles from './DocumentTabs.module.css';

function DocumentTabs({ documents, activeDocId, onFocus, onClose, searchQuery }) {
  return (
    <div className={styles.docsContainer}>
      {documents.map((doc) => (
        <div key={doc.id} style={{ flex: 1, minWidth: 280 }}>
          <div className={styles.docPanelHeader}>
            <span>{doc.name}</span>
            <button onClick={() => onClose(doc.id)}>X</button>
          </div>
          <TextDisplay
            doc={doc}
            isActive={doc.id === activeDocId}
            onFocus={() => onFocus(doc.id)}
            searchQuery={searchQuery}
          />
        </div>
      ))}
    </div>
  );
}

export default DocumentTabs;