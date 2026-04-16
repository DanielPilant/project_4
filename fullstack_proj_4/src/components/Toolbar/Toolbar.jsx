import FontControls from './FontControls.jsx';
import ActionControls from './ActionControls.jsx';
import FileControls from './FileControls.jsx';

// ============================================================
// Toolbar — Wrapper that composes the toolbar sections
// ============================================================
function Toolbar({
  activeDoc,
  searchQuery,
  onSearchChange,
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
  savedFiles
}) {
  return (
    <div className="toolbar">
      {/* Section 1: Language and font styling controls */}
      <FontControls
        activeDoc={activeDoc}
        onChangeLang={onChangeLang}
        onChangeFont={onChangeFont}
        onChangeFontSize={onChangeFontSize}
        onChangeFontColor={onChangeFontColor}
      />

      {/* New Section: Real-time Find Input */}
      <div className="find-replace">
        <input
          type="text"
          placeholder="Real-time Find..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Section 2: Undo and find/replace */}
      <ActionControls
        onUndo={onUndo}
        onFindReplace={onFindReplace}
      />

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