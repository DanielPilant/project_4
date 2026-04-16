import { useState } from 'react';
import styles from './Toolbar.module.css';

// Undo button and find/replace inputs
function ActionControls({ onUndo, onFindReplace }) {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  return (
    <>
      <button onClick={onUndo}>Undo</button>

      <div className={styles.findReplace}>
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
