import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getCategories } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.get('/categories', verifyToken, getCategories);

export default categoryRoutes;
