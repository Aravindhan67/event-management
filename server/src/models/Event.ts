import mongoose, { Document, Schema } from 'mongoose';
import { IEvent } from '../types';

export interface IEventDocument extends Omit<IEvent, '_id'>, Document {}

const scheduleItemSchema = new Schema(
  {
    time: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    speaker: { type: String, default: '' },
  },
  { _id: false }
);

const venueSchema = new Schema(
  {
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '', index: true },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { _id: false }
);

const eventSchema = new Schema<IEventDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true, lowercase: true, index: true },
    shortDescription: { type: String, required: true, trim: true },
    fullDescription: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    bannerImage: { type: String, required: true },
    gallery: [{ type: String }],
    startDate: { type: String, required: true, index: true },
    endDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    locationType: {
      type: String,
      enum: ['in_person', 'virtual', 'hybrid'],
      default: 'in_person',
    },
    venue: { type: venueSchema, default: () => ({}) },
    virtualUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled', 'completed'],
      default: 'draft',
      index: true,
    },
    isFeatured: { type: Boolean, default: false, index: true },
    tags: [{ type: String }],
    schedule: [scheduleItemSchema],
    totalCapacity: { type: Number, required: true, min: 1 },
    bookedSeats: { type: Number, default: 0, min: 0 },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

// Text index for search
eventSchema.index({ title: 'text', shortDescription: 'text', 'venue.city': 'text', tags: 'text' });

export const Event = mongoose.model<IEventDocument>('Event', eventSchema);
