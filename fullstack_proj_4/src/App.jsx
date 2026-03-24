import { useState } from "react";
import "./App.css";

// Utility imports — pure JS helpers, no React
import { createDoc } from "./utils/docUtils.js";
import {
  saveCurrentUser,
  loadCurrentUser,
  clearCurrentUser,
  getSavedFiles,
  saveDocToStorage,
  loadDocFromStorage,
} from "./utils/storageUtils.js";

// Component imports — each in its own folder by responsibility
import LoginScreen from "./components/Auth/LoginScreen.jsx";
import Toolbar from "./components/Toolbar/Toolbar.jsx";
import DocumentTabs from "./components/Tabs/DocumentTabs.jsx";
import VirtualKeyboard from "./components/Keyboard/VirtualKeyboard.jsx";

// ============================================================
// App — The root state orchestrator
// Holds ALL application state via useState and passes data + callbacks
// down to child components through props (prop drilling).
// No useEffect, no useContext, no custom hooks — only useState.
// ============================================================
function App() {
  // --- Part D: Authentication state ---
  // Initialize from localStorage so the user stays logged in across refreshes
  const [user, setUser] = useState(() => loadCurrentUser());

  // --- Part C: Multi-document state ---
  // Array of open document objects; starts with one blank document
  const [documents, setDocuments] = useState(() => [createDoc("Untitled")]);

  // ID of the currently focused/active document
  const [activeDocId, setActiveDocId] = useState(
    () => documents[0]?.id || null,
  );

  // Undo history: { [docId]: [previousTextString, ...] }
  const [undoHistory, setUndoHistory] = useState({});

  // --- Derived values (computed each render, not stored in state) ---
  const activeDoc = documents.find((d) => d.id === activeDocId) || null;
  const savedFiles = user ? getSavedFiles(user) : [];

  // =============================================================
  // LOGIN / LOGOUT HANDLERS
  // =============================================================

  const handleLogin = (username) => {
    saveCurrentUser(username);
    setUser(username);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setUser("");
    // Reset to a clean slate
    const fresh = createDoc("Untitled");
    setDocuments([fresh]);
    setActiveDocId(fresh.id);
    setUndoHistory({});
  };

  // Gate: if no user is logged in, render only the login screen
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // =============================================================
  // DOCUMENT UPDATE HELPER
  // Central function that updates the active document's fields.
  // If pushUndo is true, saves the current text to the undo stack first.
  // =============================================================
  const updateActiveDoc = (updater, pushUndo) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== activeDocId) return doc;
        if (pushUndo) {
          // Snapshot current text before the mutation
          setUndoHistory((h) => ({
            ...h,
            [doc.id]: [...(h[doc.id] || []), doc.text],
          }));
        }
        // Merge the fields returned by the updater into the doc
        return { ...doc, ...updater(doc) };
      }),
    );
  };

  // =============================================================
  // KEYBOARD ACTION HANDLERS
  // These are passed to VirtualKeyboard via props.
  // =============================================================

  const handleKeyPress = (key) => {
    if (!activeDoc) return;
    updateActiveDoc((doc) => ({ text: doc.text + key }), true);
  };

  const handleSpace = () => {
    if (!activeDoc) return;
    updateActiveDoc((doc) => ({ text: doc.text + " " }), true);
  };

  const handleDeleteChar = () => {
    if (!activeDoc) return;
    updateActiveDoc((doc) => ({ text: doc.text.slice(0, -1) }), true);
  };

  const handleDeleteWord = () => {
    if (!activeDoc) return;
    updateActiveDoc((doc) => {
      // Trim trailing spaces, then remove the last word
      const trimmed = doc.text.trimEnd();
      const lastSpace = trimmed.lastIndexOf(" ");
      return { text: lastSpace === -1 ? "" : trimmed.slice(0, lastSpace + 1) };
    }, true);
  };

  const handleDeleteAll = () => {
    if (!activeDoc) return;
    updateActiveDoc(() => ({ text: "" }), true);
  };

  // =============================================================
  // UNDO HANDLER
  // =============================================================

  const handleUndo = () => {
    if (!activeDoc) return;
    const stack = undoHistory[activeDoc.id] || [];
    if (stack.length === 0) return;
    const previousText = stack[stack.length - 1];
    // Pop the last entry off the undo stack
    setUndoHistory((h) => ({
      ...h,
      [activeDoc.id]: stack.slice(0, -1),
    }));
    // Restore the text directly (do NOT push to undo again)
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeDoc.id ? { ...doc, text: previousText } : doc,
      ),
    );
  };

  // =============================================================
  // FONT / LANGUAGE HANDLERS
  // =============================================================

  const handleChangeLang = () => {
    if (!activeDoc) return;
    updateActiveDoc(
      (doc) => ({ lang: doc.lang === "en" ? "he" : "en" }),
      false,
    );
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

  // =============================================================
  // FIND & REPLACE HANDLER
  // =============================================================

  const handleFindReplace = (find, replace) => {
    if (!activeDoc || !find) return;
    updateActiveDoc(
      (doc) => ({
        text: doc.text.split(find).join(replace),
      }),
      true,
    );
  };

  // =============================================================
  // FILE OPERATION HANDLERS (localStorage via storageUtils)
  // =============================================================

  const handleSave = () => {
    if (!activeDoc) return;
    saveDocToStorage(user, activeDoc.name, activeDoc);
    alert("Saved: " + activeDoc.name);
  };

  const handleSaveAs = () => {
    const name = prompt("Enter file name:");
    if (!name) return;
    // Rename the active document in state
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === activeDocId ? { ...doc, name } : doc)),
    );
    // Persist to localStorage under the new name
    saveDocToStorage(user, name, activeDoc);
    alert("Saved as: " + name);
  };

  const handleOpen = (fileName) => {
    const data = loadDocFromStorage(user, fileName);
    if (!data) {
      alert("File not found.");
      return;
    }
    // Create a new document tab populated with the loaded data
    const newDoc = {
      ...createDoc(fileName),
      text: data.text || "",
      fontFamily: data.fontFamily || "Arial",
      fontSize: data.fontSize || 16,
      fontColor: data.fontColor || "#000000",
      lang: data.lang || "en",
    };
    setDocuments((prev) => [...prev, newDoc]);
    setActiveDocId(newDoc.id);
  };

  // =============================================================
  // MULTI-DOCUMENT HANDLERS
  // =============================================================

  const handleNew = () => {
    const newDoc = createDoc("Untitled");
    setDocuments((prev) => [...prev, newDoc]);
    setActiveDocId(newDoc.id);
  };

  const handleCloseDoc = (docId) => {
    const doc = documents.find((d) => d.id === docId);
    // If the document has text, ask the user whether to save first
    if (doc && doc.text) {
      const shouldSave = confirm('Save "' + doc.name + '" before closing?');
      if (shouldSave) {
        saveDocToStorage(user, doc.name, doc);
      }
    }
    // Remove the document from the array
    const remaining = documents.filter((d) => d.id !== docId);
    if (remaining.length === 0) {
      // Always keep at least one document open
      const fresh = createDoc("Untitled");
      setDocuments([fresh]);
      setActiveDocId(fresh.id);
    } else {
      setDocuments(remaining);
      // If we just closed the active doc, switch focus to the first remaining
      if (activeDocId === docId) {
        setActiveDocId(remaining[0].id);
      }
    }
  };

  // =============================================================
  // RENDER
  // =============================================================

  return (
    <div className="app">
      {/* Header bar with app title, username, and logout button */}
      <div className="header-bar">
        <span>Visual Text Editor</span>
        <span>
          User: {user}
          <button
            onClick={handleLogout}
            style={{ marginLeft: 8, color: "#000" }}
          >
            Logout
          </button>
        </span>
      </div>

      {/* Toolbar: font controls, undo, find/replace, file operations */}
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

      {/* Document panels: each open document rendered as a tab + display */}
      <DocumentTabs
        documents={documents}
        activeDocId={activeDocId}
        onFocus={setActiveDocId}
        onClose={handleCloseDoc}
      />

      {/* Shared virtual keyboard: types into whichever document is active */}
      <VirtualKeyboard
        lang={activeDoc ? activeDoc.lang : "en"}
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
