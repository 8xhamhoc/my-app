# Conditional Rendering from State
**Level:** Beginner · **Topic 04**

---

## Use Case
**Show / Hide password field** — a single boolean in state controls what three different parts of the UI render.

---

## The Core Idea

State holds a boolean. JSX reads it and decides what to show.
React re-runs the component every time the boolean flips.

```
showPassword = false          showPassword = true
─────────────────────         ────────────────────────
input type="password"  →      input type="text"
button says "👁 Show"  →      button says "🙈 Hide"
warning is hidden      →      warning is visible
```

---

## State Diagram

```
Component mounts
      │
      ▼
showPassword = false   ◄────────────────────┐
      │                                     │
      │  JSX renders:                       │
      │  • type="password"  (bullets)       │
      │  • button = "👁 Show"               │
      │  • warning = hidden                 │
      │                                     │
      │  user clicks "👁 Show"              │
      ▼                                     │
setShowPassword(!showPassword)              │
      │                                     │
      ▼                                     │
showPassword = true                         │
      │                                     │
      │  JSX re-renders:                    │
      │  • type="text"      (visible)       │
      │  • button = "🙈 Hide"              │
      │  • warning = shown                  │
      │                                     │
      │  user clicks "🙈 Hide"             │
      └─────────────────────────────────────┘
```

---

## 3 Ways to Write Conditional Rendering

All three are used in the component. Learn to read all of them.

### 1 — Ternary  `condition ? A : B`
Use when you need to swap between **two different things**.

```tsx
// Swap input type
type={showPassword ? "text" : "password"}

// Swap button label
{showPassword ? "🙈 Hide" : "👁 Show"}
```

### 2 — `&&` short-circuit  `condition && <Element />`
Use when you want to show **something or nothing**.

```tsx
// Render warning only when password is visible
{showPassword && (
  <p>⚠️ Make sure no one is looking.</p>
)}
```
> If `showPassword` is `false`, React renders nothing.
> If `showPassword` is `true`, React renders the `<p>`.

### 3 — Early return
Use when the **whole component** should show a different screen.

```tsx
if (!isLoggedIn) return <LoginPage />;
return <Dashboard />;
```

---

## Code Flow

```
ShowHidePassword() runs
        │
        │  1. useState<boolean>(false)
        │     showPassword = false
        │
        │  2. Returns JSX — input type="password"
        │     button shows "👁 Show"
        │     warning: hidden (false && ... = nothing)
        │
        │  ── user clicks the button ──
        │
        │  3. toggleVisibility() called
        │     setShowPassword(!false)  →  true
        │
        │  4. React re-runs ShowHidePassword()
        │     useState returns true this time
        │
        │  5. Returns new JSX:
        │     input type="text"   ← only this changed
        │     button = "🙈 Hide"  ← only this changed
        │     warning = visible   ← only this changed
        │
        ▼
    React patches only the 3 changed parts of the DOM
```

---

## Key Rule

```
State value       What JSX does
────────────────────────────────────────────────────────
false (default)   renders the "safe" version of the UI
true              renders the "revealed" version of the UI

The component code never changes.
Only the data (state) changes.
```

---

## What to Try Next

1. Add a second boolean `isLoggedIn`. If false, show only the login form. If true, show "Welcome!" — that's an early return.
2. Add a third state: `hasError: boolean`. If true, add a red border to the password input.
3. Try replacing the `&&` warning with a ternary — what is the difference in behaviour?