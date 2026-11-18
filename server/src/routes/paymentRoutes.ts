import { Router } from 'express';
import { getPaymentByBooking, verifyPayment } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/booking/:bookingId', authenticate, getPaymentByBooking);
router.post('/verify', authenticate, verifyPayment);

export default router;
