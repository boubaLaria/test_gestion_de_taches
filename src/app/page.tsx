"use client";
// pages/index.tsx
import { useState } from 'react';
import UserForm from './components/userForm';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gestion des tâches</h1>
      <UserForm onUserAdded={() => setRefresh(!refresh)} />
      <TaskForm onTaskAdded={() => setRefresh(!refresh)} />
      <TaskList key={refresh.toString()} />
    </div>
  );
}
