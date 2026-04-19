import React from 'react';
import TaskItem, { type Task } from './TaskItem';

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

const TaskList: React.FC<Props> = ({ tasks, onDelete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;
