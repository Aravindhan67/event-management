import mongoose, { Document, Schema } from 'mongoose';
import { IWebsiteSettings } from '../types';

export interface IWebsiteSettingsDocument extends Omit<IWebsiteSettings, '_id'>, Document {}

const websiteSettingsSchema = new Schema<IWebsiteSettingsDocument>(
  {
    companyName: { type: String, default: 'EventPro Global' },
    siteTitle: { type: String, default: 'EventPro | Modern Event Management Platform' },
    tagline: { type: String, default: 'Creating Unforgettable Experiences, One Event at a Time.' },
    contactEmail: { type: String, default: 'contact@eventpro.com' },
    contactPhone: { type: String, default: '+1 (800) 555-EVENT' },
    address: { type: String, default: '742 Evergreen Terrace, Suite 500, New York, NY 10001' },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com' },
      twitter: { type: String, default: 'https://twitter.com' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      instagram: { type: String, default: 'https://instagram.com' },
      youtube: { type: String, default: 'https://youtube.com' },
    },
    seo: {
      metaTitle: { type: String, default: 'EventPro - Discover, Plan & Experience Exceptional Events' },
      metaDescription: {
        type: String,
        default: 'Find premium corporate events, conferences, workshops, and exhibitions worldwide.',
      },
      keywords: [{ type: String }],
    },
    currency: { type: String, default: 'USD' },
    enablePublicRegistration: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const WebsiteSettings = mongoose.model<IWebsiteSettingsDocument>('WebsiteSettings', websiteSettingsSchema);
