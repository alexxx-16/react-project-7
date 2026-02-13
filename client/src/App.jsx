import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateNoteArea from "./components/CreateNoteArea";

const App = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/notes");

      setNotes(await res.json());
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    setNotes(notes.filter((note) => note.id != id));
    await fetch(`http://localhost:5001/api/notes/${id}`, { method: "DELETE" });
  };

  const submitNote = async (newNote) => {
    try {
      const res = await fetch("http://localhost:5001/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      if (res.ok) {
        const savedNewNote = await res.json();
        setNotes((prev) => [savedNewNote, ...prev]);
      }
    } catch (error) {
      console.error("Error posting note: ", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-200">
      <Header />

      <main className="flex flex-col gap-4 flex-wrap p-4">
        <CreateNoteArea submitNote={submitNote} />

        {notes.map((note) => (
          <Note key={note.id} note={note} deleteNote={deleteNote} />
        ))}
      </main>
    </div>
  );
};

export default App;
