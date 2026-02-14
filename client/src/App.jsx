import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateNoteArea from "./components/CreateNoteArea";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([
    { id: "1", name: "Guest" },
    { id: "2", name: "Alex" },
  ]);
  const [currentUserId, setCurrentUserId] = useState("1");

  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(true);

  const handleAddUser = () => {
    const name = prompt("What's the new user's name?");
    if (name) {
      const newUser = { id: Date.now().toString(), name: name };
      setUsers([...users, newUser]);
      setCurrentUserId(newUser.id);
    }
  };

  // dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // status message
  const showStatusMessage = (message, type) => {
    setStatusMessage({ message: message, type: type });
    setTimeout(() => setStatusMessage({ message: "", type: "" }), 2000);
  };

  // fetch notes
  const fetchNotes = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5001/api/notes?userId=" + currentUserId,
      );
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
  }, [currentUserId]);

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
        body: JSON.stringify({ ...newNote, userId: currentUserId }),
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
    <div className="w-full min-h-screen flex flex-col bg-zinc-200 dark:bg-zinc-950 transition-colors duration-300">
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        users={users}
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
        onAddUser={handleAddUser}
      />

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
        {isLoading && (
          <p className="text-center text-zinc-700 dark:text-zinc-300">
            Fetching Notes...
          </p>
        )}
        {!isLoading && notes.length === 0 && (
          <p className="text-center text-zinc-700 dark:text-zinc-300">
            Start by creating your first note!
          </p>
        )}
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
