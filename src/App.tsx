import { useState } from 'react'
import './App.css'
import TaskInput from './components/TaskInput'
import Header from './components/Header'
import TaskList from './components/TaskList'
import type { Task } from './components/TaskItem'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleAddTask = (title: string) => {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title }])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
      <Header title="Task Manager" />
      <TaskInput onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </div>
  )
}

export default App
