import { Request, Response } from 'express';
import crypto from 'crypto';
import { Booking } from '../models/Booking';
import { Event } from '../models/Event';
import { Ticket } from '../models/Ticket';
import { PaymentService } from '../services/paymentService';
import { sendBookingConfirmationEmail } from '../services/emailService';
import { AuthRequest } from '../middleware/auth';
import { createBookingSchema } from '../validators/schemas';

const generateBookingRef = () => {
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `EVT-2026-${random}`;
};

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required to complete booking.' });
      return;
    }

    const {
      eventId,
      tickets: requestedTickets,
      attendeeInfo,
      paymentMethod,
      eventType,
      eventDate,
      venueName,
      venueCity,
      guestCount,
      selectedServices,
      totalAmount: clientTotal,
      advancePaid = 0,
      notes,
    } = createBookingSchema.parse(req.body);

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ success: false, message: 'Event package not found.' });
      return;
    }

    let calculatedTotal = clientTotal || 0;
    const bookingItems: any[] = [];

    // If tickets are specified, calculate subtotal
    if (requestedTickets && requestedTickets.length > 0) {
      for (const item of requestedTickets) {
        if (item.ticketId) {
          const ticketDoc = await Ticket.findById(item.ticketId);
          if (ticketDoc) {
            const subtotal = ticketDoc.price * (item.quantity || 1);
            calculatedTotal += subtotal;
            bookingItems.push({
              ticket: ticketDoc._id,
              ticketName: ticketDoc.name,
              unitPrice: ticketDoc.price,
              quantity: item.quantity || 1,
              subtotal,
            });
          }
        }
      }
    }

    // Default package price if no items
    if (calculatedTotal === 0) {
      const defaultTicket = await Ticket.findOne({ event: eventId });
      calculatedTotal = defaultTicket ? defaultTicket.price : 1200;
      bookingItems.push({
        ticketName: event.title,
        unitPrice: calculatedTotal,
        quantity: 1,
        subtotal: calculatedTotal,
      });
    }

    const bookingReference = generateBookingRef();
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      JSON.stringify({ ref: bookingReference, event: event.title, client: attendeeInfo.fullName })
    )}`;

    // Create booking record for Event Planning Agency
    const booking = await Booking.create({
      bookingReference,
      event: eventId,
      user: req.user._id,
      tickets: bookingItems,
      totalAmount: calculatedTotal,
      advancePaid: advancePaid || Math.round(calculatedTotal * 0.3), // 30% advance standard
      status: 'confirmed',
      paymentStatus: 'paid',
      attendeeInfo,
      eventType: eventType || event.title,
      eventDate: eventDate || event.startDate,
      venueName: venueName || event.venue?.name || '',
      venueCity: venueCity || event.venue?.city || '',
      guestCount: guestCount || 100,
      selectedServices: selectedServices || ['Full Event Coordination', 'Photography', 'Decor'],
      assignedCoordinator: {
        name: 'Alexander Wright',
        phone: '+1 (555) 019-2834',
        role: 'Senior Event Producer',
      },
      notes,
      qrCodeUrl,
    });

    // Record payment
    await PaymentService.processPayment({
      bookingId: booking._id.toString(),
      userId: req.user._id.toString(),
      amount: calculatedTotal,
      currency: 'USD',
      method: paymentMethod || 'card',
    });

    // Increment booked event count
    await Event.findByIdAndUpdate(eventId, { $inc: { bookedSeats: 1 } });

    res.status(201).json({
      success: true,
      message: 'Event booking confirmed successfully!',
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || 'Booking failed.' });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'event',
        select: 'title slug bannerImage startDate startTime locationType venue',
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBookingById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'event',
        populate: { path: 'category organizer' },
      })
      .populate('user', 'name email');

    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found.' });
      return;
    }

    // Authorization: User must own booking or be an admin/organizer
    const bookingUserId = (booking.user as any)?._id ? (booking.user as any)._id.toString() : booking.user.toString();
    const isOwner = req.user?._id.toString() === bookingUserId;
    const isAdmin = req.user?.role === 'admin' || req.user?.role === 'super_admin';

    if (!isOwner && !isAdmin) {
      res.status(403).json({ success: false, message: 'Forbidden.' });
      return;
    }

    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found.' });
      return;
    }

    const isOwner = req.user._id.toString() === booking.user.toString();
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super_admin';

    if (!isOwner && !isAdmin) {
      res.status(403).json({ success: false, message: 'Forbidden: You cannot cancel this booking.' });
      return;
    }

    if (booking.status === 'cancelled') {
      res.status(400).json({ success: false, message: 'Booking is already cancelled.' });
      return;
    }

    booking.status = 'cancelled';
    booking.cancelledAt = new Date();
    booking.cancelReason = req.body.reason || 'User cancelled reservation';
    await booking.save();

    // Release capacity back to event and tickets
    let totalSeats = 0;
    for (const item of booking.tickets) {
      totalSeats += item.quantity;
      await Ticket.findByIdAndUpdate(item.ticket, { $inc: { availableQuantity: item.quantity } });
    }
    await Event.findByIdAndUpdate(booking.event, { $inc: { bookedSeats: -totalSeats } });

    res.json({ success: true, message: 'Booking cancelled successfully.', data: booking });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBookingsAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { eventId, status, search, page = 1, limit = 20 } = req.query;
    const query: any = {};

    if (eventId) query.event = eventId;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { bookingReference: { $regex: String(search), $options: 'i' } },
        { 'attendeeInfo.fullName': { $regex: String(search), $options: 'i' } },
        { 'attendeeInfo.email': { $regex: String(search), $options: 'i' } },
      ];
    }

    // If Organizer, only return bookings for events organized by this user
    if (req.user?.role === 'organizer') {
      const myEvents = await Event.find({ organizer: req.user._id }).select('_id');
      const eventIds = myEvents.map((e) => e._id);
      query.event = { $in: eventIds };
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [bookings, total] = await Promise.all([
      Booking.find(query)
        .populate('event', 'title startDate startTime venue')
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Booking.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: bookings,
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const exportBookingsCSV = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { eventId } = req.query;
    const query: any = {};
    if (eventId) query.event = eventId;

    if (req.user?.role === 'organizer') {
      const myEvents = await Event.find({ organizer: req.user._id }).select('_id');
      query.event = { $in: myEvents.map((e) => e._id) };
    }

    const bookings = await Booking.find(query).populate('event', 'title startDate').sort({ createdAt: -1 });

    let csv = 'Booking Reference,Event,Attendee Name,Attendee Email,Phone,Total Amount,Status,Booking Date\n';

    bookings.forEach((b: any) => {
      const eventTitle = `"${(b.event?.title || 'Unknown Event').replace(/"/g, '""')}"`;
      const name = `"${b.attendeeInfo?.fullName || ''}"`;
      const email = `"${b.attendeeInfo?.email || ''}"`;
      const phone = `"${b.attendeeInfo?.phone || ''}"`;
      const amount = b.totalAmount || 0;
      const status = b.status || '';
      const date = b.createdAt ? new Date(b.createdAt).toISOString() : '';

      csv += `${b.bookingReference},${eventTitle},${name},${email},${phone},${amount},${status},${date}\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment(`event-bookings-export-${Date.now()}.csv`);
    res.send(csv);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
