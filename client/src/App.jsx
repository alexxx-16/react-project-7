import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateNoteArea from "./components/CreateNoteArea";
import Footer from "./components/Footer";
import { useNotes } from "./hooks/useNotes";
import { useCallback } from "react";
import { useUsers } from "./hooks/useUsers";

const App = () => {
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  //DARK MODE
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

  const showStatusMessage = useCallback((message, type) => {
    setStatusMessage({ message: message, type: type });
    setTimeout(() => setStatusMessage({ message: "", type: "" }), 2000);
  }, []);

  //USERS
  const {
    users,
    currentUserId,
    setCurrentUserId,
    handleAddUser,
    handleDeleteUser,
  } = useUsers(showStatusMessage);

  //NOTES
  const { notes, isLoading, submitNote, deleteNote } = useNotes(
    currentUserId,
    showStatusMessage,
  );

  return (
    <div className="w-full min-h-screen flex flex-col bg-zinc-200 dark:bg-zinc-950 transition-colors duration-300">
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        users={users}
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
        onAddUser={handleAddUser}
        onDeleteUser={handleDeleteUser}
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
