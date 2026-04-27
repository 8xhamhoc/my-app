import { useState } from "react";
import "./LoginForm_4.css";

export default function LoginForm4() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState({});
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);

  /* ── validation ─────────────────────────────── */
  function validate() {
    const next = {};
    if (!username.trim())        next.username = "Username is required.";
    if (password.length < 6)     next.password = "Password must be at least 6 characters.";
    return next;
  }

  /* ── handlers ───────────────────────────────── */
  function handleReset() {
    setUsername("");
    setPassword("");
    setErrors({});
    setSuccess(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) { setErrors(next); return; }

    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900)); // simulate request
    setLoading(false);
    setSuccess(true);
  }

  /* ── success screen ─────────────────────────── */
  if (success) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-success visible">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                   strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="success-text">Welcome back, {username}.</p>
            <p className="success-sub">You have logged in successfully.</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── form ───────────────────────────────────── */
  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* header */}
        <div className="login-header">
          <span className="login-eyebrow">Portal</span>
          <h1 className="login-title">Sign in</h1>
          <p className="login-subtitle">Enter your credentials to access your account.</p>
        </div>

        {/* form */}
        <form className="login-form" onSubmit={handleLogin} noValidate>

          {/* username */}
          <div className={`field ${errors.username ? "has-error" : ""}`}>
            <label htmlFor="username">Username</label>
            <div className="input-wrap">
              <input
                id="username"
                type="text"
                placeholder="e.g. minh.tran"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <span className="field-error">{errors.username}</span>
          </div>

          {/* password */}
          <div className={`field ${errors.password ? "has-error" : ""}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <input
                id="password"
                type="password"
                placeholder="Min. 6 characters"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span className="field-error">{errors.password}</span>
          </div>

          <div className="form-divider" />

          {/* buttons */}
          <div className="button-row">
            <button type="button" className="btn btn-reset" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="btn btn-login" disabled={loading}>
              {loading ? "Signing in…" : "Login"}
            </button>
          </div>

        </form>
      </div>

      {/* footer */}
      <div className="login-footer">
        Forgot your password? <a href="#">Reset it here</a>
      </div>
    </div>
  );
}
