import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getCourses, postCourse } from '../controllers/courseController.js';
import { fileFilter, fileStorageCourse } from '../utils/multer.js';

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

export default courseRoutes;
