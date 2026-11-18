import { Response } from 'express';
import { Payment } from '../models/Payment';
import { Booking } from '../models/Booking';
import { AuthRequest } from '../middleware/auth';

export const getPaymentByBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const payment = await Payment.findOne({ booking: req.params.bookingId });
    if (!payment) {
      res.status(404).json({ success: false, message: 'Payment record not found.' });
      return;
    }
    res.json({ success: true, data: payment });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { transactionId, status } = req.body;
    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      res.status(404).json({ success: false, message: 'Payment not found.' });
      return;
    }

    payment.status = status === 'succeeded' ? 'succeeded' : 'failed';
    await payment.save();

    if (payment.status === 'succeeded') {
      await Booking.findByIdAndUpdate(payment.booking, { paymentStatus: 'paid' });
    }

    res.json({ success: true, message: 'Payment verified successfully.', data: payment });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
