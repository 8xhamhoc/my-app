# useState + Component — Simple Example

A counter with +, − and Reset buttons.
One component. One state. Everything else follows from that.

---

## File Structure

```
src/
├── App.jsx        ← Root. Just renders Counter.
└── Counter.jsx    ← One component that owns its own state.
```

---

## The Core Idea

Without `useState`, a component is **static** — it renders once and never changes.
`useState` gives a component a **memory slot** that survives re-renders.

```
 Without useState          With useState
 ──────────────────        ──────────────────────────────
 Props in → JSX out        Props in + STATE in → JSX out
 Renders once              Re-renders every time state changes
 Dead UI                   Live, interactive UI
```

---

## Anatomy of useState

```jsx
const [count, setCount] = useState(0);
```

```
useState(0)
    │
    │  returns a pair:
    ▼
┌───────────┐    ┌────────────────────────────────────┐
│  count    │    │  setCount                          │
│           │    │                                    │
│  current  │    │  the ONLY way to change count.     │
│  value    │    │  calling it triggers a re-render.  │
│  (= 0)    │    │                                    │
└───────────┘    └────────────────────────────────────┘

❌  count = count + 1     → React does NOT see this change
✅  setCount(count + 1)   → React re-renders the component
```

---

## Render Cycle Diagram

What happens from click to screen update — step by step.

```
User clicks "+ Plus"
        │
        ▼
onClick={() => setCount(count + 1)}
        │
        │  setCount tells React:
        │  "state changed — re-run the function"
        ▼
┌──────────────────────────────────────┐
│  Counter() runs again                │
│                                      │
│  const [count, setCount] =           │
│        useState(0)                   │
│            ↑                         │
│            React returns the NEW     │
│            value (1), not 0          │
│                                      │
│  Returns JSX with count = 1          │
└──────────────────────────────────────┘
        │
        ▼
React updates only the parts of the
DOM that changed (the number on screen)
        │
        ▼
User sees "1"
```

---

## State Lives Inside the Component

`count` belongs to **this instance** of `Counter`.
If you render `<Counter />` twice, each has its own independent count.

```
App
├── <Counter />   →  count = 3   (clicked 3 times)
└── <Counter />   →  count = 0   (never clicked)
         ↑
         Completely separate memory slots
```

---

## Full Code Flow

```
App.jsx
  └── renders <Counter />
                │
                │  Counter.jsx runs:
                │
                │  1. useState(0) creates memory slot
                │     count = 0
                │
                │  2. Returns JSX:
                │     <div>
                │       <p>{count}</p>       ← shows "0"
                │       <button onClick=     ← wired to setCount
                │         {()=>setCount(count+1)}>
                │     </div>
                │
                │  ── user clicks "+ Plus" ──
                │
                │  3. setCount(0 + 1) called
                │     React schedules re-render
                │
                │  4. Counter() runs AGAIN
                │     count is now 1
                │
                │  5. Returns new JSX:
                │     <p>1</p>    ← React patches only this
                │
                ▼
           Screen shows "1"
```

---

## The 3 Rules useState Enforces

| Rule | Why |
|------|-----|
| Always use the setter (`setCount`) | Direct mutation skips React's render cycle |
| State update triggers a re-render | React re-runs the function top to bottom |
| State persists between renders | Unlike a normal variable, which resets each call |

---

## How to Run

```bash
npm create vite@latest my-app -- --template react
cd my-app
# Replace src/App.jsx and add src/Counter.jsx
npm install
npm run dev
```

---

## What to Try Next

1. Add a second `<Counter />` in `App.jsx` — confirm they count independently.
2. Add a `step` prop to `Counter` so `+` adds by that amount instead of 1.
3. Prevent `count` from going below 0 — add a condition in the onClick.

These three changes teach you: independent state, props + state together, and conditional state updates.