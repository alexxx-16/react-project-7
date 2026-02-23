import { useState } from "react";
import Button from "./Button";

const UserModal = ({
  isOpen,
  onClose,
  onSave,
  mode = "add",
  userName = "",
}) => {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const isDeleteMode = mode === "delete";

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(isDeleteMode ? null : name);
    setName("");
    onClose();
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
        <h2 className="text-xl text-yellow-500">
          {isDeleteMode ? "Delete user" : "Add New User"}
        </h2>

        {isDeleteMode ? (
          <p className="text-zinc-600 dark:text-zinc-300">
            Are you sure you want to delete {userName} and all their notes?
          </p>
        ) : (
          <input
            autoFocus
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none border-b-2 p-2 border-yellow-400 placeholder-zinc-400 dark:text-zinc-200"
          />
        )}

        <div className="flex gap-4 justify-end">
          <Button type="submit">
            {isDeleteMode ? "Confirm Delete" : "Create User"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default UserModal;
