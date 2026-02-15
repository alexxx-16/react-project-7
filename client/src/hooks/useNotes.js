import { useEffect } from "react";
import { useState } from "react";

export const useNotes = (currentUserId, showStatusMessage) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch notes
  const fetchNotes = async () => {
    if (!currentUserId) return;
    setIsLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5001/api/notes?user_id=${currentUserId}`,
      );
      setNotes(await res.json());
    } catch (error) {
      console.error("Failed to load notes: ", error);
      showStatusMessage("Failed to load notes", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [currentUserId]);

  // post notes
  const submitNote = async (newNote) => {
    try {
      const res = await fetch("http://localhost:5001/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newNote, user_id: parseInt(currentUserId) }),
      });

      const data = await res.json(); // API returns notes[0] new note

      if (res.ok) {
        setNotes((prev) => [data, ...prev]);
        showStatusMessage("Note saved", "success");
      } else {
        showStatusMessage(data.message || "Failed to save note", "error");
      }
    } catch (error) {
      showStatusMessage("Server error, cannot save note", "error");
    }
  };

  // delete note
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

  return { notes, isLoading, submitNote, deleteNote };
};
