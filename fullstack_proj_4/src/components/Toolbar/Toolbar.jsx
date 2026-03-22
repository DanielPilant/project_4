import FontControls from './FontControls.jsx';
import ActionControls from './ActionControls.jsx';
import FileControls from './FileControls.jsx';

// ============================================================
// Toolbar — Wrapper that composes the three toolbar sections
// Simply delegates all props down to the appropriate sub-component.
// Props: (see each sub-component for details)
//   activeDoc, onChangeLang, onChangeFont, onChangeFontSize, onChangeFontColor
//   onUndo, onFindReplace
//   onNew, onSave, onSaveAs, onOpen, savedFiles
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
        savedFiles={savedFiles}
      />
    </div>
  );
}

export default Toolbar;
