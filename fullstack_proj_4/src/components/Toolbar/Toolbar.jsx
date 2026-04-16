import FontControls from "./FontControls.jsx";
import ActionControls from "./ActionControls.jsx";
import FileControls from "./FileControls.jsx";
import styles from "./Toolbar.module.css";

// ============================================================
// Toolbar — Wrapper that composes the toolbar sections
// ============================================================
function Toolbar({
  activeDoc,
  onChangeLang,
  onChangeFont,
  onChangeFontSize,
  onChangeFontColor,
  onUndo,
  onFindReplace,
  onSave,
  onSaveAs,
  onOpen,
  onNew,
  onDelete,
  savedFiles,
  onSearchChange,
  searchQuery,
}) {
  return (
    <div className={styles.toolbar}>
      {/* Section 1: Language and font styling controls */}
      <FontControls
        activeDoc={activeDoc}
        onChangeLang={onChangeLang}
        onChangeFont={onChangeFont}
        onChangeFontSize={onChangeFontSize}
        onChangeFontColor={onChangeFontColor}
      />

      {/* New Section: Real-time Find Input */}
      <div className={styles.findReplace}>
        <input
          type="text"
          placeholder="Real-time Find..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Section 2: Undo and find/replace */}
      <ActionControls onUndo={onUndo} onFindReplace={onFindReplace} />

      {/* Section 3: File management buttons */}
      <FileControls
        onNew={onNew}
        onSave={onSave}
        onSaveAs={onSaveAs}
        onOpen={onOpen}
        onDelete={onDelete}
        savedFiles={savedFiles}
      />
    </div>
  );
}

export default Toolbar;
