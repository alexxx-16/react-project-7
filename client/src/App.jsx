import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateNoteArea from "./components/CreateNoteArea";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const showStatusMessage = (message, type) => {
    setStatusMessage({ message: message, type: type });
    setTimeout(() => setStatusMessage({ message: "", type: "" }), 2000);
  };

  const fetchNotes = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/notes");
      setNotes(await res.json());
    } catch (error) {
      console.error("Error fetching notes: ", error);
      showStatusMessage("Failed to load notes", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    setNotes(notes.filter((note) => note.id != id));
    try {
      const res = await fetch(`http://localhost:5001/api/notes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showStatusMessage("Note deleted", "success");
      }
    } catch (error) {
      showStatusMessage("Could not delete note", "error");
    }
  };

  const submitNote = async (newNote) => {
    try {
      const res = await fetch("http://localhost:5001/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      const data = await res.json();

      if (res.ok) {
        setNotes((prev) => [data, ...prev]);
        showStatusMessage("Note saved", "success");
      } else {
        showStatusMessage(data.message || "Failed to save note", "error");
      }
    } catch (error) {
      console.error("Error posting note: ", error);
      showStatusMessage("Server is offline", "error");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-zinc-200">
      <Header />

      <main className="flex-1 p-4 flex flex-col gap-4">
        <CreateNoteArea
          submitNote={submitNote}
          showStatusMessage={showStatusMessage}
        />

        {statusMessage.message && (
          <div className="fixed inset-x-0 top-10 z-50 flex justify-center transition-all duration-300 animate-in fade-in">
            <div
              className={`px-4 py-1 rounded-md shadow-md ${
                statusMessage.type === "success"
                  ? "bg-yellow-400 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {statusMessage.message}
            </div>
          </div>
        )}

        {isLoading && <p className="text-center">Fetching Notes...</p>}

        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {notes.map((note) => (
            <Note key={note.id} note={note} deleteNote={deleteNote} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
