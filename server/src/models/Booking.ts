import mongoose, { Document, Schema } from 'mongoose';
import { IBooking } from '../types';

export interface IBookingDocument extends Omit<IBooking, '_id'>, Document {
  eventType?: string;
  eventDate?: string;
  venueName?: string;
  venueCity?: string;
  guestCount?: number;
  selectedServices?: string[];
  advancePaid?: number;
  assignedCoordinator?: {
    name: string;
    phone: string;
    role: string;
  };
  deliverablesUrl?: string;
}

const bookingTicketItemSchema = new Schema(
  {
    ticket: { type: Schema.Types.ObjectId, ref: 'Ticket' },
    ticketName: { type: String, default: 'Standard Package' },
    unitPrice: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    subtotal: { type: Number, default: 0 },
  },
  { _id: false }
);

const attendeeInfoSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
  },
  { _id: false }
);

const coordinatorSchema = new Schema(
  {
    name: { type: String, default: 'Alexander Wright' },
    phone: { type: String, default: '+1 (555) 234-5678' },
    role: { type: String, default: 'Lead Event Director' },
  },
  { _id: false }
);

const bookingSchema = new Schema<IBookingDocument>(
  {
    bookingReference: { type: String, required: true, unique: true, uppercase: true, index: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    tickets: [bookingTicketItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    advancePaid: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['inquiry', 'confirmed', 'in_progress', 'completed', 'cancelled'],
      default: 'confirmed',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'free', 'pending', 'partial', 'failed'],
      default: 'paid',
      index: true,
    },
    attendeeInfo: { type: attendeeInfoSchema, required: true },
    // Event Management Agency Specific Details
    eventType: { type: String, default: 'Wedding' },
    eventDate: { type: String, default: '' },
    venueName: { type: String, default: '' },
    venueCity: { type: String, default: '' },
    guestCount: { type: Number, default: 100 },
    selectedServices: [{ type: String }],
    assignedCoordinator: { type: coordinatorSchema, default: () => ({}) },
    deliverablesUrl: { type: String, default: '' },
    notes: { type: String, default: '' },
    qrCodeUrl: { type: String, default: '' },
    cancelledAt: { type: Date },
    cancelReason: { type: String },
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBookingDocument>('Booking', bookingSchema);
