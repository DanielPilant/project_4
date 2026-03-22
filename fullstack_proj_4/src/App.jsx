import { useState } from 'react';
import './App.css';
import LoginScreen from './LoginScreen.jsx';
import Toolbar from './Toolbar.jsx';
import TextDisplay from './TextDisplay.jsx';
import VirtualKeyboard from './VirtualKeyboard.jsx';

// Helper: get the localStorage key prefix for a user
function userKey(user) {
  return 'vte_' + user + '_';
}

// Helper: list all saved file names for a user from localStorage
function getSavedFiles(user) {
  const prefix = userKey(user);
  const files = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(prefix)) {
      files.push(key.slice(prefix.length));
    }
  }
  return files;
}

// Helper: create a new blank document object
let nextId = 1;
function createDoc(name) {
  return {
    id: nextId++,
    name: name || 'Untitled',
    text: '',
    fontFamily: 'Arial',
    fontSize: 16,
    fontColor: '#000000',
    lang: 'en'
  };
}

function App() {
  // Part D: user authentication state (null = not logged in)
  const [user, setUser] = useState(() => localStorage.getItem('vte_currentUser') || '');

  // Part C: array of open documents
  const [documents, setDocuments] = useState(() => {
    // Start with one blank document
    return [createDoc('Untitled')];
  });

  // Which document is currently active/focused
  const [activeDocId, setActiveDocId] = useState(() => documents[0]?.id || null);

  // Undo history: map of docId -> array of previous text states
  const [undoHistory, setUndoHistory] = useState({});

  // Get the active document object
  const activeDoc = documents.find((d) => d.id === activeDocId) || null;

  // Get list of saved files for current user
  const savedFiles = user ? getSavedFiles(user) : [];

  // --- Login / Logout ---
  const handleLogin = (username) => {
    localStorage.setItem('vte_currentUser', username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('vte_currentUser');
    setUser('');
    // Reset documents to a fresh state
    const fresh = createDoc('Untitled');
    setDocuments([fresh]);
    setActiveDocId(fresh.id);
    setUndoHistory({});
  };

  // If not logged in, show login screen
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // --- Helper to update the active document ---
  // Pushes current text to undo stack before changing
  const updateActiveDoc = (updater, pushUndo) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== activeDocId) return doc;
        if (pushUndo) {
          // Save current text to undo history before modifying
          setUndoHistory((h) => ({
            ...h,
            [doc.id]: [...(h[doc.id] || []), doc.text]
          }));
        }
        return { ...doc, ...updater(doc) };
      })
    );
  };

  // --- Keyboard actions ---
  const handleKeyPress = (key) => {
    if (!activeDoc) return;
    updateActiveDoc((doc) => ({ text: doc.text + key }), true);
  };

  const handleSpace = () => {
    if (!activeDoc) return;
    updateActiveDoc((doc) => ({ text: doc.text + ' ' }), true);
  };

  const handleDeleteChar = () => {
    if (!activeDoc) return;
    updateActiveDoc((doc) => ({ text: doc.text.slice(0, -1) }), true);
  };

  const handleDeleteWord = () => {
    if (!activeDoc) return;
    updateActiveDoc((doc) => {
      // Remove trailing spaces then remove last word
      const trimmed = doc.text.trimEnd();
      const lastSpace = trimmed.lastIndexOf(' ');
      return { text: lastSpace === -1 ? '' : trimmed.slice(0, lastSpace + 1) };
    }, true);
  };

  const handleDeleteAll = () => {
    if (!activeDoc) return;
    updateActiveDoc(() => ({ text: '' }), true);
  };

  // --- Undo ---
  const handleUndo = () => {
    if (!activeDoc) return;
    const stack = undoHistory[activeDoc.id] || [];
    if (stack.length === 0) return;
    const previousText = stack[stack.length - 1];
    // Pop last entry from undo stack
    setUndoHistory((h) => ({
      ...h,
      [activeDoc.id]: stack.slice(0, -1)
    }));
    // Restore text without pushing to undo again
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeDoc.id ? { ...doc, text: previousText } : doc
      )
    );
  };

  // --- Font controls ---
  const handleChangeLang = () => {
    if (!activeDoc) return;
    updateActiveDoc((doc) => ({ lang: doc.lang === 'en' ? 'he' : 'en' }), false);
  };

  const handleChangeFont = (fontFamily) => {
    updateActiveDoc(() => ({ fontFamily }), false);
  };

  const handleChangeFontSize = (fontSize) => {
    updateActiveDoc(() => ({ fontSize }), false);
  };

  const handleChangeFontColor = (fontColor) => {
    updateActiveDoc(() => ({ fontColor }), false);
  };

  // --- Find & Replace ---
  const handleFindReplace = (find, replace) => {
    if (!activeDoc || !find) return;
    updateActiveDoc((doc) => ({
      text: doc.text.split(find).join(replace)
    }), true);
  };

  // --- File operations (Part B) ---
  const handleSave = () => {
    if (!activeDoc) return;
    // Save document data as JSON to localStorage under the user's namespace
    const key = userKey(user) + activeDoc.name;
    const data = {
      text: activeDoc.text,
      fontFamily: activeDoc.fontFamily,
      fontSize: activeDoc.fontSize,
      fontColor: activeDoc.fontColor,
      lang: activeDoc.lang
    };
    localStorage.setItem(key, JSON.stringify(data));
    alert('Saved: ' + activeDoc.name);
  };

  const handleSaveAs = () => {
    const name = prompt('Enter file name:');
    if (!name) return;
    // Update the active doc's name first
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeDocId ? { ...doc, name } : doc
      )
    );
    // Save to localStorage
    const key = userKey(user) + name;
    const data = {
      text: activeDoc.text,
      fontFamily: activeDoc.fontFamily,
      fontSize: activeDoc.fontSize,
      fontColor: activeDoc.fontColor,
      lang: activeDoc.lang
    };
    localStorage.setItem(key, JSON.stringify(data));
    alert('Saved as: ' + name);
  };

  const handleOpen = (fileName) => {
    const key = userKey(user) + fileName;
    const raw = localStorage.getItem(key);
    if (!raw) {
      alert('File not found.');
      return;
    }
    const data = JSON.parse(raw);
    // Create a new document tab with the loaded data
    const newDoc = {
      ...createDoc(fileName),
      text: data.text || '',
      fontFamily: data.fontFamily || 'Arial',
      fontSize: data.fontSize || 16,
      fontColor: data.fontColor || '#000000',
      lang: data.lang || 'en'
    };
    setDocuments((prev) => [...prev, newDoc]);
    setActiveDocId(newDoc.id);
  };

  // --- Multi-document (Part C) ---
  const handleNew = () => {
    const newDoc = createDoc('Untitled');
    setDocuments((prev) => [...prev, newDoc]);
    setActiveDocId(newDoc.id);
  };

  const handleCloseDoc = (docId) => {
    // Prompt user to save before closing
    const doc = documents.find((d) => d.id === docId);
    if (doc && doc.text) {
      const shouldSave = confirm('Save "' + doc.name + '" before closing?');
      if (shouldSave) {
        const key = userKey(user) + doc.name;
        const data = {
          text: doc.text,
          fontFamily: doc.fontFamily,
          fontSize: doc.fontSize,
          fontColor: doc.fontColor,
          lang: doc.lang
        };
        localStorage.setItem(key, JSON.stringify(data));
      }
    }
    // Remove the document
    const remaining = documents.filter((d) => d.id !== docId);
    if (remaining.length === 0) {
      // Always keep at least one document open
      const fresh = createDoc('Untitled');
      setDocuments([fresh]);
      setActiveDocId(fresh.id);
    } else {
      setDocuments(remaining);
      // If we closed the active doc, switch to the first remaining
      if (activeDocId === docId) {
        setActiveDocId(remaining[0].id);
      }
    }
  };

  return (
    <div className="app">
      {/* Header with user info */}
      <div className="header-bar">
        <span>Visual Text Editor</span>
        <span>
          User: {user}
          <button onClick={handleLogout} style={{ marginLeft: 8, color: '#000' }}>
            Logout
          </button>
        </span>
      </div>

      {/* Toolbar with all controls */}
      <Toolbar
        activeDoc={activeDoc}
        onChangeLang={handleChangeLang}
        onChangeFont={handleChangeFont}
        onChangeFontSize={handleChangeFontSize}
        onChangeFontColor={handleChangeFontColor}
        onUndo={handleUndo}
        onFindReplace={handleFindReplace}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onOpen={handleOpen}
        onNew={handleNew}
        savedFiles={savedFiles}
      />

      {/* Document display panels (Part C: multiple docs) */}
      <div className="docs-container">
        {documents.map((doc) => (
          <div key={doc.id} style={{ flex: 1, minWidth: 280 }}>
            {/* Document tab header with name and close button */}
            <div className="doc-panel-header">
              <span>{doc.name}</span>
              <button onClick={() => handleCloseDoc(doc.id)}>X</button>
            </div>
            {/* The formatted text display */}
            <TextDisplay
              doc={doc}
              isActive={doc.id === activeDocId}
              onFocus={() => setActiveDocId(doc.id)}
            />
          </div>
        ))}
      </div>

      {/* Shared virtual keyboard - types into the active document */}
      <VirtualKeyboard
        lang={activeDoc ? activeDoc.lang : 'en'}
        onKeyPress={handleKeyPress}
        onSpace={handleSpace}
        onDeleteChar={handleDeleteChar}
        onDeleteWord={handleDeleteWord}
        onDeleteAll={handleDeleteAll}
      />
    </div>
  );
}

export default App;
