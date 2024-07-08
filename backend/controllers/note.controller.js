import Note from "../models/note.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const addNewNote = async(req, res) => {
  const { title, content, tags } = req.body;
  const { id } = req.user;

  try {
    const note = await Note.create({
        title,
        content,
        tags: tags || [],
        userId: id
    })

    res.status(201).json({
        message: "Note added successfully!",
        data: note
    })
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
