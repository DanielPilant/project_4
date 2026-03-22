import { useState } from 'react';

// Toolbar with font controls, find/replace, and file operations
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
  // Local state for find/replace inputs
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  // Local state for the "open" file selector
  const [selectedFile, setSelectedFile] = useState('');

  return (
    <div className="toolbar">
      {/* Language toggle */}
      <button onClick={onChangeLang}>
        Lang: {activeDoc ? activeDoc.lang.toUpperCase() : 'EN'}
      </button>

      {/* Font family selector */}
      <label>Font:</label>
      <select
        value={activeDoc ? activeDoc.fontFamily : 'Arial'}
        onChange={(e) => onChangeFont(e.target.value)}
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>

      {/* Font size selector */}
      <label>Size:</label>
      <select
        value={activeDoc ? activeDoc.fontSize : 16}
        onChange={(e) => onChangeFontSize(Number(e.target.value))}
      >
        <option value={12}>12</option>
        <option value={16}>16</option>
        <option value={20}>20</option>
        <option value={24}>24</option>
        <option value={32}>32</option>
      </select>

      {/* Font color picker */}
      <label>Color:</label>
      <input
        type="color"
        value={activeDoc ? activeDoc.fontColor : '#000000'}
        onChange={(e) => onChangeFontColor(e.target.value)}
      />

      {/* Undo button */}
      <button onClick={onUndo}>Undo</button>

      {/* Find and Replace */}
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

      {/* File operations */}
      <div className="file-ops">
        <button onClick={onNew}>New</button>
        <button onClick={onSave}>Save</button>
        <button onClick={onSaveAs}>Save As</button>

        {/* Open file dropdown */}
        <select value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
          <option value="">-- Select File --</option>
          {savedFiles.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <button onClick={() => { if (selectedFile) onOpen(selectedFile); }}>Open</button>
      </div>
    </div>
  );
}

export default Toolbar;
