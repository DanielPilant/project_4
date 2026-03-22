import { useState } from 'react';

// Simple login screen - just asks for a username (no real auth)
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    // Only login if username is not empty
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="login-screen">
      <h2>Visual Text Editor</h2>
      <p>Enter your username:</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginScreen;
