// ============================================================
// storageUtils.js — Pure helper functions for localStorage I/O
// All functions are synchronous (no async/Promises).
// Each user's files are namespaced under the key prefix "vte_{username}_".
// ============================================================

// Return the key prefix for the given username
function userKey(username) {
  return 'vte_' + username + '_';
}

function saveCurrentUser(username) {
  localStorage.setItem('vte_currentUser', username);
}

function loadCurrentUser() {
  return localStorage.getItem('vte_currentUser') || '';
}

function clearCurrentUser() {
  localStorage.removeItem('vte_currentUser');
}

// Retrieve an array of saved file names for a specific user
function getSavedFiles(username) {
  const prefix = userKey(username);
  const files = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(prefix)) {
      files.push(key.slice(prefix.length));
    }
  }
  return files;
}

// Save document to local storage synchronously with error handling
function saveDocToStorage(username, fileName, doc) {
  const key = userKey(username) + fileName;
  const data = {
    text: doc.text,
    fontFamily: doc.fontFamily,
    fontSize: doc.fontSize,
    fontColor: doc.fontColor,
    lang: doc.lang
  };
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save document to storage", error);
    alert("Failed to save file. Local storage might be full.");
  }
}

// Load document from local storage synchronously with error handling
function loadDocFromStorage(username, fileName) {
  const key = userKey(username) + fileName;
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse document data", error);
    return null;
  }
}

export {
  saveCurrentUser,
  loadCurrentUser,
  clearCurrentUser,
  getSavedFiles,
  saveDocToStorage,
  loadDocFromStorage
};