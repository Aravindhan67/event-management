import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Calendar,
  Sparkles,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Ticket,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/events' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-surface/95 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-subtle group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-brand-accent" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-brand-primary tracking-tight flex items-center gap-1">
                Utsav<span className="text-brand-accent">Events</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-brand-mutedGray font-medium">
                Weddings • Decors • Photography
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-brand-primary bg-brand-hoverBg font-semibold'
                    : 'text-brand-mutedGray hover:text-brand-primary hover:bg-brand-hoverBg/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 pr-2.5 rounded-full border border-brand-border hover:bg-brand-hoverBg transition-colors"
                >
                  <span className="text-sm font-medium text-brand-darkSlate max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-semibold overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 text-brand-mutedGray" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-brand-surface rounded-xl shadow-modal border border-brand-border py-1.5 z-50 animate-fade-in"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-brand-border">
                      <p className="text-xs font-medium text-brand-mutedGray">Signed in as</p>
                      <p className="text-sm font-semibold text-brand-primary truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-brand-primary/10 text-brand-primary">
                        {user.role.replace('_', ' ')}
                      </span>
                    </div>

                    <Link
                      to="/my-bookings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-brand-darkSlate hover:bg-brand-hoverBg transition-colors"
                    >
                      <Ticket className="w-4 h-4 text-brand-secondary" />
                      <span>My Bookings</span>
                    </Link>

                    {user.role === 'organizer' && (
                      <Link
                        to="/organizer"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-brand-darkSlate hover:bg-brand-hoverBg transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand-accent" />
                        <span>Organizer Dashboard</span>
                      </Link>
                    )}

                    {(user.role === 'admin' || user.role === 'super_admin') && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-brand-darkSlate hover:bg-brand-hoverBg transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand-primary" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <div className="border-t border-brand-border mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="md" className="font-semibold text-sm px-4 py-2 hover:bg-brand-hoverBg">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="md" className="font-semibold text-sm px-5 py-2.5 rounded-xl shadow-subtle hover:shadow-card-hover transition-all">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-brand-darkSlate hover:bg-brand-hoverBg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-surface px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'text-brand-primary bg-brand-hoverBg font-semibold'
                    : 'text-brand-mutedGray hover:text-brand-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-brand-border">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-brand-background rounded-lg">
                  <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-brand-primary">{user.name}</p>
                    <p className="text-xs text-brand-mutedGray">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/my-bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-brand-darkSlate rounded-lg hover:bg-brand-hoverBg"
                >
                  <Ticket className="w-4 h-4 text-brand-secondary" />
                  <span>My Bookings</span>
                </Link>
                {user.role === 'organizer' && (
                  <Link
                    to="/organizer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-brand-darkSlate rounded-lg hover:bg-brand-hoverBg"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-accent" />
                    <span>Organizer Dashboard</span>
                  </Link>
                )}
                {(user.role === 'admin' || user.role === 'super_admin') && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-brand-darkSlate rounded-lg hover:bg-brand-hoverBg"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-primary" />
                    <span>Admin Console</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 rounded-lg hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
