"use client";
import { useRouter } from 'next/navigation';
import UserForm from '../../components/userForm';

const AddUserPage = () => {
  const router = useRouter();

  const handleUserAdded = () => {
    router.push('/user');
  };

  const handleCancel = () => {
    router.push('/user');
  };

  return (

    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <UserForm onUserAdded={handleUserAdded} onCanled={handleCancel} />
      
    </div>
  );
};

export default AddUserPage;
