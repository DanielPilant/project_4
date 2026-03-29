// ============================================================
// docUtils.js — Document factory
// Creates blank document objects with default formatting.
// Uses a module-level counter to guarantee unique IDs.
// ============================================================

// Generate a basic unique string identifier
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Create and return a new document object with default properties
function createDoc(name) {
  return {
    id: generateId(),
    name: name || "Untitled",
    text: "",
    fontFamily: "Arial",
    fontSize: 16,
    fontColor: "#000000",
    lang: "en",
  };
}

export { createDoc };
