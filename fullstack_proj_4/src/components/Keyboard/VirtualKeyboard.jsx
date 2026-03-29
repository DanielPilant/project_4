import Key from "./Key.jsx";

// English keyboard layout — each sub-array is one row
const EN_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

// Hebrew keyboard layout — same structure, Hebrew characters
const HE_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  [
    "\u05E7",
    "\u05E8",
    "\u05D0",
    "\u05D8",
    "\u05D5",
    "\u05DF",
    "\u05DD",
    "\u05E4",
  ],
  [
    "\u05E9",
    "\u05D3",
    "\u05D2",
    "\u05DB",
    "\u05E2",
    "\u05D9",
    "\u05D7",
    "\u05DC",
  ],
  [
    "\u05D6",
    "\u05E1",
    "\u05D1",
    "\u05D4",
    "\u05E0",
    "\u05DE",
    "\u05E6",
    "\u05EA",
  ],
];

// A fun extra row of emoji keys, same for both languages (Unicode characters)
const EMOJI_ROWS = [
  ["😀", "😂", "😍", "😎", "😭", "😡", "👍", "👎", "🙏", "💪"],
  ["🍎", "🍕", "🍔", "🍟", "🌭", "🍿", "🍩", "🍪"],
  ["⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉"],
  ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓"],
];

// ============================================================
// VirtualKeyboard — On-screen keyboard that types into the active document
// Selects EN or HE layout based on the lang prop, renders each key
// via the Key component, and includes a special keys row at the bottom.
// Props:
//   lang         – 'en' or 'he', determines which layout to show
//   onKeyPress   – callback(character) for regular keys
//   onSpace      – callback for the space bar
//   onDeleteChar – callback to delete one character
//   onDeleteWord – callback to delete the last word
//   onDeleteAll  – callback to clear all text
// ============================================================
function VirtualKeyboard({
  lang,
  onKeyPress,
  onSpace,
  onDeleteChar,
  onDeleteWord,
  onDeleteAll,
}) {
  // Choose the correct layout based on the active language
  let rows; // Default to English
  switch (lang) {
    case "en":
      rows = EN_ROWS;
      break;
    case "he":
      rows = HE_ROWS;
      break;
    case "em":
      rows = EMOJI_ROWS; // Fallback to English if unknown
  }

  return (
    <div className="keyboard">
      {/* Render character key rows */}
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: "2px", width: "100%" }}>
          {row.map((keyChar) => (
            <Key
              key={keyChar}
              label={keyChar}
              onClick={() => onKeyPress(keyChar)}
            />
          ))}
        </div>
      ))}

      <div style={{ display: "flex", gap: "2px", width: "100%" }}>
        <Key label="Space" onClick={onSpace} wide />
        <Key label="." onClick={() => onKeyPress(".")} />
        <Key label="," onClick={() => onKeyPress(",")} />
        <Key label="!" onClick={() => onKeyPress("!")} />
        <Key label="?" onClick={() => onKeyPress("?")} />
        <Key label="Del" onClick={onDeleteChar} />
        <Key label="Del Word" onClick={onDeleteWord} />
        <Key label="Del All" onClick={onDeleteAll} />
      </div>
    </div>
  );
}

export default VirtualKeyboard;
