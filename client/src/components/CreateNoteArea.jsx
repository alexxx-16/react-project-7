import { useState } from "react";
import Button from "./Button";

const CreateNoteArea = ({ submitNote }) => {
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

    if (!title.trim() || !content.trim()) return;

    submitNote(note);
    setNote({ title: "", content: "" });
  };

  return (
    <form
      onSubmit={handleSubmitNote}
      className="bg-zinc-100 p-4 rounded-md shadow-md flex flex-col gap-4"
    >
      <div className="flex justify-between">
        <input
          name="title"
          type="text"
          placeholder="Note Title"
          className="outline-none p-1 border-b-2 border-yellow-300 placeholder-zinc-400 font-xl"
          value={note.title}
          onChange={handleChange}
        />
        <Button>Post Note</Button>
      </div>

      <textarea
        name="content"
        className="outline-none p-2 rounded-md ring-2 ring-yellow-300 placeholder-zinc-400 font-light"
        placeholder="Write your note here"
        value={note.content}
        onChange={handleChange}
      />
    </form>
  );
};

export default CreateNoteArea;
