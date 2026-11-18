import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { AboutPage } from '../pages/public/AboutPage';
import { EventsPage } from '../pages/public/EventsPage';
import { EventDetailsPage } from '../pages/public/EventDetailsPage';
import { GalleryPage } from '../pages/public/GalleryPage';
import { RegisterBookingPage } from '../pages/public/RegisterBookingPage';
import { ContactPage } from '../pages/public/ContactPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';

// User Pages
import { MyBookingsPage } from '../pages/user/MyBookingsPage';

// Admin / Organizer Dashboard Pages
import { AdminDashboardPage } from '../pages/dashboard/AdminDashboardPage';
import { OrganizerDashboardPage } from '../pages/dashboard/OrganizerDashboardPage';
import { EventsManagementPage } from '../pages/dashboard/EventsManagementPage';
import { BookingsManagementPage } from '../pages/dashboard/BookingsManagementPage';
import { AttendeesManagementPage } from '../pages/dashboard/AttendeesManagementPage';
import { CategoriesManagementPage } from '../pages/dashboard/CategoriesManagementPage';
import { InquiriesManagementPage } from '../pages/dashboard/InquiriesManagementPage';
import { UsersManagementPage } from '../pages/dashboard/UsersManagementPage';
import { SettingsPage } from '../pages/dashboard/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:slug" element={<EventDetailsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* User Bookings (Protected) */}
        <Route
          path="/register/:eventId"
          element={
            <ProtectedRoute>
              <RegisterBookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Dashboard Routes (Protected: admin, super_admin) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="events" element={<EventsManagementPage />} />
        <Route path="bookings" element={<BookingsManagementPage />} />
        <Route path="attendees" element={<AttendeesManagementPage />} />
        <Route path="categories" element={<CategoriesManagementPage />} />
        <Route path="inquiries" element={<InquiriesManagementPage />} />
        <Route path="users" element={<UsersManagementPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Organizer Studio Routes (Protected: organizer, admin, super_admin) */}
      <Route
        path="/organizer"
        element={
          <ProtectedRoute allowedRoles={['organizer', 'admin', 'super_admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OrganizerDashboardPage />} />
        <Route path="events" element={<EventsManagementPage />} />
        <Route path="bookings" element={<BookingsManagementPage />} />
        <Route path="attendees" element={<AttendeesManagementPage />} />
      </Route>
    </Routes>
  );
};
