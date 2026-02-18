import { useEffect } from "react";
import { useState } from "react";

export const useUsers = (showStatusMessage) => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/users");
        const data = await res.json();
        setUsers(data);

        if (data.length > 0) setCurrentUserId(data[0].id.toString());
      } catch (error) {
        showStatusMessage("Failed to load users", "error");
      }
    };
    loadUsers();
  }, [showStatusMessage]);

  const handleAddUser = async (name) => {
    const formattedName =
      name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
    try {
      const res = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formattedName }),
      });
      const newUser = await res.json();

      if (res.ok) {
        setUsers((prev) => [...prev, newUser]);
        setCurrentUserId(newUser.id.toString());
        showStatusMessage(`Welcome ${formattedName}`, "success");
      }
    } catch (error) {
      showStatusMessage("Could not save user", "error");
    }
  };

  const handleDeleteUser = async () => {
    if (!currentUserId) return;

    const userToDelete = users.find((u) => u.id.toString() === currentUserId);
    if (!window.confirm(`Delete ${userToDelete?.name} and all notes?`)) return;

    try {
      const res = await fetch(
        `http://localhost:5001/api/users/${currentUserId}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        const updatedUsers = users.filter(
          (u) => u.id.toString() !== currentUserId,
        );
        setUsers(updatedUsers);
        setCurrentUserId(
          updatedUsers.length > 0 ? updatedUsers[0].id.toString() : "",
        );
        showStatusMessage("User deleted", "success");
      }
    } catch (error) {
      showStatusMessage("Could not delete user", "error");
    }
  };

  return {
    users,
    currentUserId,
    setCurrentUserId,
    handleAddUser,
    handleDeleteUser,
  };
};
