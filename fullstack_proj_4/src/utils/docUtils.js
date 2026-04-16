function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

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
