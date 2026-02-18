import { useState } from "react";
import Button from "./Button";

const UserModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name);
      setName("");
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm fade-in duration-300"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-4 rounded-xl shadow-md flex flex-col gap-4 w-full max-w-sm border border-zinc-200 dark:bg-zinc-700 dark:border-zinc-600"
      >
        <h2 className="text-xl text-yellow-500">Add New User</h2>
        <input
          autoFocus
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="outline-none border-b-2 p-2 border-yellow-400 placeholder-zinc-400 dark:text-zinc-200"
        />
        <div className="flex gap-4 justify-end">
          <Button type="submit">Create User</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default UserModal;
