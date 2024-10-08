import Note from "../models/note.model.js";

export const addNewNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const { id } = req.user;

  try {
    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      userId: id,
    });

    res.status(201).json({
      message: "Note added successfully!",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const updateNote = async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const { id } = req.user;
  const { noteId } = req.params;
  try {
    let note = await Note.findOne({ _id: noteId, userId: id });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (!title && !content && !tags) {
      return res.status(400).json({
        message: "No changes provided",
      });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags || note.tags;
    note.isPinned = isPinned || note.isPinned;

    note = await note.save();

    res.status(200).json({
      message: "Note updated successfully!",
      data: { note },
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const getAllNote = async (req, res) => {
  const { id } = req.user;
  try {
    const notes = await Note.find({ userId: id }).sort({ isPinned: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.user;
  const { noteId } = req.params;

  try {
    const note = await Note.findOne({ userId: id, _id: noteId });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await Note.deleteOne({ _id: noteId, userId: id });

    res.status(200).json("Note deleted successfully!");
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const updatePinned = async (req, res) => {
  const { isPinned } = req.body;
  const { id } = req.user;
  const { noteId } = req.params;
  try {
    let note = await Note.findOne({ _id: noteId, userId: id });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    //   if (isPinned === '') {
    //     return res.status(400).json({
    //       message: "No changes provided (isPinned) not found",
    //     });
    //   }

    note.isPinned = isPinned || false;

    note = await note.save();

    res.status(200).json({
      message: "Note updated successfully!",
      data: { note },
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
