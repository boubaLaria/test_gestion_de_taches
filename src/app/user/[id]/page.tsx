"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserForm from '../../components/userForm';
import { User } from '../../types';

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, [id]);

  const handleUserUpdated = () => {
    router.push('/user');
  };

  const handleCancel = () => {
    router.push('/user');
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      {user && (
        <UserForm
          initialData={user}
          onUserUpdated={handleUserUpdated}
            onCanled={handleCancel}
        />
      )}
      
    </div>
  );
};

export default EditUserPage;
