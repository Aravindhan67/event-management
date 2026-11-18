import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Users,
  FolderTree,
  Mail,
  UserCog,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isOrganizer = user?.role === 'organizer';
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  const adminLinks = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Events', path: '/admin/events', icon: CalendarDays },
    { label: 'Bookings', path: '/admin/bookings', icon: Ticket },
    { label: 'Attendees', path: '/admin/attendees', icon: Users },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Inquiries', path: '/admin/inquiries', icon: Mail },
    { label: 'User Roles', path: '/admin/users', icon: UserCog },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const organizerLinks = [
    { label: 'Overview', path: '/organizer', icon: LayoutDashboard },
    { label: 'My Events', path: '/organizer/events', icon: CalendarDays },
    { label: 'Registrations', path: '/organizer/bookings', icon: Ticket },
    { label: 'Attendee List', path: '/organizer/attendees', icon: Users },
  ];

  const links = isOrganizer ? organizerLinks : adminLinks;

  const isActive = (path: string) => {
    if (path === '/admin' || path === '/organizer') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-brand-primary text-white flex flex-col shrink-0 min-h-screen border-r border-brand-primary/20">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-white/10 gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
          <Calendar className="w-5 h-5 text-brand-accent" />
        </div>
        <div>
          <span className="font-heading font-bold text-lg text-white tracking-tight flex items-center gap-1">
            Event<span className="text-brand-accent">Pro</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider text-brand-secondary font-semibold block">
            {isOrganizer ? 'Organizer Studio' : 'Admin Console'}
          </span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-brand-accent text-white shadow-subtle'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Exit Studio */}
      <div className="p-4 border-t border-white/10">
        <Link
          to="/"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span>Return to Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-brand-accent" />
        </Link>
      </div>
    </aside>
  );
};
