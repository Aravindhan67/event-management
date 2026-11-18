import { Router } from 'express';
import { getOverviewAnalytics } from '../controllers/analyticsController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get(
  '/overview',
  authenticate,
  authorize('organizer', 'admin', 'super_admin'),
  getOverviewAnalytics
);

export default router;
