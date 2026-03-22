import { useState } from 'react';

// ============================================================
// LoginScreen — Mock authentication form
// Accepts a username string; calls onLogin(username) on submit.
// No real auth — just gates the app behind a username prompt.
// ============================================================
function LoginScreen({ onLogin }) {
  // Local state: the text the user is typing into the input
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    // Only proceed if the user typed something non-empty
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
        // Allow Enter key to submit
        onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginScreen;
