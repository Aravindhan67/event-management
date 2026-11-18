import { Router } from 'express';
import {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

// Management routes
router.post('/', authenticate, authorize('admin', 'super_admin'), createCategory);
router.put('/:id', authenticate, authorize('admin', 'super_admin'), updateCategory);
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), deleteCategory);

export default router;
