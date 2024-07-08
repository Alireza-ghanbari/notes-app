import express from 'express';
import { addNewNote } from '../controllers/note.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/add', verifyToken, addNewNote)


export default router;