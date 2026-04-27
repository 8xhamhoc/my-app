# Event Handlers & State
**Level:** Beginner · **Topic 05**

---

## Use Case
**Live character counter for a textarea** — every keystroke fires an `onChange` event, which updates state, which re-renders the counter in real time.

---

## The Core Idea

An event is a signal from the browser: "something just happened."
Your handler catches it, reads the new value, and updates state.
React re-renders. The UI reflects the change instantly.

```
User types a character
        │
        ▼
Browser fires onChange event
        │
        ▼
Your handler reads e.target.value
        │
        ▼
setText(e.target.value)     ← state update
        │
        ▼
React re-renders component
        │
        ▼
Counter shows new length
```

---

## Event Flow Diagram

```
Keyboard keystroke
      │
      ▼
<textarea onChange={handleChange} />
      │
      │  React calls handleChange(event)
      ▼
function handleChange(e) {
  setText(e.target.value)   ←── the full current string
}
      │
      │  setText triggers re-render
      ▼
CharacterCounter() re-runs
      │
      ├── text        = "Hello"   (new value)
      ├── charsUsed   = 5         (derived)
      ├── charsLeft   = 145       (derived)
      └── isOverLimit = false     (derived)
      │
      ▼
JSX re-renders counter: "5 / 150"
```

---

## Two Event Types in One Component

```
Event        Handler          When it fires
──────────────────────────────────────────────────
onChange     handleChange     Every keystroke in textarea
onClick      handleReset      Click on the Reset button
```

Same pattern for both:
1. Attach handler in JSX:  `onChange={handleChange}`
2. Handler calls a setter: `setText(...)`
3. State updates, React re-renders.

---

## Derived Values vs Stored State

This component has **1 state variable** but **4 values** the UI uses.
The extra three are **derived** — calculated from state on each render.

```
STATE (stored)            DERIVED (computed)
──────────────────        ──────────────────────────────────
text: string              charsUsed  = text.length
                          charsLeft  = MAX_CHARS - charsUsed
                          isOverLimit = charsUsed > MAX_CHARS
                          isNearLimit = charsLeft <= 20
```

> Rule: if a value can be calculated from existing state, do NOT
> store it as a separate useState. One source of truth = no sync bugs.

---

## Code Flow

```
1. Component mounts
   text = ""
   Counter shows "0 / 150"

2. User types "Hi"
   onChange fires 3 times (H → Hi)
   Each time: setText("H") → setText("Hi")
   Counter updates: "1 / 150" → "2 / 150"

3. User types 148 more characters (total 150)
   charsLeft = 0
   Counter shows "150 / 150"
   Colour stays neutral

4. User types one more character (total 151)
   isOverLimit = true
   Counter turns RED: "151 / 150"
   Textarea border turns red
   Warning message appears: "❌ 1 character over limit"

5. User clicks Reset
   onClick fires → handleReset() → setText("")
   text resets to ""
   Counter back to "0 / 150"
   Reset button becomes disabled (opacity 0.4)
```

---

## Event Object — What is `e`?

```tsx
function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
  setText(e.target.value);
}
```

```
e                   → the event object (browser sends this automatically)
e.target            → the DOM element that fired the event (the textarea)
e.target.value      → the current string inside the textarea
```

For buttons, the event is a MouseEvent:
```tsx
function handleReset(): void {
  setText("");   // no need to read e.target for a reset
}
```

---

## Common Event Types You Will Use Daily

```
Event         JSX attribute      Typical use
────────────────────────────────────────────────────────
Keystroke     onChange           text input, textarea, select
Button click  onClick            submit, toggle, delete, open modal
Form submit   onSubmit           form tag — use e.preventDefault()
Mouse hover   onMouseEnter       tooltips, hover effects
Focus/blur    onFocus / onBlur   input validation messages
```

---

## What to Try Next

1. Add a `minLength` check — show a warning if fewer than 10 characters.
2. Add an `onFocus` handler — when the textarea is focused, show a helper tip.
3. Disable the Reset button when `text === ""` (already done) — now also disable it when `isOverLimit` is true and see what changes.