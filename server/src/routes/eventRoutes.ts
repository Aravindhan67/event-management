import { Router } from 'express';
import {
  getEvents,
  getEventBySlug,
  getEventById,
  createEvent,
  updateEvent,
  updateEventStatus,
  deleteEvent,
  getOrganizerEvents,
} from '../controllers/eventController';
import { authenticate, authorize, checkEventOwnership } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getEvents);
router.get('/slug/:slug', getEventBySlug);

// Organizer scoped events
router.get(
  '/organizer/my-events',
  authenticate,
  authorize('organizer', 'admin', 'super_admin'),
  getOrganizerEvents
);

router.get('/:id', getEventById);

// Protected routes (Organizers and Admins)
router.post('/', authenticate, authorize('organizer', 'admin', 'super_admin'), createEvent);
router.put('/:id', authenticate, authorize('organizer', 'admin', 'super_admin'), checkEventOwnership, updateEvent);
router.patch(
  '/:id/status',
  authenticate,
  authorize('organizer', 'admin', 'super_admin'),
  checkEventOwnership,
  updateEventStatus
);
router.delete(
  '/:id',
  authenticate,
  authorize('organizer', 'admin', 'super_admin'),
  checkEventOwnership,
  deleteEvent
);

export default router;
