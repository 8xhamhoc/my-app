# Task Flow README

This document explains how data moves through the app when:

1. The **Add Task** button in `TaskInput` is clicked.
2. The **Delete** button in a `TaskItem` is clicked.

## Components Involved

- `App.tsx`: owns the `tasks` state and update handlers.
- `TaskInput.tsx`: collects text and triggers `onAddTask(title)`.
- `TaskList.tsx`: renders all tasks.
- `TaskItem.tsx`: renders one task and triggers `onDelete(id)`.

## High-Level Diagram

```mermaid
flowchart TD
  A[User types in TaskInput] --> B[Click Add Task]
  B --> C[TaskInput onClick]
  C --> D{title.trim() not empty?}
  D -- No --> E[Do nothing]
  D -- Yes --> F[onAddTask(title)]
  F --> G[App.handleAddTask]
  G --> H[setTasks(prev => [...prev, newTask])]
  H --> I[React re-render]
  I --> J[TaskList maps tasks]
  J --> K[TaskItem displayed]

  K --> L[User clicks Delete]
  L --> M[TaskItem onClick]
  M --> N[onDelete(task.id)]
  N --> O[App.handleDelete]
  O --> P[setTasks(prev => prev.filter(...))]
  P --> Q[React re-render]
  Q --> R[TaskList updated without deleted task]
```

## Flow 1: Add Task Button (`TaskInput`)

1. User enters text into the input.
2. `value` state in `TaskInput` updates via `onChange`.
3. User clicks **Add Task**.
4. `TaskInput` trims the value: `const title = value.trim()`.
5. If `title` is empty, nothing happens.
6. If `title` is valid:
   - Calls `onAddTask(title)` (function received from `App`).
   - Clears local input state with `setValue('')`.
7. In `App`, `handleAddTask` runs:
   - Creates a task object with `id: crypto.randomUUID()` and `title`.
   - Updates state immutably:
     - `setTasks((prev) => [...prev, newTask])`
8. React re-renders `App` and children.
9. `TaskList` receives the new `tasks` array and renders one more `TaskItem`.

## Flow 2: Delete Button (`TaskItem`)

1. User clicks **Delete** on a task row.
2. `TaskItem` executes:
   - `onDelete(task.id)`
3. In `App`, `handleDelete(id)` runs:
   - Updates state immutably:
     - `setTasks((prev) => prev.filter((task) => task.id !== id))`
4. React re-renders `App` and children.
5. `TaskList` receives the filtered `tasks` array.
6. The matching `TaskItem` is no longer rendered.

## Why This Works Well

- **Single source of truth**: `tasks` lives only in `App`.
- **Unidirectional data flow**:
  - Data goes down as props (`tasks`).
  - Events go up as callbacks (`onAddTask`, `onDelete`).
- **Immutable updates** keep React rendering predictable and efficient.
