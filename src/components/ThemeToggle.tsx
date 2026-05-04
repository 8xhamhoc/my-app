// ThemeToggle.tsx
// Topic : What useState actually does
// Use case : Dark / Light mode toggle
//
// The ONLY goal of this file is to show one thing:
// calling setIsDark() makes React re-run this function,
// and the new boolean value changes what appears on screen.

import { useState } from "react";

export default function ThemeToggle() {
  // ─────────────────────────────────────────────────────────
  //  THIS IS THE ENTIRE POINT:
  //
  //  useState(false) creates a "memory slot" for this component.
  //  It survives every re-render — unlike a normal variable.
  //
  //  Returns TWO things:
  //    isDark    → read the current value
  //    setIsDark → the ONLY way to change it
  //
  //  Normal variable (won't work):
  //    let isDark = false;         ← resets to false on every render
  //    isDark = true;              ← React never knows it changed
  //
  //  useState (works):
  //    const [isDark, setIsDark] = useState(false);
  //    setIsDark(true);            ← React sees it, re-renders
  // ─────────────────────────────────────────────────────────
  const [isDark, setIsDark] = useState<boolean>(true);

  // Pick styles based on current state value
  const theme = isDark ? dark : light;

  return (
    <div style={{ ...styles.page, background: theme.bg }}>
      <div style={{ ...styles.card, background: theme.card, border: `1px solid ${theme.border}` }}>

        {/* Header */}
        <div style={styles.row}>
          <div>
            <p style={{ ...styles.eyebrow, color: theme.muted }}>useState demo</p>
            <h1 style={{ ...styles.title, color: theme.text }}>Theme Toggle</h1>
          </div>

          {/* The toggle button — one click, one state flip */}
          <button
            style={{ ...styles.toggle, background: theme.toggleBg, color: theme.text }}
            // onClick={() => setIsDark(!isDark)}
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Visual indicator — shows current state value */}
        <div style={{ ...styles.stateBox, background: theme.stateBg, border: `1px solid ${theme.border}` }}>
          <p style={{ ...styles.stateLabel, color: theme.muted }}>Current state value</p>
          <p style={{ ...styles.stateValue, color: theme.accent }}>
            isDark = <strong>{String(isDark)}</strong>
          </p>
          <p style={{ ...styles.stateHint, color: theme.muted }}>
            React re-ran this component because state changed.
          </p>
        </div>

        {/* Content that reacts to the theme */}
        <div style={{ ...styles.content, borderTop: `1px solid ${theme.border}` }}>
          <p style={{ ...styles.body, color: theme.text }}>
            Every time you click the button, <code style={{ color: theme.accent }}>setIsDark</code> is
            called. React re-runs <code style={{ color: theme.accent }}>ThemeToggle()</code> from the
            top, reads the new value of <code style={{ color: theme.accent }}>isDark</code>, and
            updates only the parts of the screen that changed.
          </p>
          <p style={{ ...styles.body, color: theme.muted, marginTop: 8 }}>
            No page reload. No manual DOM update. Just state → render.
          </p>
        </div>

      </div>
    </div>
  );
}

// ── theme tokens ─────────────────────────────────────────────
const light = {
  bg:       "#f0f2f5",
  card:     "#ffffff",
  border:   "#e0e0e0",
  text:     "#1a1a1a",
  muted:    "#888888",
  accent:   "#5b4fcf",
  stateBg:  "#f5f3ff",
  toggleBg: "#e8e8e8",
};
const dark = {
  bg:       "#0c0c0e",
  card:     "#18181c",
  border:   "#2a2a30",
  text:     "#e8e6f0",
  muted:    "#5a5868",
  accent:   "#a78bfa",
  stateBg:  "#1e1a2e",
  toggleBg: "#2a2830",
};

// ── base styles ───────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    transition: "background 300ms ease",
  },
  card: {
    borderRadius: "16px",
    padding: "32px",
    width: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    transition: "background 300ms ease, border 300ms ease",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: "0 0 4px",
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    margin: 0,
  },
  toggle: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    transition: "background 300ms ease",
  },
  stateBox: {
    borderRadius: "10px",
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    transition: "background 300ms ease",
  },
  stateLabel: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    margin: 0,
  },
  stateValue: {
    fontFamily: "monospace",
    fontSize: "18px",
    margin: "4px 0 0",
  },
  stateHint: {
    fontSize: "12px",
    margin: "6px 0 0",
  },
  content: {
    paddingTop: "20px",
  },
  body: {
    fontSize: "14px",
    lineHeight: 1.7,
    margin: 0,
  },
};