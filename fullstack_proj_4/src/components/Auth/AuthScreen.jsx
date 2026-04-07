import { useState } from 'react';
import { registerUser, authenticateUser } from '../../utils/storageUtils.js';

function AuthScreen({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = username.trim();
    const cleanPassword = password.trim();

    if (!cleanName || !cleanPassword) {
      setError('Please enter username and password.');
      return;
    }

    const isValid = /^[a-zA-Z0-9א-ת_]+$/.test(cleanName);
    
    if (!isValid) {
      setError('Username can only contain letters, numbers and underscores.');
      return;
    }

    if (isLoginMode) {
      const result = authenticateUser(cleanName, cleanPassword);
      if (result.success) {
        onLogin(cleanName);
      } else {
        setError(result.message);
      }
    } else {
      const result = registerUser(cleanName, cleanPassword);
      if (result.success) {
        onLogin(cleanName);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div>
          <h1 className="login-logo">Visual Text Editor</h1>
          <p className="login-subtitle">
            {isLoginMode ? 'Login to your account' : 'Create a new account'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={handleInputChange(setUsername)}
            placeholder="Username..."
            autoComplete="off"
            autoFocus
          />
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={handleInputChange(setPassword)}
            placeholder="Password..."
          />
          
          {error && (
            <div style={{ color: 'var(--error-color, #e84118)', fontSize: '14px', marginTop: '-8px' }}>
              {error}
            </div>
          )}

          <button type="submit" className="login-button" disabled={!username.trim() || !password.trim()}>
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>
        
        <button 
          onClick={() => { setIsLoginMode(!isLoginMode); setError(''); setPassword(''); }}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', marginTop: '10px' }}
        >
          {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthScreen;