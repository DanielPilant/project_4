import { useState } from 'react';

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = username.trim();

    if (!cleanName) {
      setError('Please enter a valid username.');
      return;
    }

    const isValid = /^[a-zA-Z0-9א-ת]+$/.test(cleanName);
    
    if (!isValid) {
      setError('Username can only contain letters and numbers.');
      return;
    }

    onLogin(cleanName);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div>
          <h1 className="login-logo">Visual Text Editor</h1>
          <p className="login-subtitle">Please enter your username to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={handleInputChange}
            placeholder="Username..."
            autoComplete="off"
            autoFocus
          />
          
          {error && (
            <div style={{ color: 'var(--error-color, #e84118)', fontSize: '14px', marginTop: '-8px' }}>
              {error}
            </div>
          )}

          <button type="submit" className="login-button" disabled={!username.trim()}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;