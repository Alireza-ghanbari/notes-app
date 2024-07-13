import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { search } from '../controllers/search.controller.js';

const router = express.Router();

router.get('/search-notes/', verifyToken, search)

export default router;