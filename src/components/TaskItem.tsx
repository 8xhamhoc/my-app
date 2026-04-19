import React from 'react';
import Button from './Button';

export type Task = {
  id: string;
  title: string;
};

type Props = {
  task: Task;
  onDelete: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onDelete }) => {
  return (
    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span>{task.title}</span>
      <Button label="Delete" onClick={() => onDelete(task.id)} />
    </li>
  );
};

export default TaskItem;
