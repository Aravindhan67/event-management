import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Ticket,
  Users,
  DollarSign,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import api from '../../services/api';
import { OverviewAnalytics } from '../../types';
import { Header } from '../../components/dashboard/Header';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const OrganizerDashboardPage: React.FC = () => {
  const [data, setData] = useState<OverviewAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/analytics/overview');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Failed fetching organizer analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <Header
        title="Organizer Studio"
        subtitle="Manage your events, monitor ticket sales velocity, and export attendee rosters."
      />

      <div className="px-8 space-y-8">
        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-brand-surface p-4 rounded-2xl border border-brand-border shadow-subtle">
          <div>
            <h3 className="text-sm font-bold text-brand-primary font-heading">
              Organized Event Operations
            </h3>
            <p className="text-xs text-brand-mutedGray">
              All metrics below reflect events owned and managed by your organization.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/organizer/events">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Create New Event
              </Button>
            </Link>
            <Link to="/organizer/bookings">
              <Button variant="outline" size="sm">
                View Registrations
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="My Events"
            value={data?.totalEvents || 0}
            icon={<CalendarDays className="w-6 h-6 text-brand-primary" />}
            subtitle="Active in system"
          />
          <StatsCard
            title="Upcoming Gatherings"
            value={data?.upcomingEvents || 0}
            icon={<TrendingUp className="w-6 h-6 text-brand-secondary" />}
            subtitle="Scheduled ahead"
          />
          <StatsCard
            title="Total Registrations"
            value={data?.totalRegistrations || 0}
            icon={<Ticket className="w-6 h-6 text-brand-accent" />}
            subtitle="Tickets issued"
          />
          <StatsCard
            title="Event Revenue"
            value={`$${(data?.totalRevenue || 0).toLocaleString()}`}
            icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
            subtitle="Ticket proceeds"
          />
        </div>

        {/* Recent Registrations for Organizer */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-brand-primary font-heading">
                Recent Delegate Registrations
              </h3>
              <p className="text-xs text-brand-mutedGray">
                Recent attendees registered for your organized events.
              </p>
            </div>
            <Link
              to="/organizer/bookings"
              className="text-xs font-semibold text-brand-secondary hover:text-brand-primary flex items-center gap-1"
            >
              <span>View Full Roster</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border text-brand-mutedGray uppercase tracking-wider font-semibold">
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Attendee Name</th>
                  <th className="pb-3">Event</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Registered At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-brand-darkSlate">
                {data?.recentBookings && data.recentBookings.length > 0 ? (
                  data.recentBookings.map((b: any) => (
                    <tr key={b._id} className="hover:bg-brand-hoverBg/50 transition-colors">
                      <td className="py-3 font-mono font-bold text-brand-primary">
                        {b.bookingReference}
                      </td>
                      <td className="py-3">
                        <p className="font-semibold">{b.attendeeInfo?.fullName}</p>
                        <p className="text-[11px] text-brand-mutedGray">{b.attendeeInfo?.email}</p>
                      </td>
                      <td className="py-3 max-w-[200px] truncate font-medium">
                        {b.event?.title || 'Event'}
                      </td>
                      <td className="py-3 font-bold">${b.totalAmount}</td>
                      <td className="py-3">
                        <Badge
                          variant={
                            b.status === 'confirmed'
                              ? 'success'
                              : b.status === 'cancelled'
                              ? 'danger'
                              : 'warning'
                          }
                          size="sm"
                        >
                          {b.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-brand-mutedGray">
                        {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-brand-mutedGray italic">
                      No registrations for your events yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
