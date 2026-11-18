import mongoose, { Document, Schema } from 'mongoose';
import { INewsletter } from '../types';

export interface INewsletterDocument extends Omit<INewsletter, '_id'>, Document {}

const newsletterSchema = new Schema<INewsletterDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    isActive: { type: Boolean, default: true },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true }
);

export const Newsletter = mongoose.model<INewsletterDocument>('Newsletter', newsletterSchema);
