import { useState } from "react";
import styles from "./FileControls.module.css";

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
function FileControls({
  onNew,
  onSave,
  onSaveAs,
  onOpen,
  onDelete,
  savedFiles,
}) {
  const [selectedFile, setSelectedFile] = useState("");

  return (
    <div className={styles.fileOps}>
      <button onClick={onNew}>New</button>
      <button onClick={onSave}>Save</button>
      <button onClick={onSaveAs}>Save As</button>

      <select
        value={selectedFile}
        onChange={(e) => setSelectedFile(e.target.value)}
      >
        <option value="">-- Select File --</option>
        {savedFiles.map((f) => (
          <option>{f}</option>
        ))}
      </select>

      <button disabled={!selectedFile} onClick={() => onOpen(selectedFile)}>
        Open
      </button>

      <button
        disabled={!selectedFile}
        onClick={() => {
          onDelete(selectedFile);
          setSelectedFile("");
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default FileControls;
