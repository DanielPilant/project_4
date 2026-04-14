function Header({ user, onLogout }) {
  return (
    <header className="header-bar">
      <div style={{ fontSize: '18px', fontWeight: '700', color: '#e9d5ff', letterSpacing: '0.02em' }}>
        Visual Text Editor
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ color: '#c4b5fd', fontSize: '14px', fontWeight: '500' }}>
          Hello, <strong style={{ color: '#ffffff' }}>{user}</strong>
        </span>

        <button
          onClick={onLogout}
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: '600',
            backdropFilter: 'blur(4px)'
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
