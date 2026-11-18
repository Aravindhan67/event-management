# EventPro | Enterprise Event Management Platform

![EventPro Platform](https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80)

> **"Creating Unforgettable Experiences, One Event at a Time."**
> A modern, commercial-grade Event Management Platform engineered with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

---

## 1. System Overview & Key Capabilities

- **Public Event Discovery & Booking**: Full catalog discovery with multi-facet filtering (keyword search, category, city/location, date range), grid/list views, real-time remaining seat indicators, multi-tier ticket passes, and instant digital confirmations with QR verification codes.
- **Atomic Capacity Guard**: High-concurrency seat decrementing on MongoDB (`$inc` with conditional expressions) ensuring **zero overbooking** during ticket releases.
- **Attendee Portal (`/my-bookings`)**: View registered passes, printable/PDF pass modal with unique reference IDs (`EVT-2026-XXXXX`), and reservation cancellation with automatic capacity release.
- **Organizer Studio (`/organizer`)**: Multi-tenant scoped dashboard allowing organizers to create and manage their own events, track ticket sales velocity, review attendee rosters, and export registrations to CSV.
- **Executive Admin Console (`/admin`)**: Interactive Recharts analytics (monthly booking trends, revenue flow, category distribution), full event lifecycle management (draft, published, cancelled), category administration, user role assignment (`super_admin`, `admin`, `organizer`, `attendee`), inquiry CRM, and platform settings.

---

## 2. Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, React Router DOM v6, Axios, Recharts, Lucide React, React Hook Form, Zod.
- **Backend**: Node.js, Express.js, TypeScript, Mongoose ODM, JWT, bcryptjs, Zod, Helmet, Morgan, Multer.
- **Database**: MongoDB (7.0+).
- **Architecture**: Clean MVC with modular services, strict TypeScript types across client and server, and RESTful APIs.

---

## 3. How to Run the Website

### Step 1: Ensure MongoDB is Running
Make sure your local MongoDB daemon is running on port `27017` (or provide your MongoDB Atlas connection string in `server/.env`).

```bash
# To start MongoDB locally using the workspace data directory:
mongod --dbpath "data/db"
```

### Step 2: Seed the Database with Realistic Event Data
Run the database seed script to populate default users, 8 portfolio categories, featured events, ticket packages, and testimonials:

```bash
cd server
npm run seed
```

### Step 3: Start the Backend Server (Port 5000)
Open a terminal in `server` and run:

```bash
cd server
npm run dev
```
> The API server will start at `http://localhost:5000` (Health check: `http://localhost:5000/api/health`).

### Step 4: Start the Frontend Client (Port 5173)
Open a second terminal in `client` and run:

```bash
cd client
npm run dev
```
> Open your browser at **`http://localhost:5173`** to access the application.

---

## 4. Default Seed Accounts & Roles

