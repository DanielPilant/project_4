import { useState } from 'react';

// ============================================================
// FileControls — New, Save, Save As, and Open file buttons
// Owns local state for the "open file" dropdown selection.
// Props:
//   onNew       – callback to create a new blank document
//   onSave      – callback to save the active document
//   onSaveAs    – callback to save the active document under a new name
//   onOpen      – callback(fileName) to open a saved file
//   savedFiles  – array of file name strings available to open
// ============================================================
function FileControls({ onNew, onSave, onSaveAs, onOpen, savedFiles }) {
  // Local state: which file the user has selected in the dropdown
  const [selectedFile, setSelectedFile] = useState('');

  return (
    <div className="file-ops">
      <button onClick={onNew}>New</button>
      <button onClick={onSave}>Save</button>
      <button onClick={onSaveAs}>Save As</button>

      {/* Dropdown listing all saved files for the current user */}
      <select value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
        <option value="">-- Select File --</option>
        {savedFiles.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
      {/* Open button — only fires if a file is actually selected */}
      <button onClick={() => { if (selectedFile) onOpen(selectedFile); }}>Open</button>
    </div>
  );
}

export default FileControls;
