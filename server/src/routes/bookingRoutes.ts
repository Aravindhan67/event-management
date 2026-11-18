import { Router } from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookingsAdmin,
  exportBookingsCSV,
} from '../controllers/bookingController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Booking creation requires login
router.post('/', authenticate, createBooking);
router.get('/my', authenticate, getMyBookings);
router.get('/:id', authenticate, getBookingById);
router.patch('/:id/cancel', authenticate, cancelBooking);

// Admin & Organizer roster views
router.get(
  '/admin/all',
  authenticate,
  authorize('organizer', 'admin', 'super_admin'),
  getAllBookingsAdmin
);

router.get(
  '/admin/export-csv',
  authenticate,
  authorize('organizer', 'admin', 'super_admin'),
  exportBookingsCSV
);

export default router;
