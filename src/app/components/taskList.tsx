// components/TaskList.tsx
import React, { useEffect, useState } from 'react';
import { Task } from '../types';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(setTasks);
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.status}</p>
          <p>User ID: {task.user?.firstName + " " +task.user?.lastName}</p>
          {/* Buttons for edit and delete */}
        </div>
      ))}
    </div>
  );
};

export default TaskList;