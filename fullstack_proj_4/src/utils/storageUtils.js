// ============================================================
// storageUtils.js — Pure helper functions for localStorage I/O
// All functions are synchronous (no async/Promises).
// Each user's files are namespaced under the key prefix "vte_{username}_".
// ============================================================

// Return the key prefix for the given username
function userKey(username) {
  return 'vte_' + username + '_';
}

function registerUser(username, password) {
  const users = JSON.parse(localStorage.getItem('vte_users') || '{}');
  if (users[username]) {
    return { success: false, message: 'Username already exists' };
  }
  users[username] = password;
  localStorage.setItem('vte_users', JSON.stringify(users));
  return { success: true };
}

function authenticateUser(username, password) {
  const users = JSON.parse(localStorage.getItem('vte_users') || '{}');
  if (!users[username] || users[username] !== password) {
    return { success: false, message: 'Invalid username or password' };
  }
  return { success: true };
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
    console.error(error);
  }
}

function loadDocFromStorage(username, fileName) {
  const key = userKey(username) + fileName;
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export {
  registerUser,
  authenticateUser,
  saveCurrentUser,
  loadCurrentUser,
  clearCurrentUser,
  getSavedFiles,
  saveDocToStorage,
  loadDocFromStorage
};