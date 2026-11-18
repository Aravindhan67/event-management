import { Request, Response } from 'express';
import { Event } from '../models/Event';
import { Category } from '../models/Category';
import { Ticket } from '../models/Ticket';
import { AuthRequest } from '../middleware/auth';
import { createEventSchema } from '../validators/schemas';

const generateSlug = (text: string) => {
  return `${text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')}-${Date.now().toString().slice(-4)}`;
};

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      category,
      location,
      startDate,
      status,
      isFeatured,
      sort = 'upcoming',
      page = 1,
      limit = 12,
    } = req.query;

    const query: any = {};

    // For public website, only show published unless explicitly requested by authorized user
    if (status) {
      query.status = status;
    } else {
      query.status = 'published';
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }

    if (category) {
      // Find category by slug or id
      const catDoc = await Category.findOne({
        $or: [{ slug: category }, { _id: category.toString().match(/^[0-9a-fA-F]{24}$/) ? category : null }],
      });
      if (catDoc) {
        query.category = catDoc._id;
      }
    }

    if (location) {
      query.$or = [
        { 'venue.city': { $regex: String(location), $options: 'i' } },
        { 'venue.name': { $regex: String(location), $options: 'i' } },
        { 'venue.address': { $regex: String(location), $options: 'i' } },
      ];
    }

    if (startDate) {
      query.startDate = { $gte: String(startDate) };
    }

    if (search) {
      query.$or = [
        { title: { $regex: String(search), $options: 'i' } },
        { shortDescription: { $regex: String(search), $options: 'i' } },
        { tags: { $in: [new RegExp(String(search), 'i')] } },
      ];
    }

    let sortOption: any = { startDate: 1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };
    if (sort === 'upcoming') sortOption = { startDate: 1 };
    if (sort === 'popular') sortOption = { bookedSeats: -1 };

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [events, total] = await Promise.all([
      Event.find(query)
        .populate('category', 'name slug color icon')
        .populate('organizer', 'name email avatar organization')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum),
      Event.countDocuments(query),
    ]);

    // Attach tickets and lowest price for each package
    const eventIds = events.map((e) => e._id);
    const allTickets = await Ticket.find({ event: { $in: eventIds } });

    const eventsWithTickets = events.map((evt) => {
      const evtTickets = allTickets.filter((t) => t.event.toString() === evt._id.toString());
      return {
        ...evt.toObject(),
        tickets: evtTickets,
      };
    });

    res.json({
      success: true,
      data: eventsWithTickets,
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

export const getEventBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findOne({ slug: req.params.slug })
      .populate('category', 'name slug color icon')
      .populate('organizer', 'name email avatar organization');

    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found.' });
      return;
    }

    const tickets = await Ticket.find({ event: event._id });

    // Fetch related events in same category
    const relatedEvents = await Event.find({
      category: event.category,
      _id: { $ne: event._id },
      status: 'published',
    })
      .limit(3)
      .populate('category', 'name slug color');

    res.json({
      success: true,
      data: {
        ...event.toObject(),
        tickets,
        relatedEvents,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('category')
      .populate('organizer', 'name email avatar organization');

    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found.' });
      return;
    }

    const tickets = await Ticket.find({ event: event._id });

    res.json({ success: true, data: { ...event.toObject(), tickets } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    const validatedData = createEventSchema.parse(req.body);
    const slug = generateSlug(validatedData.title);

    const event = await Event.create({
      ...validatedData,
      slug,
      organizer: req.user._id,
      bookedSeats: 0,
    });

    // Increment category event count
    await Category.findByIdAndUpdate(validatedData.category, { $inc: { eventCount: 1 } });

    res.status(201).json({ success: true, message: 'Event created successfully.', data: event });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found.' });
      return;
    }

    // Role check: Only admin, super_admin or owner can edit
    if (
      req.user?.role !== 'admin' &&
      req.user?.role !== 'super_admin' &&
      event.organizer.toString() !== req.user?._id.toString()
    ) {
      res.status(403).json({ success: false, message: 'Forbidden: You cannot modify this event.' });
      return;
    }

    const oldCategory = event.category.toString();
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (req.body.category && req.body.category !== oldCategory) {
      await Promise.all([
        Category.findByIdAndUpdate(oldCategory, { $inc: { eventCount: -1 } }),
        Category.findByIdAndUpdate(req.body.category, { $inc: { eventCount: 1 } }),
      ]);
    }

    res.json({ success: true, message: 'Event updated successfully.', data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateEventStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    if (!['draft', 'published', 'cancelled', 'completed'].includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status.' });
      return;
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found.' });
      return;
    }

    // Role check: Admin, super_admin, or owner
    if (
      req.user?.role !== 'admin' &&
      req.user?.role !== 'super_admin' &&
      event.organizer.toString() !== req.user?._id.toString()
    ) {
      res.status(403).json({ success: false, message: 'Forbidden.' });
      return;
    }

    event.status = status;
    await event.save();

    res.json({ success: true, message: `Event status updated to ${status}.`, data: event });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found.' });
      return;
    }

    if (
      req.user?.role !== 'admin' &&
      req.user?.role !== 'super_admin' &&
      event.organizer.toString() !== req.user?._id.toString()
    ) {
      res.status(403).json({ success: false, message: 'Forbidden: You cannot delete this event.' });
      return;
    }

    await Promise.all([
      Event.findByIdAndDelete(req.params.id),
      Category.findByIdAndUpdate(event.category, { $inc: { eventCount: -1 } }),
      Ticket.deleteMany({ event: req.params.id }),
    ]);

    res.json({ success: true, message: 'Event deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrganizerEvents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    const { page = 1, limit = 20, search } = req.query;
    const query: any = { organizer: req.user._id };

    if (search) {
      query.title = { $regex: String(search), $options: 'i' };
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [events, total] = await Promise.all([
      Event.find(query)
        .populate('category', 'name slug color')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Event.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: events,
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
