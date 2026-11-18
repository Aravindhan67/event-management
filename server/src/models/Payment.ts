import mongoose, { Document, Schema } from 'mongoose';
import { IPayment } from '../types';

export interface IPaymentDocument extends Omit<IPayment, '_id'>, Document {}

const paymentSchema = new Schema<IPaymentDocument>(
  {
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD', uppercase: true },
    method: {
      type: String,
      enum: ['card', 'stripe', 'razorpay', 'bank_transfer', 'free'],
      default: 'card',
    },
    transactionId: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed'],
      default: 'succeeded',
      index: true,
    },
    gatewayResponse: { type: Schema.Types.Mixed },
    paidAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPaymentDocument>('Payment', paymentSchema);
