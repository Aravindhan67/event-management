import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from '../types';

export interface ICategoryDocument extends Omit<ICategory, '_id'>, Document {}

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true, lowercase: true, index: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'Calendar' },
    image: { type: String, default: '' },
    color: { type: String, default: '#183153' },
    featured: { type: Boolean, default: false },
    eventCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategoryDocument>('Category', categorySchema);
