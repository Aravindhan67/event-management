import mongoose, { Document, Schema } from 'mongoose';
import { ITicket } from '../types';

export interface ITicketDocument extends Omit<ITicket, '_id'>, Document {}

const ticketSchema = new Schema<ITicketDocument>(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ['free', 'paid'], default: 'paid' },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    availableQuantity: { type: Number, required: true, min: 0 },
    maxPerOrder: { type: Number, default: 5, min: 1 },
    salesStartDate: { type: String },
    salesEndDate: { type: String },
    description: { type: String, default: '' },
    perks: [{ type: String }],
  },
  { timestamps: true }
);

export const Ticket = mongoose.model<ITicketDocument>('Ticket', ticketSchema);
