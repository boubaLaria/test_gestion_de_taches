// components/TaskForm.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../types';

const TaskForm = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('En cours');
  const [userId, setUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, status, userId })
    });
    setName('');
    setUserId(null);
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nouvelle tâche"
        className="border p-2 rounded w-full"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded">
        <option value="En cours">En cours</option>
        <option value="Terminée">Terminée</option>
      </select>
      <select value={userId ?? ''} onChange={(e) => setUserId(Number(e.target.value))} className="border p-2 rounded">
        <option value="">Affecter à...</option>
        {users.map(user => <option key={user.id} value={user.id}>{user.firstName+" "+ user.lastName}</option>)}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
    </form>
  );
};

export default TaskForm;