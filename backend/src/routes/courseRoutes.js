import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middlewares/verifyToken.js';
import { fileFilter, fileStorageCourse } from '../utils/multer.js';
import {
  deleteContentCourse,
  deleteCourse,
  deleteStudentToCourse,
  getCourseById,
  getCourses,
  getDetailContent,
  getStudentsByCourseId,
  postContentCourse,
  postCourse,
  postStudentToCourse,
  updateContentCourse,
  updateCourse,
} from '../controllers/courseController.js';
import { addStudentCourseSchema, contentSchema } from '../utils/schema.js';
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
courseRoutes.put(
  '/courses/contents/:id',
  verifyToken,
  validateRequest(contentSchema),
  updateContentCourse
);
courseRoutes.delete('/courses/contents/:id', verifyToken, deleteContentCourse);
courseRoutes.get('/courses/contents/:id', verifyToken, getDetailContent);

courseRoutes.get('/courses/students/:id', verifyToken, getStudentsByCourseId);
courseRoutes.post(
  '/courses/students/:id',
  verifyToken,
  validateRequest(addStudentCourseSchema),
  postStudentToCourse
);
courseRoutes.put(
  '/courses/students/:id',
  verifyToken,
  validateRequest(addStudentCourseSchema),
  deleteStudentToCourse
);

export default courseRoutes;
