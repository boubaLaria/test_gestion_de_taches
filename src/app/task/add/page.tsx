"use client";
import { useRouter } from 'next/navigation';
import TaskForm from '../../components/taskForm';
import { useEffect, useState } from 'react';
import { User } from '@/app/types';

const AddTaskPage = () => {
  const router = useRouter();

  const handleTaskAdded = () => {
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
      <h1 className="text-2xl font-bold mb-4">Add Task</h1>
      <TaskForm onTaskAdded={handleTaskAdded} onCancel={handleCancel} users={userData}/>
    </div>
  );
};

export default AddTaskPage;
