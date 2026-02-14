import { useState } from "react";
import Button from "./Button";

const Note = ({ deleteNote, note }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteNote(note.id);
    }, 300);
  };

  return (
    <div
      className={`${isDeleting ? "opacity-0 scale-90" : "opacity-100 scale-100"} transition-all duration-500 bg-zinc-100 dark:bg-zinc-900 p-4 rounded-md shadow-md flex flex-col gap-2 border border-transparent dark:border-zinc-800`}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl capitalize text-yellow-500 dark:text-yellow-400 border-b-2 border-yellow-300 dark:border-zinc-700">
          {note.title}
        </h2>
        <Button onClick={handleDelete}>Delete</Button>
      </div>

      <p className="font-light text-zinc-700 dark:text-zinc-300">
        {note.content}
      </p>
    </div>
  );
};

export default Note;
