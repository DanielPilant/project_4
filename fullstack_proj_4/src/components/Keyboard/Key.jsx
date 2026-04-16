import styles from "./Key.module.css";

// Single keyboard button; variant controls styling, isActive renders it as pressed
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
