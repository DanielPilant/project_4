import FontControls from "./FontControls.jsx";
import ActionControls from "./ActionControls.jsx";
import FileControls from "./FileControls.jsx";
import styles from "./Toolbar.module.css";

// Toolbar — font, search, undo/replace, and file controls
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
      <FontControls
        activeDoc={activeDoc}
        onChangeLang={onChangeLang}
        onChangeFont={onChangeFont}
        onChangeFontSize={onChangeFontSize}
        onChangeFontColor={onChangeFontColor}
      />

      <div className={styles.findReplace}>
        <input
          type="text"
          placeholder="Real-time Find..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <ActionControls onUndo={onUndo} onFindReplace={onFindReplace} />

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
