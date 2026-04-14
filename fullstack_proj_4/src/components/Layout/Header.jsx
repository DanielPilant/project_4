function Header({ user, onLogout }) {
  return (
    <header 
      className="header-bar" 
      style={{
        backgroundColor: 'var(--panel-bg)', 
        color: 'var(--text-main)',        
        boxShadow: 'var(--shadow-sm)',      
        border: '1px solid var(--border)',  
        padding: '12px 20px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)' }}>
        Visual Text Editor
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ color: 'var(--text-light)', fontSize: '14px', fontWeight: '500' }}>
          Hello, <strong style={{ color: 'var(--text-main)' }}>{user}</strong>
        </span>
        
        <button 
          onClick={onLogout} 
          style={{ 
            backgroundColor: '#fee2e2', 
            color: '#dc2626',         
            padding: '6px 12px',
            fontSize: '13px',
            fontWeight: '600'
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;