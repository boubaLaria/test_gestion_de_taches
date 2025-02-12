"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '../types';

const TaskListPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = () => {
    router.push('/task/add');
  };

  const handleEditTask = (id: number) => {
    router.push(`/task/${id}`);
  };

  return (
    <div className="rounded-ls border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Task List
        </h4>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">user</p>
        </div>
      </div>

      {tasks.map((task) => (
        <div
          className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5"
          key={task.id}
        >
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {task.name}
            </p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {task.status}
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-between">
            <p className="text-sm text-black dark:text-white">
              {task.user?.firstName} {task.user?.lastName}
            </p>
            <button
              onClick={() => handleEditTask(task.id)}
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

export default TaskListPage;
