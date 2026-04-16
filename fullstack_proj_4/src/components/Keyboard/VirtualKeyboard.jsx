import styles from "./VirtualKeyboard.module.css";
import Key from "./Key.jsx";
import { useState } from "react";

const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

// what the number row shows when Shift is held
const SPECIAL_SHIFT_CHARS = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

const SIDE_SPECIAL_CHARS = [".", ",", "!", ";", ":", "'", '"', "-"];

const EN_LOW_ROWS = [
  [...NUMBERS],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

// shifted/uppercase English layout
const EN_UP_ROWS = [
  [...SPECIAL_SHIFT_CHARS],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const EMOJI_ROWS = [
  ["😀", "😂", "😍", "😎", "😭", "😡", "👍", "👎", "🙏", "💪"],
  ["🍎", "🍕", "🍔", "🍟", "🌭", "🍿", "🍩", "🍪"],
  ["⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉"],
  ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓"],
];

// On-screen keyboard — renders EN, HE, or emoji layout based on lang prop
function VirtualKeyboard({
  lang,
  onKeyPress,
  onSpace,
  onDeleteChar,
  onDeleteWord,
  onDeleteAll,
}) {
  const [isShift, setIsShift] = useState(false);

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

  // Enter goes at the end of the second-to-last row, Shift at the start of the last (EN only)
  const enterRowIndex = rows.length - 2;
  const shiftRowIndex = rows.length - 1;

  return (
    <div className={styles.keyboard}>
      <div className={styles.keyboardBody}>
        <div className={styles.mainSection}>
          <div className={styles.mainKeys}>
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                {rowIndex === shiftRowIndex && lang !== "em" && (
                  <Key
                    label="⇧ Shift"
                    onClick={() => setIsShift((prev) => !prev)}
                    variant="shift"
                    isActive={isShift}
                  />
                )}

                {row.map((keyChar) => (
                  <Key label={keyChar} onClick={() => onKeyPress(keyChar)} />
                ))}

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

          <div className={styles.spaceRow}>
            <Key label="Space" onClick={onSpace} variant="space" />
          </div>
        </div>

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
