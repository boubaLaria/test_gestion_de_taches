"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../types';

const UserTable = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleAddUser = () => {
    router.push('/user/add');
  };

  const handleEditUser = (id: number) => {
    router.push(`/user/${id}`);
  };

  return (
    <div className="rounded-ls border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          User List
        </h4>
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      <div className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
      </div>

      {userData.map((user) => (
        <div
          className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5"
          key={user.id}
        >
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {user.email}
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-between">
            <p className="text-sm text-black dark:text-white">
              {}
            </p>
            <button
              onClick={() => handleEditUser(user.id)}
              className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
