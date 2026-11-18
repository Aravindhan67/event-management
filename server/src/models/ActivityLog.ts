import mongoose, { Document, Schema } from 'mongoose';
import { IActivityLog } from '../types';

export interface IActivityLogDocument extends Omit<IActivityLog, '_id'>, Document {}

const activityLogSchema = new Schema<IActivityLogDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: String },
    details: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

export const ActivityLog = mongoose.model<IActivityLogDocument>('ActivityLog', activityLogSchema);
