import express from "express";
import cors from "cors";
import { query } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/api/users", async (req, res) => {
  try {
    const result = await query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.post("/api/users", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const result = await query(
      "INSERT INTO users (name) VALUES ($1) RETURNING *",
      [name],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error saving user: ", error);
    res.status(500).json({ message: "Failed to save user" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("DELETE FROM users WHERE id = $1 RETURNING *", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User and all their notes have been deleted" });
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

app.get("/api/notes", async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ message: "User ID is required" });

  try {
    const result = await query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id],
    );
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
  const { title, content, user_id } = req.body;

  if (!title || !content || !user_id) {
    return res
      .status(400)
      .json({ message: "Title, content and user_id are required" });
  }

  try {
    const result = await query(
      "INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, user_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error posting note: ", error);
    res.status(500).json({ message: "Failed to save note" });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const result = await query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mesasge: "Note not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating note: ", error);
    res.status(500).json({ message: "Failed to udpate note" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
