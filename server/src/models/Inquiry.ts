import mongoose, { Document, Schema } from 'mongoose';
import { IInquiry } from '../types';

export interface IInquiryDocument extends Omit<IInquiry, '_id'>, Document {}

const inquirySchema = new Schema<IInquiryDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved'],
      default: 'new',
      index: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model<IInquiryDocument>('Inquiry', inquirySchema);
