import styles from "./VirtualKeyboard.module.css";
import Key from "./Key.jsx";
import { useState } from "react";

// Character sets for different languages and key variants

// Number row and their shifted special characters (same for English and Hebrew)
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

// Shifted special characters for the number row (English and Hebrew)
const SPECIAL_SHIFT_CHARS = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

// Common special characters for the side panel (same for all languages)
const SIDE_SPECIAL_CHARS = [".", ",", "!", ";", ":", "'", '"', "-"];

// English keyboard layout — each sub-array is one row
const EN_LOW_ROWS = [
  [...NUMBERS],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

// Uppercase and shifted special characters for English layout
const EN_UP_ROWS = [
  [...SPECIAL_SHIFT_CHARS],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

// A fun extra row of emoji keys, same for both languages (Unicode characters)
const EMOJI_ROWS = [
  ["😀", "😂", "😍", "😎", "😭", "😡", "👍", "👎", "🙏", "💪"],
  ["🍎", "🍕", "🍔", "🍟", "🌭", "🍿", "🍩", "🍪"],
  ["⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉"],
  ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓"],
];

// ============================================================
// VirtualKeyboard — On-screen keyboard that types into the active document.
// Layout mimics a real physical keyboard:
//   • Letter/number rows are in the main section
//   • Enter key sits at the end of the second-to-last letter row (like ANSI layout)
//   • Shift sits at the start of the last letter row (English only)
//   • Space bar is a wide key centred below all rows
//   • A side panel holds delete-action keys and common special characters
//
// Props:
//   lang         – 'en' | 'he' | 'em', determines which layout to show
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
  const [isShift, setIsShift] = useState(false);

  // Hebrew keyboard layout — same structure, Hebrew characters
  const HE_ROWS = [
    isShift ? [...SPECIAL_SHIFT_CHARS] : [...NUMBERS],
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

  let rows;
  switch (lang) {
    case "en":
      rows = isShift ? EN_UP_ROWS : EN_LOW_ROWS;
      break;
    case "he":
      rows = HE_ROWS;
      break;
    case "em":
      rows = EMOJI_ROWS;
      break;
  }

  // Enter sits at the end of the second-to-last row (index length-2)
  // Shift sits at the start of the last row (index length-1), English only
  const enterRowIndex = rows.length - 2;
  const shiftRowIndex = rows.length - 1;

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardBody}>
        {/* ── left side panel: arrows -> left, right, up, down ─────────── */}
        {/* <div className={styles.leftSidePanel}>
          <Key label="←" onClick={() => onKeyPress("LEFT")} variant="action" />
          <Key label="→" onClick={() => onKeyPress("RIGHT")} variant="action" />
          <Key label="↑" onClick={() => onKeyPress("UP")} variant="action" />
          <Key label="↓" onClick={() => onKeyPress("DOWN")} variant="action" />
        </div> */}
        {/* ── Main keyboard area ───────────────────────────── */}
        <div className={styles.mainSection}>
          <div className={styles.mainKeys}>
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                {/* Shift at the start of the bottom letter row (English only) */}
                {rowIndex === shiftRowIndex && lang !== "em" && (
                  <Key
                    label="⇧ Shift"
                    onClick={() => setIsShift((prev) => !prev)}
                    variant="shift"
                    isActive={isShift}
                  />
                )}

                {/* Render each key in the current row */}
                {row.map((keyChar) => (
                  <Key label={keyChar} onClick={() => onKeyPress(keyChar)} />
                ))}

                {/* Enter at the end of the second-to-last row */}
                {rowIndex === enterRowIndex && (
                  <Key
                    label="Enter ↵"
                    onClick={() => onKeyPress("\n")}
                    variant="enter"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Wide spacebar centred below all letter rows */}
          <div className={styles.spaceRow}>
            <Key label="Space" onClick={onSpace} variant="space" />
          </div>
        </div>

        {/* ── right side panel: actions + special chars ─────────── */}
        <div className={styles.sidePanel}>
          <Key label="Del ⌫" onClick={onDeleteChar} variant="action" />
          <Key label="Del Word" onClick={onDeleteWord} variant="action" />
          <Key label="Del All" onClick={onDeleteAll} variant="action" />

          <div className={styles.sidePanelDivider} />

          <div className={styles.specialGrid}>
            {SIDE_SPECIAL_CHARS.map((char) => (
              <Key
                key={char}
                label={char}
                onClick={() => onKeyPress(char)}
                variant="special"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualKeyboard;
