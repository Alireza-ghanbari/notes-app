import express from 'express';
import { getUser, signOut, signin, signup } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/', verifyToken, getUser)
router.get('/signout', signOut)


export default router;