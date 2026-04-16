import { useState } from "react";
import styles from "./App.module.css";

import { createDoc } from "./utils/docUtils.js";
import {
  saveCurrentUser,
  loadCurrentUser,
  clearCurrentUser,
  getSavedFiles,
  saveDocToStorage,
  loadDocFromStorage,
  deleteDocFromStorage,
} from "./utils/storageUtils.js";

import AuthScreen from "./components/Auth/AuthScreen.jsx";
import Header from "./components/Layout/Header.jsx";
import Toolbar from "./components/Toolbar/Toolbar.jsx";
import DocumentTabs from "./components/Tabs/DocumentTabs.jsx";
import VirtualKeyboard from "./components/Keyboard/VirtualKeyboard.jsx";

// Root component — all state lives here and gets passed down as props
function App() {
  //#region State

  const [user, setUser] = useState(() => loadCurrentUser());

  const [documents, setDocuments] = useState(() => [createDoc("Untitled")]);

  const [activeDocId, setActiveDocId] = useState(
    () => documents[0]?.id || null,
  );

  // { [docId]: string[] } — stack of previous text snapshots per document
  const [undoHistory, setUndoHistory] = useState({});

  const [searchQuery, setSearchQuery] = useState("");

  const activeDoc = documents.find((d) => d.id === activeDocId) || null;
  const savedFiles = user ? getSavedFiles(user) : [];

  //#endregion

  //#region LOGIN / LOGOUT HANDLERS

  const handleLogin = (username) => {
    saveCurrentUser(username);
    setUser(username);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setUser("");
    const fresh = createDoc("Untitled");
    setDocuments([fresh]);
    setActiveDocId(fresh.id);
    setUndoHistory({});
  };

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  //#endregion

  //#region Document Update Helper
  const updateActiveDoc = (updater, pushUndo) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== activeDocId) return doc;
        if (pushUndo) {
          // snapshot text before the change
          setUndoHistory((history) => {
            let stack = [...(history[doc.id] || [])];

            stack.push(doc.text);

            let newFullHistory = { ...history, [doc.id]: stack };

            return newFullHistory;
          });
        }
        // Merge the fields returned by the updater into the doc
        return { ...doc, ...updater(doc) };
      }),
    );
  };
  //#endregion

  //#region KEYBOARD ACTION HANDLERS
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
      // trim trailing spaces first, then cut back to the previous space
      const trimmed = doc.text.trimEnd();
      const lastSpace = trimmed.lastIndexOf(" ");
      return { text: lastSpace === -1 ? "" : trimmed.slice(0, lastSpace + 1) };
    }, true);
  };

  const handleDeleteAll = () => {
    if (!activeDoc) return;
    updateActiveDoc(() => ({ text: "" }), true);
  };

  //#endregion

  //#region UNDO HANDLER
  const handleUndo = () => {
    if (!activeDoc) return;
    const stack = undoHistory[activeDoc.id] || [];
    if (stack.length === 0) return;
    const previousText = stack[stack.length - 1];
    setUndoHistory((history) => ({
      ...history,
      [activeDoc.id]: stack.slice(0, -1),
    }));
    // Restore the text directly (do NOT push to undo again)
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeDoc.id ? { ...doc, text: previousText } : doc,
      ),
    );
  };
  //#endregion

  //#region FONT / LANGUAGE HANDLERS
  const handleChangeLang = () => {
    if (!activeDoc) return;
    updateActiveDoc((doc) => {
      let lang = doc.lang;
      switch (doc.lang) {
        case "en":
          lang = "he";
          break;
        case "he":
          lang = "em";
          break;
        case "em":
          lang = "en";
          break;
        default:
          lang = "en";
      }
      return { lang };
    }, false);
  };

  const handleChangeFont = (fontFamily) => {
    if (activeDoc && activeDoc.lang === "em") return; // Don't allow font changes in emoji mode
    updateActiveDoc(() => ({ fontFamily }), false);
  };

  const handleChangeFontSize = (fontSize) => {
    updateActiveDoc(() => ({ fontSize }), false);
  };

  const handleChangeFontColor = (fontColor) => {
    updateActiveDoc(() => ({ fontColor }), false);
  };
  //#endregion

  //#region FIND & REPLACE HANDLER
  const handleFindReplace = (find, replace) => {
    if (!activeDoc || !find) return;
    updateActiveDoc(
      (doc) => ({
        text: doc.text.replaceAll(find, replace),
      }),
      true,
    );
  };
  //#endregion

  //#region FILE OPERATION HANDLERS (localStorage via storageUtils)
  const handleSave = () => {
    if (!activeDoc) return;
    saveDocToStorage(user, activeDoc.name, activeDoc);
    alert("Saved: " + activeDoc.name);
  };

  const handleSaveAs = () => {
    const name = prompt("Enter file name:");
    if (!name) return;
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === activeDocId ? { ...doc, name } : doc)),
    );
    saveDocToStorage(user, name, activeDoc);
    alert("Saved as: " + name);
  };

  const handleOpen = (fileName) => {
    const data = loadDocFromStorage(user, fileName);
    if (!data) {
      alert("File not found.");
      return;
    }
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

  const handleDelete = (fileName) => {
    const shouldDelete = confirm(
      `Are you sure you want to delete "${fileName}"?`,
    );
    if (shouldDelete) {
      deleteDocFromStorage(user, fileName);
      setDocuments((prev) => {
        const remaining = prev.filter((doc) => doc.name !== fileName);
        if (remaining.length === 0) {
          const fresh = createDoc("Untitled");
          setActiveDocId(fresh.id);
          return [fresh];
        }
        if (activeDocId === prev.find((d) => d.name === fileName)?.id) {
          setActiveDocId(remaining[0].id);
        }
        return remaining;
      });
    }
  };

  //#endregion

  //#region MULTI-DOCUMENT HANDLERS
  const handleNew = () => {
    const newDoc = createDoc(
      "Untitled" + (documents.length > 0 ? ` (${documents.length})` : ""),
    );
    setDocuments((prev) => [...prev, newDoc]);
    setActiveDocId(newDoc.id);
  };

  const handleCloseDoc = (docId) => {
    const doc = documents.find((d) => d.id === docId);
    // offer to save if there's anything worth keeping
    if (doc && doc.text) {
      const shouldSave = confirm('Save "' + doc.name + '" before closing?');
      if (shouldSave) {
        saveDocToStorage(user, doc.name, doc);
      }
    }

    const remaining = documents.filter((doc) => doc.id !== docId);
    if (remaining.length === 0) {
      // Always keep at least one document open
      const fresh = createDoc("Untitled");
      setDocuments([fresh]);
      setActiveDocId(fresh.id);
    } else {
      setDocuments(remaining);
      // if we closed the active tab, move focus to the first remaining one
      if (activeDocId === docId) {
        setActiveDocId(remaining[0].id);
      }
    }
  };
  //#endregion

  //#region RENDER
  return (
    <div className={styles.app}>
      <Header user={user} onLogout={handleLogout} />

      <Toolbar
        activeDoc={activeDoc}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
        onDelete={handleDelete}
        savedFiles={savedFiles}
      />

      <DocumentTabs
        documents={documents}
        activeDocId={activeDocId}
        onFocus={setActiveDocId}
        onClose={handleCloseDoc}
        searchQuery={searchQuery}
      />

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

  //#endregion
}

export default App;
