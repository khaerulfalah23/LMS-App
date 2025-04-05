import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middlewares/verifyToken.js';
import { fileFilter, fileStorageCourse } from '../utils/multer.js';
import {
  deleteContentCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  getDetailContent,
  postContentCourse,
  postCourse,
  updateCourse,
} from '../controllers/courseController.js';
import { contentSchema } from '../utils/schema.js';
import { validateRequest } from '../middlewares/validateRequest.js';

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

courseRoutes.post(
  '/courses/contents',
  verifyToken,
  validateRequest(contentSchema),
  postContentCourse
);
courseRoutes.delete('/courses/contents/:id', verifyToken, deleteContentCourse);
courseRoutes.get('/courses/contents/:id', verifyToken, getDetailContent);

export default courseRoutes;
