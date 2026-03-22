import { useState } from 'react';

// ============================================================
// ActionControls — Undo button and Find/Replace inputs
// Owns local state for the find/replace text fields.
// Props:
//   onUndo        – callback to undo the last text change
//   onFindReplace – callback(findStr, replaceStr)
// ============================================================
function ActionControls({ onUndo, onFindReplace }) {
  // Local state for the find and replace input values
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  return (
    <>
      {/* Undo button — restores previous text state */}
      <button onClick={onUndo}>Undo</button>

      {/* Find and Replace inline form */}
      <div className="find-replace">
        <input
          placeholder="Find"
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
        />
        <input
          placeholder="Replace"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />
        <button onClick={() => onFindReplace(findText, replaceText)}>Replace</button>
      </div>
    </>
  );
}

export default ActionControls;
