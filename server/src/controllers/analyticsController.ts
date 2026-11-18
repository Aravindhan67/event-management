import { Response } from 'express';
import { Event } from '../models/Event';
import { Booking } from '../models/Booking';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { AuthRequest } from '../middleware/auth';

export const getOverviewAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const isOrganizer = req.user?.role === 'organizer';
    const eventQuery: any = {};
    const bookingQuery: any = {};

    if (isOrganizer) {
      eventQuery.organizer = req.user?._id;
      const myEvents = await Event.find({ organizer: req.user?._id }).select('_id');
      bookingQuery.event = { $in: myEvents.map((e) => e._id) };
    }

    const todayStr = new Date().toISOString().split('T')[0];

    const [
      totalEvents,
      upcomingEvents,
      completedEvents,
      totalRegistrations,
      allBookings,
      totalUsers,
      categories,
      recentBookings,
    ] = await Promise.all([
      Event.countDocuments(eventQuery),
      Event.countDocuments({ ...eventQuery, startDate: { $gte: todayStr }, status: 'published' }),
      Event.countDocuments({ ...eventQuery, $or: [{ startDate: { $lt: todayStr } }, { status: 'completed' }] }),
      Booking.countDocuments(bookingQuery),
      Booking.find(bookingQuery).select('totalAmount tickets createdAt status'),
      isOrganizer ? Promise.resolve(0) : User.countDocuments({ role: 'attendee' }),
      Category.find().select('name slug eventCount color'),
      Booking.find(bookingQuery)
        .populate('event', 'title startDate')
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(6),
    ]);

    // Calculate revenue & attendees
    let totalRevenue = 0;
    let totalAttendees = 0;

    allBookings.forEach((b: any) => {
      if (b.status === 'confirmed') {
        totalRevenue += b.totalAmount || 0;
        const ticketCount = b.tickets?.reduce((acc: number, t: any) => acc + (t.quantity || 0), 0) || 0;
        totalAttendees += ticketCount;
      }
    });

    // Monthly bookings aggregation (last 6 months)
    const monthlyStats: { [month: string]: { month: string; bookings: number; revenue: number } } = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${months[d.getMonth()]} ${d.getFullYear()}`;
      monthlyStats[key] = { month: months[d.getMonth()], bookings: 0, revenue: 0 };
    }

    allBookings.forEach((b: any) => {
      if (b.status === 'confirmed' && b.createdAt) {
        const d = new Date(b.createdAt);
        const key = `${months[d.getMonth()]} ${d.getFullYear()}`;
        if (monthlyStats[key]) {
          monthlyStats[key].bookings += 1;
          monthlyStats[key].revenue += b.totalAmount || 0;
        }
      }
    });

    // Category distribution
    const categoryDistribution = categories.map((cat) => ({
      name: cat.name,
      count: cat.eventCount || 0,
      color: cat.color || '#183153',
    }));

    res.json({
      success: true,
      data: {
        totalEvents,
        upcomingEvents,
        completedEvents,
        totalRegistrations,
        totalAttendees: totalAttendees || totalRegistrations,
        totalRevenue,
        totalUsers,
        monthlyStats: Object.values(monthlyStats),
        categoryDistribution,
        recentBookings,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
