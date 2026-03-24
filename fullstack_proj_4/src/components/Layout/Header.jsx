function header({ user, onLogout }) {
  return (
    <div className="header-bar">
      <span>Visual Text Editor</span>
      <span>
        User: {user}
        <button onClick={onLogout} style={{ marginLeft: 8, color: "#000" }}>
          Logout
        </button>
      </span>
    </div>
  );
}

export default header;
