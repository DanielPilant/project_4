// Language toggle, font family, size, and color controls
function FontControls({
  activeDoc,
  onChangeLang,
  onChangeFont,
  onChangeFontSize,
  onChangeFontColor,
}) {
  return (
    <>
      <button onClick={onChangeLang}>
        Lang: {activeDoc ? activeDoc.lang.toUpperCase() : "EN"}
      </button>

      <label>Font:</label>
      <select
        value={activeDoc ? activeDoc.fontFamily : "Arial"}
        onChange={(e) => onChangeFont(e.target.value)}
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>

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

      <label>Color:</label>
      <input
        type="color"
        value={activeDoc ? activeDoc.fontColor : "#000000"}
        onChange={(e) => onChangeFontColor(e.target.value)}
      />
    </>
  );
}

export default FontControls;
