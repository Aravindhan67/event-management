import { Router } from 'express';
import { subscribeNewsletter, getSubscribers } from '../controllers/newsletterController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/subscribe', subscribeNewsletter);
router.get('/', authenticate, authorize('admin', 'super_admin'), getSubscribers);

export default router;
