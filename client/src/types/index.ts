export type UserRole = 'super_admin' | 'admin' | 'organizer' | 'attendee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  organization?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
  color?: string;
  featured?: boolean;
  eventCount: number;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
}

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';
export type LocationType = 'in_person' | 'virtual' | 'hybrid';

export interface EventItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: Category;
  organizer: User;
  bannerImage: string;
  gallery?: string[];
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  locationType: LocationType;
  venue?: Venue;
  virtualUrl?: string;
  status: EventStatus;
  isFeatured: boolean;
  tags?: string[];
  schedule?: ScheduleItem[];
  totalCapacity: number;
  bookedSeats: number;
  tickets?: Ticket[];
  relatedEvents?: EventItem[];
}

export interface Ticket {
  _id: string;
  event: string;
  name: string;
  type: 'free' | 'paid';
  price: number;
  quantity: number;
  availableQuantity: number;
  maxPerOrder: number;
  salesStartDate?: string;
  salesEndDate?: string;
  description?: string;
  perks?: string[];
}

export interface BookingTicketItem {
  ticket: string | Ticket;
  ticketName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface AttendeeInfo {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface Booking {
  _id: string;
  bookingReference: string;
  event: EventItem;
  user: User;
  tickets: BookingTicketItem[];
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'refunded';
  paymentStatus: 'paid' | 'free' | 'pending' | 'failed';
  attendeeInfo: AttendeeInfo;
  notes?: string;
  qrCodeUrl?: string;
  cancelledAt?: string;
  cancelReason?: string;
  createdAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  content: string;
  isApproved: boolean;
}

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  notes?: string;
  createdAt: string;
}

export interface OverviewAnalytics {
  totalEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  totalRegistrations: number;
  totalAttendees: number;
  totalRevenue: number;
  totalUsers: number;
  monthlyStats: { month: string; bookings: number; revenue: number }[];
  categoryDistribution: { name: string; count: number; color: string }[];
  recentBookings: any[];
}
