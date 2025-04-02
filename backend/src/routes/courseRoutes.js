import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middlewares/verifyToken.js';
import { fileFilter, fileStorageCourse } from '../utils/multer.js';
import {
  deleteCourse,
  getCourseById,
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
courseRoutes.get('/courses/:id', verifyToken, getCourseById);
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
courseRoutes.delete('/courses/:id', verifyToken, deleteCourse);

export default courseRoutes;
