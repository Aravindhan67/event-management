import { Router } from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public submission
router.post('/', createInquiry);

// Admin review
router.get('/', authenticate, authorize('admin', 'super_admin'), getInquiries);
router.patch('/:id/status', authenticate, authorize('admin', 'super_admin'), updateInquiryStatus);
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), deleteInquiry);

export default router;
