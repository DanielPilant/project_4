// ============================================================
// Key — A single virtual keyboard button
// Props:
//   label   – the character or label to display on the key
//   onClick – callback fired when this key is pressed
//   wide    – optional boolean; if true, renders with the "wide" CSS class
// ============================================================
function Key({ label, onClick, wide }) {
  return (
    <button className={wide ? "wide" : ""} onClick={onClick}>
      {label}
    </button>
  );
}

export default Key;
