import express from 'express';
import { addNewNote, updateNote } from '../controllers/note.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/add', verifyToken, addNewNote)
router.patch('/update/:noteId', verifyToken, updateNote)


export default router;