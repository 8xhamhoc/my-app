// CharacterCounter.tsx
// Topic: Event Handlers & State
// Use case: Live character counter for a textarea
//
// Every keystroke fires an event → handler reads the value →
// calls the setter → React re-renders with the new count.

import { useState } from "react";

const MAX_CHARS = 150;

export default function CharacterCounter() {
  // ── state ──────────────────────────────────────────────
  // text  : what the user typed
  // The length is DERIVED from text — not stored separately
  const [text, setText] = useState<string>("");

  // Derived value — computed from state, not stored in state
  const charsUsed: number = text.length;
  const charsLeft: number = MAX_CHARS - charsUsed;
  const isOverLimit: boolean = charsUsed > MAX_CHARS;
  const isNearLimit: boolean = charsLeft <= 20 && !isOverLimit;

  // ── event handler ──────────────────────────────────────
  // Called on EVERY keystroke (onChange fires for each character)
  // e is the native browser event
  // e.target.value is the full current string in the textarea
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setText(e.target.value);       // ← update state with new text
  }

  // Handler for the Reset button — onClick event
  function handleReset(): void {
    setText("");                   // ← set state back to empty string
  }

  // ── counter colour logic ───────────────────────────────
  function getCounterColor(): string {
    if (isOverLimit)  return "#e53e3e";  // red
    if (isNearLimit)  return "#d97706";  // amber
    return "#888";                        // neutral
  }

  // ── render ─────────────────────────────────────────────
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>✍️ Write a post</h2>
        <p style={styles.subtitle}>What's on your mind?</p>

        {/*
          EVENT HANDLER — onChange
          Fires on every single keystroke.
          React re-renders the component each time.
        */}
        <textarea
          style={{
            ...styles.textarea,
            borderColor: isOverLimit ? "#e53e3e" : "#ddd",
          }}
          placeholder="Type something... (max 150 characters)"
          value={text}
          onChange={handleChange}
          rows={5}
        />

        {/* Live feedback — all driven by state */}
        <div style={styles.footer}>
          <div style={styles.hints}>
            {/*
              CONDITIONAL RENDERING from state
              Different messages appear at different thresholds
            */}
            {isOverLimit && (
              <span style={styles.hintDanger}>
                ❌ {Math.abs(charsLeft)} characters over limit
              </span>
            )}
            {isNearLimit && (
              <span style={styles.hintWarn}>
                ⚠️ Almost at the limit
              </span>
            )}
            {!isNearLimit && !isOverLimit && charsUsed > 0 && (
              <span style={styles.hintOk}>✅ Looking good</span>
            )}
          </div>

          {/* Counter — updates on every keystroke via state */}
          <span style={{ ...styles.counter, color: getCounterColor() }}>
            {charsUsed} / {MAX_CHARS}
          </span>
        </div>

        {/*
          EVENT HANDLER — onClick
          A different event type, same pattern:
          event fires → handler called → setState → re-render
        */}
        <button
          style={{
            ...styles.btn,
            opacity: charsUsed === 0 ? 0.4 : 1,
          }}
          onClick={handleReset}
          disabled={charsUsed === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// ── styles ──────────────────────────────────────────────────
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
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
  },
  title:    { margin: 0, fontSize: "20px", color: "#1a1a1a" },
  subtitle: { margin: 0, fontSize: "13px", color: "#888" },
  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    resize: "vertical",
    outline: "none",
    fontFamily: "sans-serif",
    lineHeight: 1.6,
    transition: "border-color 200ms",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hints:      { fontSize: "12px", display: "flex", gap: "8px" },
  hintDanger: { color: "#e53e3e", fontWeight: 500 },
  hintWarn:   { color: "#d97706", fontWeight: 500 },
  hintOk:     { color: "#2d9b6f", fontWeight: 500 },
  counter: {
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "monospace",
    transition: "color 200ms",
  },
  btn: {
    padding: "10px 16px",
    background: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    alignSelf: "flex-start",
    transition: "opacity 200ms",
  },
};