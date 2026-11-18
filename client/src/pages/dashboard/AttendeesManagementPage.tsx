import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, Building, UserCheck } from 'lucide-react';
import api from '../../services/api';
import { Header } from '../../components/dashboard/Header';
import { TableRowSkeleton } from '../../components/common/LoadingSkeleton';

export const AttendeesManagementPage: React.FC = () => {
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAttendees = async () => {
      setLoading(true);
      try {
        const res = await api.get('/bookings/admin/all?limit=100');
        if (res.data.success) {
          // Extract unique attendees by email
          const map = new Map();
          res.data.data.forEach((b: any) => {
            const email = b.attendeeInfo?.email;
            if (email && !map.has(email)) {
              map.set(email, {
                fullName: b.attendeeInfo?.fullName,
                email: b.attendeeInfo?.email,
                phone: b.attendeeInfo?.phone,
                company: b.attendeeInfo?.company,
                bookingCount: 1,
                lastBooking: b.createdAt,
              });
            } else if (email && map.has(email)) {
              const existing = map.get(email);
              existing.bookingCount += 1;
            }
          });
          setAttendees(Array.from(map.values()));
        }
      } catch (err) {
        console.error('Failed fetching attendees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  const filtered = attendees.filter(
    (a) =>
      a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <Header
        title="Attendee Directory"
        subtitle="Roster of registered delegates, executive guests, and conference participants."
      />

      <div className="px-8 space-y-6">
        <div className="bg-brand-surface p-4 rounded-2xl border border-brand-border flex items-center justify-between shadow-subtle">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-brand-mutedGray absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by attendee name, email, or company..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <span className="text-xs text-brand-mutedGray font-semibold">
            {filtered.length} Unique Delegates
          </span>
        </div>

        <div className="bg-brand-surface rounded-2xl border border-brand-border overflow-hidden shadow-subtle">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border bg-brand-background/60 text-brand-mutedGray uppercase tracking-wider font-semibold">
                <th className="p-4">Attendee Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Organization</th>
                <th className="p-4">Reservations</th>
                <th className="p-4">Latest Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-darkSlate">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} cols={5} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-brand-mutedGray italic">
                    No attendee records found.
                  </td>
                </tr>
              ) : (
                filtered.map((att, idx) => (
                  <tr key={idx} className="hover:bg-brand-hoverBg/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs">
                          {att.fullName?.charAt(0) || 'A'}
                        </div>
                        <span className="font-semibold text-brand-primary">{att.fullName}</span>
                      </div>
                    </td>
                    <td className="p-4 space-y-0.5">
                      <p className="flex items-center gap-1.5 text-brand-mutedGray">
                        <Mail className="w-3 h-3 text-brand-accent" />
                        <span>{att.email}</span>
                      </p>
                      {att.phone && (
                        <p className="flex items-center gap-1.5 text-brand-mutedGray">
                          <Phone className="w-3 h-3 text-brand-secondary" />
                          <span>{att.phone}</span>
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      {att.company ? (
                        <span className="font-medium text-brand-darkSlate flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-brand-secondary" />
                          <span>{att.company}</span>
                        </span>
                      ) : (
                        <span className="text-brand-mutedGray italic">Individual</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs">
                        {att.bookingCount} event(s)
                      </span>
                    </td>
                    <td className="p-4 text-brand-mutedGray">
                      {att.lastBooking ? new Date(att.lastBooking).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
