import Note from "../models/note.model.js";

export const search = async (req, res) => {
  const { id } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const matchingNotes = await Note.find({
      userId: id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
        { tags: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.json(matchingNotes);
    
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
