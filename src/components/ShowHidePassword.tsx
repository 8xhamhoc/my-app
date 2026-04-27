// ShowHidePassword.tsx
// Topic: Conditional Rendering from State
// Use case: Show / Hide password field
//
// ONE boolean in state controls what the user sees.
// The component re-runs every time the boolean flips.

import { useState } from "react";

export default function ShowHidePassword() {
  // ── state ──────────────────────────────────────────────
  // false = password hidden (default)
  // true  = password visible
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // ── handler ────────────────────────────────────────────
  // Flip the boolean — React re-renders, JSX picks the new value
  function toggleVisibility(): void {
    setShowPassword(!showPassword);
  }

  // ── render ─────────────────────────────────────────────
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Sign In</h2>

        {/* Username — no state needed, always visible */}
        <div style={styles.field}>
          <label style={styles.label}>Username</label>
          <input style={styles.input} type="text" placeholder="your username" />
        </div>

        {/* Password — type changes based on showPassword state */}
        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <div style={styles.inputRow}>
            {/*
              CONDITIONAL RENDERING — point 1
              type="password" hides text with bullets
              type="text"     shows the real characters
              The condition is the state variable: showPassword
            */}
            <input
              style={{ ...styles.input, flex: 1 }}
              type={showPassword ? "text" : "password"}
              placeholder="your password"
            />

            {/*
              CONDITIONAL RENDERING — point 2
              The button label also changes based on the same state
            */}
            <button style={styles.toggleBtn} onClick={toggleVisibility}>
              {showPassword ? "🙈 Hide" : "👁 Show"}
            </button>
          </div>
        </div>

        {/*
          CONDITIONAL RENDERING — point 3
          An entire extra message appears only when the password is visible.
          If showPassword is false, nothing renders here (&&  short-circuits).
        */}
        {showPassword && (
          <p style={styles.warning}>
            ⚠️ Make sure no one is looking at your screen.
          </p>
        )}

        <button style={styles.submitBtn}>Login</button>
      </div>
    </div>
  );
}

// ── styles ─────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f5",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "32px 36px",
    width: "340px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
  },
  title:    { margin: 0, fontSize: "20px", color: "#1a1a1a" },
  field:    { display: "flex", flexDirection: "column", gap: "6px" },
  label:    { fontSize: "12px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em" },
  input:    { padding: "10px 12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", outline: "none" },
  inputRow: { display: "flex", gap: "8px" },
  toggleBtn:{
    padding: "10px 12px",
    background: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    whiteSpace: "nowrap",
    fontWeight: 500,
  },
  warning: {
    background: "#fff8e1",
    border: "1px solid #ffe082",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "12px",
    color: "#7a5c00",
    margin: 0,
  },
  submitBtn: {
    padding: "12px",
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};