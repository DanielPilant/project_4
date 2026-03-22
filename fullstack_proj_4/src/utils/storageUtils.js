// ============================================================
// storageUtils.js — Pure helper functions for localStorage I/O
// All functions are synchronous (no async/Promises).
// Each user's files are namespaced under the key prefix "vte_{username}_".
// ============================================================

// Build the localStorage key prefix for a given username
function userKey(username) {
  return 'vte_' + username + '_';
}

// --------------- Session helpers ---------------

// Persist the currently logged-in username
function saveCurrentUser(username) {
  localStorage.setItem('vte_currentUser', username);
}

// Read the persisted username (returns '' if none)
function loadCurrentUser() {
  return localStorage.getItem('vte_currentUser') || '';
}

// Clear the persisted username on logout
function clearCurrentUser() {
  localStorage.removeItem('vte_currentUser');
}

// --------------- File helpers ---------------

// Return an array of file names saved for a given user
function getSavedFiles(username) {
  const prefix = userKey(username);
  const files = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(prefix)) {
      // Strip the prefix to get the bare file name
      files.push(key.slice(prefix.length));
    }
  }
  return files;
}

// Save a document object to localStorage under the user's namespace
function saveDocToStorage(username, fileName, doc) {
  const key = userKey(username) + fileName;
  const data = {
    text: doc.text,
    fontFamily: doc.fontFamily,
    fontSize: doc.fontSize,
    fontColor: doc.fontColor,
    lang: doc.lang
  };
  localStorage.setItem(key, JSON.stringify(data));
}

// Load a document's data from localStorage; returns null if not found
function loadDocFromStorage(username, fileName) {
  const key = userKey(username) + fileName;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  return JSON.parse(raw);
}

export {
  saveCurrentUser,
  loadCurrentUser,
  clearCurrentUser,
  getSavedFiles,
  saveDocToStorage,
  loadDocFromStorage
};
