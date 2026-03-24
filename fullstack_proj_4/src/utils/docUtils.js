// ============================================================
// docUtils.js — Document factory
// Creates blank document objects with default formatting.
// Uses a module-level counter to guarantee unique IDs.
// ============================================================

// Auto-incrementing ID counter (module-scoped, survives re-renders)
let nextId = 1;

// Create and return a new document object with sensible defaults
function createDoc(name) {
  return {
    id: nextId++,
    name: name || "Untitled",
    text: "",
    fontFamily: "Arial",
    fontSize: 16,
    fontColor: "#000000",
    lang: "en",
  };
}

export { createDoc };
