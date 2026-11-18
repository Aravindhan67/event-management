export type UserRole = 'super_admin' | 'admin' | 'organizer' | 'attendee';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  organization?: string;
  isActive: boolean;
  lastLogin?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  color?: string;
  featured?: boolean;
  eventCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';
export type LocationType = 'in_person' | 'virtual' | 'hybrid';

export interface IScheduleItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}

export interface IVenue {
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface IEvent {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string | ICategory;
  organizer: string | IUser;
  bannerImage: string;
  gallery?: string[];
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  locationType: LocationType;
  venue?: IVenue;
  virtualUrl?: string;
  status: EventStatus;
  isFeatured: boolean;
  tags?: string[];
  schedule?: IScheduleItem[];
  totalCapacity: number;
  bookedSeats: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TicketType = 'free' | 'paid';

export interface ITicket {
  _id: string;
  event: string | IEvent;
  name: string;
  type: TicketType;
  price: number;
  quantity: number;
  availableQuantity: number;
  maxPerOrder: number;
  salesStartDate?: string;
  salesEndDate?: string;
  description?: string;
  perks?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'refunded';
export type PaymentStatus = 'paid' | 'free' | 'pending' | 'failed';

export interface IBookingTicketItem {
  ticket: string | ITicket;
  ticketName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface IAttendeeInfo {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface IBooking {
  _id: string;
  bookingReference: string;
  event: string | IEvent;
  user: string | IUser;
  tickets: IBookingTicketItem[];
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  attendeeInfo: IAttendeeInfo;
  notes?: string;
  qrCodeUrl?: string;
  cancelledAt?: Date;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment {
  _id: string;
  booking: string | IBooking;
  user: string | IUser;
  amount: number;
  currency: string;
  method: 'card' | 'stripe' | 'razorpay' | 'bank_transfer' | 'free';
  transactionId: string;
  status: 'pending' | 'succeeded' | 'failed';
  gatewayResponse?: any;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  assignedTo?: string | IUser;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITestimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  content: string;
  isApproved: boolean;
  event?: string | IEvent;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewsletter {
  _id: string;
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

export interface INotification {
  _id: string;
  recipient: string | IUser;
  title: string;
  message: string;
  type: 'booking' | 'event_update' | 'reminder' | 'system';
  isRead: boolean;
  linkUrl?: string;
  createdAt: Date;
}

export interface IActivityLog {
  _id: string;
  user?: string | IUser;
  action: string;
  entityType: string;
  entityId?: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface IWebsiteSettings {
  _id: string;
  companyName: string;
  siteTitle: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  currency: string;
  enablePublicRegistration: boolean;
}
