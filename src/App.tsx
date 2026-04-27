import { useState } from 'react'
import './App.css'
import TaskInput from './components/TaskInput'
import Header from './components/Header'
import TaskList from './components/TaskList'
import UserCard from './components/UserCard'
import type { Task } from './components/TaskItem'
import LoginForm from './components/LoginForm'
import GreetingCard from './components/GreetingCard'
import Counter from './components/Counter'

function App() {

  const users = [
    { id: 1, name: "Minh",  role: "Frontend Dev",  isOnline: true  },
    { id: 2, name: "Linh",  role: "UI Designer",   isOnline: false },
    { id: 3, name: "Khoa",  role: "Backend Dev",   isOnline: true  },
  ];

  const [tasks, setTasks] = useState<Task[]>([]) // 10s

  const [alTasks, setAlTasks] = useState<Task[]>([])

  const handleDelete = (id: string) => { // 30s
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleAddTask = (title: string) => { // 30s
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title }])
  }

  const onDelete = (id: string) => {
    setAlTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const onAdd = (title: string) => {
    setAlTasks((prev) => [...prev, { id: crypto.randomUUID(), title }])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
      <Header title="Task Manager" />
      <TaskInput onAddTask={onAdd} />
      <TaskList tasks={alTasks} onDelete={onDelete} />
      <UserCard name="Minh Tran" role="Frontend Dev" isOnline={true} />
      <LoginForm />
      {
      users.map((user) => (
        <GreetingCard
          key={user.id}
          name={user.name}
          role={user.role}
          isOnline={user.isOnline}
        />
      ))}
      <Counter />
      <Counter />
    </div>
  )
}

export default App
