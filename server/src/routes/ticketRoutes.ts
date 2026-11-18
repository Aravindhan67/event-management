import { Router } from 'express';
import {
  getTicketsByEvent,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/event/:eventId', getTicketsByEvent);

// Protected ticket management
router.post('/', authenticate, authorize('organizer', 'admin', 'super_admin'), createTicket);
router.put('/:id', authenticate, authorize('organizer', 'admin', 'super_admin'), updateTicket);
router.delete('/:id', authenticate, authorize('organizer', 'admin', 'super_admin'), deleteTicket);

export default router;
