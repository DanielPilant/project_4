import { useState } from "react";
import styles from "./FileControls.module.css";

// File operation buttons — New, Save, Save As, Open, Delete
// selectedFile tracks what's chosen in the dropdown
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
          <option value={f}>{f}</option>
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
