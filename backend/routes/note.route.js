import express from 'express';
import { addNewNote, getAllNote, updateNote } from '../controllers/note.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/add', verifyToken, addNewNote)
router.patch('/update/:noteId', verifyToken, updateNote)
router.get('/', verifyToken, getAllNote)


export default router;