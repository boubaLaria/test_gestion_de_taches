"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TaskForm from '../../components/taskForm';
import { Task, User } from '../../types';

const EditTaskPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    fetch(`/api/tasks/${id}`)
      .then(response => response.json())
      .then(data => setTask(data))
      .catch(error => console.error('Error fetching task data:', error));
  }, [id]);

  const handleTaskUpdated = () => {
    router.push('/task');
  };

  const handleCancel = () => {
    router.push('/task');
  };
      const [userData, setUserData] = useState<User[]>([]);
    
      useEffect(() => {
        fetch('/api/users')
          .then(response => response.json())
          .then(data => setUserData(data))
          .catch(error => console.error('Error fetching user data:', error));
      }, []);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      {task && (
        <TaskForm
          initialData={task}
          onTaskUpdated={handleTaskUpdated}
          onCancel={handleCancel}
            users={userData}
        />
      )}
    </div>
  );
};

export default EditTaskPage;
