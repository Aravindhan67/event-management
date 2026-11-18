import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['super_admin', 'admin', 'organizer', 'attendee']).optional(),
  phone: z.string().optional(),
  organization: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(6, 'New password must be at least 6 characters'),
});

export const createEventSchema = z.object({
  title: z.string().min(3, 'Event title is required'),
  shortDescription: z.string().min(10, 'Short description is required'),
  fullDescription: z.string().min(20, 'Full description is required'),
  category: z.string().min(1, 'Category is required'),
  bannerImage: z.string().min(1, 'Banner image URL is required'),
  gallery: z.array(z.string()).optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  locationType: z.enum(['in_person', 'virtual', 'hybrid']).default('in_person'),
  venue: z
    .object({
      name: z.string().default(''),
      address: z.string().default(''),
      city: z.string().default(''),
      state: z.string().optional(),
      country: z.string().default(''),
      coordinates: z
        .object({
          lat: z.number().optional(),
          lng: z.number().optional(),
        })
        .optional(),
    })
    .optional(),
  virtualUrl: z.string().optional(),
  status: z.enum(['draft', 'published', 'cancelled', 'completed']).default('draft'),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  schedule: z
    .array(
      z.object({
        time: z.string(),
        title: z.string(),
        description: z.string().optional(),
        speaker: z.string().optional(),
      })
    )
    .optional(),
  totalCapacity: z.number().min(1, 'Capacity must be at least 1'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  color: z.string().optional(),
  featured: z.boolean().optional(),
});

export const createTicketSchema = z.object({
  event: z.string().min(1, 'Event ID is required'),
  name: z.string().min(2, 'Ticket name is required'),
  type: z.enum(['free', 'paid']).default('paid'),
  price: z.number().min(0, 'Price must be 0 or greater'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  maxPerOrder: z.number().min(1).default(5),
  salesStartDate: z.string().optional(),
  salesEndDate: z.string().optional(),
  description: z.string().optional(),
  perks: z.array(z.string()).optional(),
});

export const createBookingSchema = z.object({
  eventId: z.string().min(1, 'Event / Package ID is required'),
  tickets: z
    .array(
      z.object({
        ticketId: z.string().optional(),
        quantity: z.number().min(1).default(1),
      })
    )
    .optional(),
  attendeeInfo: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().optional(),
    company: z.string().optional(),
  }),
  paymentMethod: z.enum(['card', 'stripe', 'razorpay', 'bank_transfer', 'free']).default('card'),
  eventType: z.string().optional(),
  eventDate: z.string().optional(),
  venueName: z.string().optional(),
  venueCity: z.string().optional(),
  guestCount: z.number().optional(),
  selectedServices: z.array(z.string()).optional(),
  totalAmount: z.number().optional(),
  advancePaid: z.number().optional(),
  notes: z.string().optional(),
});

export const createInquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const createTestimonialSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.string().min(2, 'Role is required'),
  company: z.string().min(2, 'Company is required'),
  avatar: z.string().optional(),
  rating: z.number().min(1).max(5),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  event: z.string().optional(),
});

export const createNewsletterSchema = z.object({
  email: z.string().email('Valid email is required'),
});
