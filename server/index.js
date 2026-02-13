import express from "express";
import cors from "cors";
import { query } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/notes", async (req, res) => {
  try {
    const result = await query("SELECT * FROM notes ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Failed selecting data: ", error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("DELETE FROM notes WHERE id = $1 RETURNING *", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note: ", error);
    res.status(500).json({ message: "Failed to delete note" });
  }
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Both title and content are required" });
  }

  try {
    const result = await query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error posting note: ", error);
    res.status(500).json({ message: "Failed to save note. Try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
