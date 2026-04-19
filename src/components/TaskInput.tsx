import React, { useState } from 'react';
import Button from './Button';

type Props = {
  onAddTask: (title: string) => void;
};

const TaskInput: React.FC<Props> = ({ onAddTask }) => {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
        placeholder="Enter task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        label="Add Task"
        onClick={() => {
          const title = value.trim();
          if (title) {
            onAddTask(title);
            setValue('');
          }
        }}
      />
    </div>
  );
};

export default TaskInput;
