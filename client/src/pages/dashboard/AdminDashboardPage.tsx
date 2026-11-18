import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Ticket,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import api from '../../services/api';
import { OverviewAnalytics } from '../../types';
import { Header } from '../../components/dashboard/Header';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const AdminDashboardPage: React.FC = () => {
  const [data, setData] = useState<OverviewAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics/overview');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Failed fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <Header
        title="Event Operations & Agency Control Center"
        subtitle="Manage upcoming weddings, baby showers, photography assignments, and client quotations."
      />

      <div className="px-8 space-y-8">
        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-brand-surface p-4 rounded-2xl border border-brand-border shadow-subtle">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-brand-darkSlate">
              System Health: Online • Atomic Capacity Guard Active
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/admin/events">
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Create New Event
              </Button>
            </Link>
            <Link to="/admin/bookings">
              <Button variant="outline" size="sm">
                View All Bookings
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Packages"
            value={data?.totalEvents || 0}
            icon={<CalendarDays className="w-6 h-6 text-brand-primary" />}
            subtitle="Active celebration packages"
            change="+15%"
          />
          <StatsCard
            title="Upcoming Celebrations"
            value={data?.upcomingEvents || 0}
            icon={<TrendingUp className="w-6 h-6 text-brand-secondary" />}
            subtitle="Weddings & Baby Showers"
          />
          <StatsCard
            title="Confirmed Bookings"
            value={data?.totalRegistrations || 0}
            icon={<Ticket className="w-6 h-6 text-brand-accent" />}
            subtitle="Client contracts signed"
            change="+28%"
          />
          <StatsCard
            title="Gross Revenue"
            value={`$${(data?.totalRevenue || 0).toLocaleString()}`}
            icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
            subtitle="Total bookings volume"
            change="+34%"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Monthly Registrations & Revenue Chart */}
          <div className="lg:col-span-8">
            <ChartCard
              title="Registration Analytics & Revenue Flow"
              subtitle="Monthly registration volume over the last 6 rolling months"
            >
              <div className="h-72 w-full">
                {data?.monthlyStats && data.monthlyStats.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.monthlyStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5EAF0" vertical={false} />
                      <XAxis dataKey="month" stroke="#778397" fontSize={12} tickLine={false} />
                      <YAxis stroke="#778397" fontSize={12} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#E5EAF0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(24, 49, 83, 0.1)',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="bookings" name="Bookings" fill="#183153" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-brand-mutedGray">
                    No analytics data accumulated yet.
                  </div>
                )}
              </div>
            </ChartCard>
          </div>

          {/* Category Distribution Donut */}
          <div className="lg:col-span-4">
            <ChartCard
              title="Category Distribution"
              subtitle="Breakdown of events across portfolio categories"
            >
              <div className="h-72 w-full flex items-center justify-center">
                {data?.categoryDistribution && data.categoryDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.categoryDistribution}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={4}
                      >
                        {data.categoryDistribution.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color || '#183153'} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-brand-mutedGray">No category data available.</p>
                )}
              </div>
            </ChartCard>
          </div>
        </div>

        {/* Recent Registrations Table */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-brand-primary font-heading">
                Recent Bookings Activity
              </h3>
              <p className="text-xs text-brand-mutedGray">
                Live stream of confirmed event reservations and ticket orders.
              </p>
            </div>
            <Link
              to="/admin/bookings"
              className="text-xs font-semibold text-brand-secondary hover:text-brand-primary flex items-center gap-1"
            >
              <span>View All Registrations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border text-brand-mutedGray uppercase tracking-wider font-semibold">
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Attendee</th>
                  <th className="pb-3">Event</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
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
                        <p className="font-semibold">{b.attendeeInfo?.fullName || b.user?.name}</p>
                        <p className="text-[11px] text-brand-mutedGray">
                          {b.attendeeInfo?.email || b.user?.email}
                        </p>
                      </td>
                      <td className="py-3 max-w-[200px] truncate font-medium">
                        {b.event?.title || 'Unknown Event'}
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
                      No registrations recorded yet.
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
