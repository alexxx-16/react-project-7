import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateNoteArea from "./components/CreateNoteArea";
import Footer from "./components/Footer";
import { useNotes } from "./hooks/useNotes";
import { useCallback } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/users");
        const data = await res.json();
        setUsers(data);

        if (data.length > 0) setCurrentUserId(data[0].id.toString());
      } catch (err) {
        showStatusMessage("Failed to load users", "error");
      }
    };
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    const name = prompt("What's the new user's name?");
    if (!name) return;

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
        setUsers([...users, newUser]);
        setCurrentUserId(newUser.id.toString());
        showStatusMessage(`Welcome, ${formattedName}`, "success");
      }
    } catch (error) {
      showStatusMessage("Could not save user to database", "error");
    }
  };

  const handleDeleteUser = async () => {
    if (!currentUserId) return;

    const userToDelete = users.find((u) => u.id.toString() == currentUserId);

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${userToDelete?.name}? This will delete all notes forever.`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5001/api/users/${currentUserId}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        const updatedUsers = users.filter(
          (u) => u.id.toString() != currentUserId,
        );
      }
      setUsers(updatedUsers);
      if (updatedUsers.length > 0) {
        setCurrentUserId(updatedUsers[0].id.toString());
      } else {
        setCurrentUserId("");
      }
      showStatusMessage("User has been deleted", "success");
    } catch (error) {
      showStatusMessage("Could not delete user", "error");
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
  const showStatusMessage = useCallback((message, type) => {
    setStatusMessage({ message: message, type: type });
    setTimeout(() => setStatusMessage({ message: "", type: "" }), 2000);
  }, []);

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
