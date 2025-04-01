import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getCourses } from '../controllers/courseController.js';

const courseRoutes = express.Router();

courseRoutes.get('/courses', verifyToken, getCourses);

export default courseRoutes;
