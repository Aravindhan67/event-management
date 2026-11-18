import mongoose, { Document, Schema } from 'mongoose';
import { ITestimonial } from '../types';

export interface ITestimonialDocument extends Omit<ITestimonial, '_id'>, Document {}

const testimonialSchema = new Schema<ITestimonialDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    avatar: { type: String, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: true, index: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model<ITestimonialDocument>('Testimonial', testimonialSchema);
