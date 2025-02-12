// components/UserForm.tsx
import React, { useState } from 'react';

const UserForm = ({ onUserAdded }: { onUserAdded: () => void }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) return;
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName })
    });
    setFirstName('');
    setLastName('');
    onUserAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Prénom"
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Nom"
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Ajouter</button>
    </form>
  );
};

export default UserForm;
