// components/UserForm.tsx
import React, { useState, useEffect } from "react";
import { User } from "../types";

const UserForm = ({
  initialData,
  onUserAdded,
  onUserUpdated,
  onCanled,
}: {
  initialData?: User;
  onUserAdded?: () => void;
  onUserUpdated?: () => void;
  onCanled?: () => void;
}) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) return;

    const url = initialData ? `/api/users/${initialData.id}` : "/api/users";
    const method = initialData ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName }),
    });

    if (initialData && onUserUpdated) {
      onUserUpdated();
    } else if (onUserAdded) {
      onUserAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex-col  flex gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={firstName}
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={lastName}
          name="lastName"
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="flex justify-between mt-2">
        <button
          onClick={onCanled}
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
