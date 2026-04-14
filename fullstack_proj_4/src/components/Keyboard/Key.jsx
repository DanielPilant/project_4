import styles from "./Key.module.css";

// ============================================================
// Key — A single virtual keyboard button
// Props:
//   label    – the character or label to display on the key
//   onClick  – callback fired when this key is pressed
//   variant  – optional: 'shift' | 'enter' | 'space' | 'action' | 'special'
//   isActive – optional boolean; renders the key in a pressed/active state
// ============================================================
function Key({ label, onClick, variant, isActive }) {
  const classes = [
    styles.key,
    variant ? styles[variant] : "",
    isActive ? styles.active : "",
  ].join(" ");

  return (
    <button className={classes} onClick={onClick}>
      {label}
    </button>
  );
}

export default Key;
