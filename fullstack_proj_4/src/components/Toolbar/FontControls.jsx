// ============================================================
// FontControls — Language toggle, font family, size, and color
// Props:
//   activeDoc       – the currently focused document (for reading current values)
//   onChangeLang    – callback to toggle EN/HE
//   onChangeFont    – callback(fontFamily)
//   onChangeFontSize  – callback(number)
//   onChangeFontColor – callback(hexString)
// ============================================================
function FontControls({ activeDoc, onChangeLang, onChangeFont, onChangeFontSize, onChangeFontColor }) {
  return (
    <>
      {/* Language toggle button — cycles between EN and HE */}
      <button onClick={onChangeLang}>
        Lang: {activeDoc ? activeDoc.lang.toUpperCase() : 'EN'}
      </button>

      {/* Font family dropdown */}
      <label>Font:</label>
      <select
        value={activeDoc ? activeDoc.fontFamily : 'Arial'}
        onChange={(e) => onChangeFont(e.target.value)}
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>

      {/* Font size dropdown */}
      <label>Size:</label>
      <select
        value={activeDoc ? activeDoc.fontSize : 16}
        onChange={(e) => onChangeFontSize(Number(e.target.value))}
      >
        <option value={12}>12</option>
        <option value={16}>16</option>
        <option value={20}>20</option>
        <option value={24}>24</option>
        <option value={32}>32</option>
      </select>

      {/* Color picker input */}
      <label>Color:</label>
      <input
        type="color"
        value={activeDoc ? activeDoc.fontColor : '#000000'}
        onChange={(e) => onChangeFontColor(e.target.value)}
      />
    </>
  );
}

export default FontControls;
