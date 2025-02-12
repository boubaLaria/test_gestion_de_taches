import React, { useState, useEffect } from 'react';
import { Task, User } from '../types';

const TaskForm = ({
  initialData,
  onTaskAdded,
  onTaskUpdated,
  onCancel,
  users
}: {
  initialData?: Task;
  onTaskAdded?: () => void;
  onTaskUpdated?: () => void;
  onCancel?: () => void;
  users: User[];
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [status, setStatus] = useState(initialData?.status || 'En cours');
  const [userId, setUserId] = useState<number | null>(initialData?.user?.id || null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setStatus(initialData.status);
      setUserId(initialData.user?.id || null);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !status || userId === null) return;

    const url = initialData ? `/api/tasks/${initialData.id}` : '/api/tasks';
    const method = initialData ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, status, userId })
    });

    if (initialData && onTaskUpdated) {
      onTaskUpdated();
    } else if (onTaskAdded) {
      onTaskAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <div className="flex gap-2">
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
          {users.map(user => <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>)}
        </select>
      </div>
      <div className="flex justify-between mt-2">
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {initialData ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;