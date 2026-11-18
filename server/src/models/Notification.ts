import mongoose, { Document, Schema } from 'mongoose';
import { INotification } from '../types';

export interface INotificationDocument extends Omit<INotification, '_id'>, Document {}

const notificationSchema = new Schema<INotificationDocument>(
  {
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['booking', 'event_update', 'reminder', 'system'],
      default: 'system',
    },
    isRead: { type: Boolean, default: false, index: true },
    linkUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotificationDocument>('Notification', notificationSchema);
