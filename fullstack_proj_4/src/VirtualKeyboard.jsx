// English keyboard layout rows
const EN_ROWS = [
  ['1','2','3','4','5','6','7','8','9','0'],
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m']
];

// Hebrew keyboard layout rows
const HE_ROWS = [
  ['1','2','3','4','5','6','7','8','9','0'],
  ['\u05E7','\u05E8','\u05D0','\u05D8','\u05D5','\u05DF','\u05DD','\u05E4'],
  ['\u05E9','\u05D3','\u05D2','\u05DB','\u05E2','\u05D9','\u05D7','\u05DC'],
  ['\u05D6','\u05E1','\u05D1','\u05D4','\u05E0','\u05DE','\u05E6','\u05EA']
];

// Virtual keyboard component - types into whichever document is active
function VirtualKeyboard({ lang, onKeyPress, onSpace, onDeleteChar, onDeleteWord, onDeleteAll }) {
  // Pick layout based on current language
  const rows = lang === 'he' ? HE_ROWS : EN_ROWS;

  return (
    <div className="keyboard">
      {/* Render each row of keys */}
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: '2px', width: '100%' }}>
          {row.map((key) => (
            <button key={key} onClick={() => onKeyPress(key)}>{key}</button>
          ))}
        </div>
      ))}
      {/* Special keys row */}
      <div style={{ display: 'flex', gap: '2px', width: '100%' }}>
        <button className="wide" onClick={onSpace}>Space</button>
        <button onClick={() => onKeyPress('.')}>.</button>
        <button onClick={() => onKeyPress(',')}>,</button>
        <button onClick={() => onKeyPress('!')}> !</button>
        <button onClick={() => onKeyPress('?')}>?</button>
        <button onClick={onDeleteChar}>Del</button>
        <button onClick={onDeleteWord}>Del Word</button>
        <button onClick={onDeleteAll}>Del All</button>
      </div>
    </div>
  );
}

export default VirtualKeyboard;
