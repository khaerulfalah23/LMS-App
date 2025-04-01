import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middlewares/verifyToken.js';
import { fileFilter, fileStorageCourse } from '../utils/multer.js';
import {
  getCourses,
  postCourse,
  updateCourse,
} from '../controllers/courseController.js';

const courseRoutes = express.Router();

const uploads = multer({
  storage: fileStorageCourse,
  fileFilter: fileFilter,
});

courseRoutes.get('/courses', verifyToken, getCourses);
courseRoutes.post(
  '/courses',
  verifyToken,
  uploads.single('thumbnail'),
  postCourse
);
courseRoutes.put(
  '/courses/:id',
  verifyToken,
  uploads.single('thumbnail'),
  updateCourse
);

export default courseRoutes;