All accounts are pre-seeded with the password: **`password123`** (or use the one-click quick-fill buttons on the `/login` screen).

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin@eventpro.com` | `password123` | Full system control, role assignment, platform settings, all events & bookings |
| **Platform Admin** | `admin@eventpro.com` | `password123` | Event approval, category management, inquiry CRM, booking management |
| **Event Organizer** | `organizer@eventpro.com` | `password123` | Dedicated Organizer Studio, manage own events, export attendee rosters |
| **Attendee** | `attendee@eventpro.com` | `password123` | Public ticket booking, download digital pass with QR code, cancel reservations |

---

## 5. Website Navigation Map

### Public Frontend
- **Home Page** (`/`): Hero headline, event statistics counter, portfolio categories, featured events, why choose us, services, testimonials, newsletter subscription, and contact banner.
- **About Us** (`/about`): Heritage, mission, vision, core values, and executive leadership team.
- **Event Discovery** (`/events`): Search by title/tags, category dropdown, city filter, date picker, sort (upcoming, newest, popular), grid & list view toggle, and pagination.
- **Event Details** (`/events/:slug`): Banner, ticket packages breakdown, detailed schedule timeline, organizer bio, venue information, and related events.
- **Ticket Reservation** (`/register/:eventId`): Multi-tier ticket selector, attendee information form, payment method selector, atomic capacity reservation, and confirmation screen with QR code.
- **My Bookings** (`/my-bookings`): View all reservations, inspect digital tickets, print/save PDF passes, and cancel bookings.
- **Contact Us** (`/contact`): Inquiry form, direct office contacts, interactive map placeholder, and social links.

### Organizer Studio (`/organizer`)
- **Studio Overview** (`/organizer`): Scoped metrics for organizer's events, tickets sold, revenue, and recent delegate registrations.
- **My Events** (`/organizer/events`): Create new events with schedule timeline items, edit venues, publish/draft toggle, and delete.
- **Registrations** (`/organizer/bookings`): View delegate passes for organizer's events and export attendee rosters to CSV.
- **Attendee Directory** (`/organizer/attendees`): Delegate contact list and history.

### Admin Console (`/admin`)
- **Executive Overview** (`/admin`): High-level KPI cards, Recharts monthly revenue and booking bar chart, category distribution donut, and live bookings feed.
- **Event Management** (`/admin/events`): Global event administration across all organizers.
- **Booking Management** (`/admin/bookings`): Global registration ledger, cancellation controls, and full CSV exports.
- **Attendee Directory** (`/admin/attendees`): Aggregated delegate directory across all events.
- **Category Governance** (`/admin/categories`): Create, edit, and color-code event categories.
- **Inquiries CRM** (`/admin/inquiries`): Read incoming messages and update status (`new`, `in_progress`, `resolved`).
- **User Governance** (`/admin/users`): Assign roles (`super_admin`, `admin`, `organizer`, `attendee`), activate/deactivate accounts, and delete users.
- **Settings** (`/admin/settings`): Manage company branding, default currency, contact coordinates, and SEO tags.

---

## 6. REST API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Authenticate & obtain JWT
- `GET /api/auth/me` - Get authenticated profile
- `PUT /api/auth/profile` - Update profile details
- `POST /api/auth/forgot-password` - Request reset token
- `POST /api/auth/reset-password` - Set new password

### Events (`/api/events`)
- `GET /api/events` - Query published events (search, category, city, date, sort, pagination)
- `GET /api/events/slug/:slug` - Get event by slug with tickets & related events
- `GET /api/events/:id` - Get event by ID
- `GET /api/events/organizer/my-events` - Get organizer-scoped events (Protected)
- `POST /api/events` - Create event (Organizer / Admin)
- `PUT /api/events/:id` - Update event (Ownership check)
- `PATCH /api/events/:id/status` - Publish or unpublish event
- `DELETE /api/events/:id` - Delete event

### Bookings & Tickets (`/api/bookings`, `/api/tickets`)
- `POST /api/bookings` - Atomic reservation with concurrency lock
- `GET /api/bookings/my` - Get current user's bookings
- `GET /api/bookings/:id` - Get booking details & QR code
- `PATCH /api/bookings/:id/cancel` - Cancel booking and release seats
- `GET /api/bookings/admin/all` - List bookings (Admin/Organizer scoped)
- `GET /api/bookings/admin/export-csv` - Download CSV report
- `GET /api/tickets/event/:eventId` - Get ticket tiers for an event
- `POST /api/tickets` - Create ticket tier

### Inquiries, Testimonials, Analytics & Settings
- `POST /api/inquiries` - Submit contact inquiry
- `GET /api/inquiries` - List inquiries (Admin)
- `PATCH /api/inquiries/:id/status` - Update inquiry status
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/analytics/overview` - Aggregate KPI metrics & charts
- `GET /api/settings` - Get website settings
- `PUT /api/settings` - Update platform settings (Admin)
- `POST /api/uploads` - Upload event banner/image

---

## 7. Security & Architecture Principles

1. **Atomic Concurrency Guarantee**: Prevents double-booking and capacity overruns using conditional atomic MongoDB queries (`$expr: { $lte: [{ $add: ['$bookedSeats', qty] }, '$totalCapacity'] }`).
2. **Role-Based Access Control**: Route-level and controller-level guards verifying JWT signatures and enforcing permissions (`super_admin`, `admin`, `organizer`, `attendee`).
3. **Multi-Tenant Ownership Verification**: Organizers can strictly only edit, delete, or inspect bookings for events they created.
4. **Data Validation**: 100% of incoming payloads validated with Zod schemas.
5. **Password Encryption**: Salted hashes generated via bcrypt.
6. **HTTP Security Headers**: Enabled via Helmet and configured CORS origin policies.
#   e v e n t - m a n a g e m e n t  
 