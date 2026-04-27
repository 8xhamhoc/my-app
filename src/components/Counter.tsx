// Counter.jsx
// One component. One piece of state. Watch what happens on each click.

import { useState } from "react";

function Counter() {
  // ─── useState ────────────────────────────────────────────────
  // useState(0) creates a "memory slot" inside this component.
  //   count       → the current value  (starts at 0)
  //   setCount    → the only way to change it
  //
  // Rule: NEVER do  count = count + 1  directly.
  //       ALWAYS use setCount(...)  — that's what tells React to re-render.
  // ─────────────────────────────────────────────────────────────
  const [count, setCount] = useState(0);

  return (
    <div style={styles.card}>
      <h2 style={styles.label}>🖱️ Click Counter</h2>

      <p style={styles.count}>{count}</p>

      <div style={styles.row}>
        <button style={styles.btnMinus} onClick={() => setCount(count - 1)}>
          − Minus
        </button>
        <button style={styles.btnReset} onClick={() => setCount(0)}>
          Reset
        </button>
        <button style={styles.btnPlus} onClick={() => setCount(count + 1)}>
          + Plus
        </button>
      </div>

      {/* Conditional rendering driven by state */}
      <p style={styles.message}>
        {count === 0 && "Start clicking!"}
        {count > 0  && `Clicked ${count} time${count > 1 ? "s" : ""}. 🔼`}
        {count < 0  && `Gone negative! ${count} 🔽`}
      </p>
    </div>
  );
}

// ── styles ────────────────────────────────────────────────────
const styles = {
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "32px 40px",
    width: "320px",
    textAlign: "center",
    fontFamily: "sans-serif",
    boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
    margin: "60px auto",
  },
  label: { margin: "0 0 24px", fontSize: "16px", color: "#555" },
  count: { fontSize: "72px", fontWeight: "700", margin: "0 0 24px", color: "#1a1a1a" },
  row:   { display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" },
  btnMinus: { padding: "8px 16px", borderRadius: "8px", border: "1px solid #ddd", cursor: "pointer", background: "#fff5f5", color: "#c0392b", fontWeight: "500" },
  btnReset: { padding: "8px 16px", borderRadius: "8px", border: "1px solid #ddd", cursor: "pointer", background: "#f5f5f5", color: "#555",    fontWeight: "500" },
  btnPlus:  { padding: "8px 16px", borderRadius: "8px", border: "1px solid #ddd", cursor: "pointer", background: "#f0fff8", color: "#1a7a50",  fontWeight: "500" },
  message:  { fontSize: "14px", color: "#888", minHeight: "20px" },
};

export default Counter;