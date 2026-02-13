import { useState } from "react";
import Button from "./Button";

const CreateNoteArea = ({ submitNote, showStatusMessage }) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNote = (e) => {
    e.preventDefault();
    const { title, content } = note;

    if (!title.trim() || !content.trim()) {
      showStatusMessage("Please enter both title and content", "error");
      return;
    }

    submitNote(note);
    setNote({ title: "", content: "" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitNote(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmitNote}
      className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-md shadow-md flex flex-col gap-4"
    >
      <div className="flex justify-between">
        <input
          name="title"
          type="text"
          placeholder="Note Title"
          className="outline-none bg-transparent p-1 border-b-2 border-yellow-300 dark:border-zinc-700 dark:text-zinc-200 placeholder-zinc-400 font-xl"
          value={note.title}
          onChange={handleChange}
        />
        <Button type="submit">
          Post <span className="hidden min-[350px]:inline">Note</span>
        </Button>
      </div>

      <textarea
        name="content"
        className="outline-none p-2 rounded-md ring-2 ring-yellow-300 dark:ring-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 placeholder-zinc-400 font-light"
        placeholder="Write your note here"
        value={note.content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default CreateNoteArea;
