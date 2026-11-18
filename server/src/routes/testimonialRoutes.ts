import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getTestimonials);
router.post('/', authenticate, createTestimonial);
router.put('/:id', authenticate, authorize('admin', 'super_admin'), updateTestimonial);
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), deleteTestimonial);

export default router;
