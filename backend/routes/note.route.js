import express from 'express';
import { addNewNote, deleteNote, getAllNote, updateNote, updatePinned } from '../controllers/note.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/add', verifyToken, addNewNote)
router.patch('/update/:noteId', verifyToken, updateNote)
router.get('/', verifyToken, getAllNote)
router.delete('/delete/:noteId', verifyToken, deleteNote)
router.patch('/pinned/:noteId', verifyToken, updatePinned)


export default router;