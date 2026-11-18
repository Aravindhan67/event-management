import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { Event } from '../models/Event';
import { Ticket } from '../models/Ticket';
import { Testimonial } from '../models/Testimonial';
import { WebsiteSettings } from '../models/WebsiteSettings';

const seed = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/event_management_db';

  try {
    await mongoose.connect(uri);
    console.log('[Seed] Connected to MongoDB.');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Event.deleteMany({}),
      Ticket.deleteMany({}),
      Testimonial.deleteMany({}),
      WebsiteSettings.deleteMany({}),
    ]);
    console.log('[Seed] Cleared existing data.');

    // 1. Create Users
    const superAdmin = await User.create({
      name: 'Alexander Wright',
      email: 'superadmin@eventpro.com',
      password: 'password123',
      role: 'super_admin',
      phone: '+1 (555) 019-2834',
      organization: 'Celebrations Pro Agency',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    });

    const admin = await User.create({
      name: 'Eleanor Vance',
      email: 'admin@eventpro.com',
      password: 'password123',
      role: 'admin',
      phone: '+1 (555) 014-9821',
      organization: 'Celebrations Pro Lead Planner',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    });

    const organizer = await User.create({
      name: 'Marcus Sterling',
      email: 'organizer@eventpro.com',
      password: 'password123',
      role: 'organizer',
      phone: '+1 (555) 018-4729',
      organization: 'Sterling Photography & Decor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    });

    const attendee = await User.create({
      name: 'Sophia Chen',
      email: 'attendee@eventpro.com',
      password: 'password123',
      role: 'attendee',
      phone: '+1 (555) 012-7634',
      organization: 'Client',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    });

    console.log('[Seed] Created default users with password "password123".');

    // 2. Create Event Agency Service Categories
    const categoriesData = [
      {
        name: 'Weddings & Receptions',
        slug: 'weddings',
        description: 'Complete wedding planning, grand entrance themes, guest management, and day-of coordination.',
        icon: 'Heart',
        color: '#183153',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        featured: true,
      },
      {
        name: 'Wedding Photography & Cinema',
        slug: 'photography',
        description: 'Candid photography, 4K cinematic teasers, aerial drone shoots, and custom photobooks.',
        icon: 'Camera',
        color: '#4F78A8',
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
        featured: true,
      },
      {
        name: 'Baby Showers & Cradle Ceremonies',
        slug: 'baby-showers',
        description: 'Enchanting pastel theme decor, traditional cradle decorations, photo booth styling, and games.',
        icon: 'Baby',
        color: '#4A9B91',
        image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80',
        featured: true,
      },
      {
        name: 'Birthday Parties & Celebrations',
        slug: 'birthdays',
        description: 'First birthday celebrations, milestone 30th/50th galas, LED marquee numbers, and custom backdrops.',
        icon: 'Cake',
        color: '#E056FD',
        image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
        featured: true,
      },
      {
        name: 'Stage, Floral & Mandap Decor',
        slug: 'stage-decor',
        description: 'Exotic fresh floral styling, traditional mandaps, contemporary luxury stage lighting, and walkway arches.',
        icon: 'Sparkles',
        color: '#F39C12',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
        featured: true,
      },
      {
        name: 'Pre-Wedding & Maternity Shoots',
        slug: 'portrait-shoots',
        description: 'Cinematic outdoor pre-wedding love stories, baby-bump maternity sessions, and designer styling.',
        icon: 'Sun',
        color: '#27AE60',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        featured: false,
      },
      {
        name: 'Catering & Live Food Counters',
        slug: 'catering',
        description: 'Multi-cuisine wedding banquets, live chaat & pasta stations, mocktail bars, and dessert lounges.',
        icon: 'Utensils',
        color: '#E74C3C',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
        featured: false,
      },
      {
        name: 'DJ, Sound & Entertainment',
        slug: 'entertainment',
        description: 'Celebrity DJs, live acoustic bands, sangeet choreographers, MC hosts, and intelligent club lighting.',
        icon: 'Music',
        color: '#8E44AD',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
        featured: false,
      },
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`[Seed] Created ${createdCategories.length} categories.`);

    const catMap = new Map();
    createdCategories.forEach((c) => catMap.set(c.slug, c._id));

    // 3. Create Event Agency Packages & Showcases
    const eventsData = [
      {
        title: 'Royal Destination Wedding & Complete Management',
        slug: 'royal-destination-wedding-management',
        shortDescription: 'Comprehensive end-to-end wedding execution: grand stage decor, hospitality coordination, ritual styling, and dedicated day-of event managers.',
        fullDescription: 'Our signature Royal Wedding Package takes away all the stress so you and your families can celebrate every moment. Includes complete venue transformation, custom mandap & floral stage setup, bridal entry concept, sound & lighting setup, guest logistics concierge, and on-site event managers ensuring seamless execution from Mehendi to Reception.',
        category: catMap.get('weddings'),
        organizer: admin._id,
        bannerImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        ],
        startDate: '2026-12-01',
        endDate: '2026-12-31',
        startTime: 'Full Day',
        endTime: 'Late Night',
        locationType: 'in_person',
        venue: {
          name: 'The Grand Heritage Palace & Mandap',
          address: 'Main Town Center',
          city: 'Nagercoil',
          state: 'Tamil Nadu',
          country: 'India',
        },
        status: 'published',
        isFeatured: true,
        tags: ['Wedding', 'Full Planning', 'Decor', 'Hospitality'],
        schedule: [
          { time: 'Morning', title: 'Traditional Ceremonies & Haldi Setup', speaker: 'Decor & Hospitality Team' },
          { time: 'Evening', title: 'Grand Baraat / Entry & Varmala Stage', speaker: 'Lead Event Director' },
          { time: 'Night', title: 'Gourmet Banquet & Reception Dinner', speaker: 'Catering Captain' },
        ],
        totalCapacity: 50,
        bookedSeats: 12,
      },
      {
        title: 'Candid Wedding Photography & 4K Cinematic Films',
        slug: 'candid-wedding-photography-cinematic-films',
        shortDescription: 'Capturing timeless emotional moments with 2 Candid Photographers, 2 Traditional Cinematographers, Drone Aerial coverage, and Luxury Velvet Album.',
        fullDescription: 'Our award-winning photography crew specializes in emotional storytelling, candid expressions, and magazine-quality portraits. We deliver a 3-minute 4K cinematic highlights teaser, full ceremony documentary film, 500+ hand-color-graded high-resolution photos, and an Italian lay-flat leather photobook.',
        category: catMap.get('photography'),
        organizer: organizer._id,
        bannerImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
        ],
        startDate: '2026-12-05',
        endDate: '2026-12-31',
        startTime: '08:00 AM',
        endTime: '11:00 PM',
        locationType: 'in_person',
        venue: {
          name: 'Client Selected Wedding Hall & Venue',
          address: 'On-Location Studio & Venue',
          city: 'Nagercoil & Kanyakumari',
          state: 'Tamil Nadu',
          country: 'India',
        },
        status: 'published',
        isFeatured: true,
        tags: ['Photography', 'Cinematography', 'Drone', 'Wedding Album'],
        schedule: [
          { time: 'Getting Ready', title: 'Bride & Groom Portrait Session', speaker: 'Candid Photographers' },
          { time: 'Rituals & Reception', title: 'Multi-Camera Ceremony & Aerial Drone', speaker: 'Cinematography Crew' },
        ],
        totalCapacity: 30,
        bookedSeats: 8,
      },
      {
        title: 'Dreamy Pastel Baby Shower & Cradle Ceremony Decor',
        slug: 'dreamy-pastel-baby-shower-cradle-decor',
        shortDescription: 'Transform your baby shower into a fairytale wonderland: organic pastel balloon arches, floral cradle styling, mom-to-be throne, and customized photo backdrop.',
        fullDescription: 'Celebrate the arrival of your little miracle with our bespoke Baby Shower & Cradle Ceremony styling. We create dreamy settings featuring cloud & teddy balloon installations, fresh flower cradle wraps, mom-to-be royal chair, personalized name signage, party favors table, and photo props.',
        category: catMap.get('baby-showers'),
        organizer: admin._id,
        bannerImage: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        ],
        startDate: '2026-12-10',
        endDate: '2027-01-31',
        startTime: '02:00 PM',
        endTime: '07:00 PM',
        locationType: 'in_person',
        venue: {
          name: 'Home / Banquet Hall / Garden Lawn',
          address: 'On-Site Setup in Nagercoil & Surrounds',
          city: 'Nagercoil / Tirunelveli',
          state: 'Tamil Nadu',
          country: 'India',
        },
        status: 'published',
        isFeatured: true,
        tags: ['Baby Shower', 'Cradle Ceremony', 'Pastel Decor', 'Mom-to-Be'],
        totalCapacity: 40,
        bookedSeats: 14,
      },
      {
        title: 'Milestone Birthday Extravaganza & Theme Styling',
        slug: 'milestone-birthday-extravaganza-theme-styling',
        shortDescription: 'From 1st birthday fairytale themes to grand 50th jubilee celebrations: LED marquee numbers, luxury balloon styling, DJ music, and interactive host.',
        fullDescription: 'Make birthday milestones truly unforgettable. Our team provides complete theme conceptualization (Jungle Safari, Boss Baby, Princess Castle, or Black & Gold Luxury Lounge), organic balloon garlands, dessert station setup, sound system, emcee entertainer, and cake table decoration.',
        category: catMap.get('birthdays'),
        organizer: organizer._id,
        bannerImage: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
        startDate: '2026-12-12',
        endDate: '2027-02-28',
        startTime: '04:00 PM',
        endTime: '10:00 PM',
        locationType: 'in_person',
        venue: {
          name: 'Clubhouse / Rooftop Lounge / Lawn',
          address: 'Client Location',
          city: 'Madurai & Nagercoil',
          country: 'India',
        },
        status: 'published',
        isFeatured: true,
        tags: ['Birthday', 'Theme Decor', 'Marquee Numbers', 'Entertainment'],
        totalCapacity: 60,
        bookedSeats: 19,
      },
      {
        title: 'Luxury Floral Mandap & Reception Stage Architecture',
        slug: 'luxury-floral-mandap-reception-stage',
        shortDescription: 'Exquisite fresh floral mandaps, crystal chandeliers, royal velvet seating, fairy-light tunnels, and atmospheric wash lighting.',
        fullDescription: 'Our floral architects and stage engineers turn any ballroom or outdoor lawn into a breathtaking cinematic stage. Featuring imported Dutch roses, cascading orchids, geometric acrylic pillars, ambient par cans, and dramatic stage backdrops.',
        category: catMap.get('stage-decor'),
        organizer: admin._id,
        bannerImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
        startDate: '2026-12-15',
        endDate: '2027-03-31',
        startTime: 'Setup 4 Hours Prior',
        endTime: 'Event Conclusion',
        locationType: 'in_person',
        venue: {
          name: 'Banquet Hall or Outdoor Lawn',
          address: 'Event Venue',
          city: 'Trivandrum & Kanyakumari',
          country: 'India',
        },
        status: 'published',
        isFeatured: false,
        tags: ['Mandap', 'Stage Decor', 'Floral Art', 'Lighting'],
        totalCapacity: 35,
        bookedSeats: 7,
      },
      {
        title: 'Pre-Wedding & Maternity Scenic Photoshoot',
        slug: 'pre-wedding-maternity-scenic-photoshoot',
        shortDescription: 'Romantic scenic photoshoot with professional fashion lighting, 3 costume changes, drone landscape footage, and social media reels.',
        fullDescription: 'Capture your special chapter in iconic outdoor landscapes or curated studio setups. Includes personalized mood board guidance, professional lighting assistant, 50 retouched high-resolution images, and 2 Instagram teaser reels.',
        category: catMap.get('portrait-shoots'),
        organizer: organizer._id,
        bannerImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        startDate: '2026-12-08',
        endDate: '2027-03-31',
        startTime: 'Golden Hour (06:00 AM / 04:00 PM)',
        endTime: '3-4 Hours Session',
        locationType: 'in_person',
        venue: {
          name: 'Scenic Beach / Botanic Gardens / Heritage Fort',
          address: 'Outdoor Location',
          city: 'Kanyakumari Coast & Nagercoil',
          country: 'India',
        },
        status: 'published',
        isFeatured: false,
        tags: ['Pre-Wedding', 'Maternity', 'Golden Hour', 'Portraits'],
        totalCapacity: 45,
        bookedSeats: 11,
      },
    ];

    const createdEvents = await Event.insertMany(eventsData);
    console.log(`[Seed] Created ${createdEvents.length} event services/packages.`);

    // Update category event count
    for (const evt of createdEvents) {
      await Category.findByIdAndUpdate(evt.category, { $inc: { eventCount: 1 } });
    }

    // 4. Create Service Package Tiers
    const ticketsData: any[] = [];
    createdEvents.forEach((evt) => {
      if (evt.slug.includes('wedding-management')) {
        ticketsData.push(
          {
            event: evt._id,
            name: 'Classic Wedding Management',
            type: 'paid',
            price: 125000,
            quantity: 20,
            availableQuantity: 15,
            maxPerOrder: 1,
            description: 'Stage decor, ritual coordination, sound setup, and day-of event coordinator.',
            perks: ['Floral Stage Decor', 'Sound & Mic System', 'Vendor Coordination', 'Day-of Planner'],
          },
          {
            event: evt._id,
            name: 'Royal Destination Package',
            type: 'paid',
            price: 275000,
            quantity: 15,
            availableQuantity: 10,
            maxPerOrder: 1,
            description: 'Complete 2-day wedding planning, luxury floral mandap, grand bride/groom entries, and full guest hospitality team.',
            perks: [
              'Custom Mandap Architecture',
              'Grand Bridal Entry Concepts',
              'Guest Concierge & Room Hampers',
              'Lead Director + 4 Floor Coordinators',
              'Sangeet DJ & Light Show',
            ],
          }
        );
      } else if (evt.slug.includes('photography')) {
        ticketsData.push(
          {
            event: evt._id,
            name: 'Essential Photography',
            type: 'paid',
            price: 45000,
            quantity: 20,
            availableQuantity: 16,
            maxPerOrder: 1,
            description: '1 Candid Photographer + 1 Traditional Photographer for full ceremony.',
            perks: ['300 Edited Photos', 'All Raw Images in Drive', 'Digital Gallery Link'],
          },
          {
            event: evt._id,
            name: 'Cinematic Premium Film + Drone',
            type: 'paid',
            price: 95000,
            quantity: 15,
            availableQuantity: 11,
            maxPerOrder: 1,
            description: '2 Candid + 2 Traditional + 1 Drone pilot, 3-minute teaser & full wedding movie with 40-page leather album.',
            perks: [
              'Aerial 4K Drone Footage',
              'Cinematic Highlights Video',
              'Italian Leather Photobook',
              'Pre-Wedding Teaser Included',
            ],
          }
        );
      } else if (evt.slug.includes('baby-shower')) {
        ticketsData.push(
          {
            event: evt._id,
            name: 'Delight Baby Shower Package',
            type: 'paid',
            price: 28000,
            quantity: 25,
            availableQuantity: 20,
            maxPerOrder: 1,
            description: 'Balloon ring backdrop, mom-to-be sash, cake table styling, and photography coverage.',
            perks: ['Balloon Arch & Props', 'Mom-to-Be Special Chair', '2 Hours Photography Coverage'],
          },
          {
            event: evt._id,
            name: 'Grand Cradle & Fairy Shower Package',
            type: 'paid',
            price: 55000,
            quantity: 15,
            availableQuantity: 12,
            maxPerOrder: 1,
            description: 'Fresh flower cradle wrap, organic pastel balloon styling, personalized welcome board, baby welcome setup, and album.',
            perks: [
              'Fresh Flower Cradle Decoration',
              'Personalized Acrylic Signage',
              'Complete Photography & Video Reel',
              'Guest Favors Display Setup',
            ],
          }
        );
      } else {
        ticketsData.push(
          {
            event: evt._id,
            name: 'Standard Package',
            type: 'paid',
            price: 22000,
            quantity: 30,
            availableQuantity: 24,
            maxPerOrder: 1,
            description: 'Theme setup, backdrop decoration, and basic sound/lighting.',
            perks: ['Theme Backdrop', 'Balloon Garland', 'Sound System Setup'],
          },
          {
            event: evt._id,
            name: 'Celebration VIP Package',
            type: 'paid',
            price: 48000,
            quantity: 20,
            availableQuantity: 16,
            maxPerOrder: 1,
            description: 'Complete celebration production with live entertainer, DJ, marquee lights, and event photography.',
            perks: [
              'LED Marquee Lettering',
              'Professional DJ & Host',
              'Event Photography & Video Reel',
              'Cake Table Gourmet Display',
            ],
          }
        );
      }
    });

    await Ticket.insertMany(ticketsData);
    console.log(`[Seed] Created ${ticketsData.length} package tiers.`);

    // 5. Create Testimonials from Real Clients (Weddings, Baby Showers, Birthdays)
    const testimonialsData = [
      {
        name: 'Priya & Rahul Sharma',
        role: 'Wedding Couple',
        company: 'Destination Wedding at Grand Palace',
        avatar: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        content: 'Alexander and his team managed our 3-day wedding flawlessly! The floral mandap was breathtaking and the candid photography crew captured moments that bring tears to our eyes every time we watch our wedding teaser.',
        isApproved: true,
      },
      {
        name: 'Ananya & Karthik',
        role: 'Parents',
        company: 'Baby Shower & Cradle Ceremony',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        content: 'The pastel baby shower setup was like a dream! Every guest was taking photos at the cradle and photo booth. They took care of everything from decor to photography so we could just enjoy our day.',
        isApproved: true,
      },
      {
        name: 'David & Sarah Jenkins',
        role: 'Parents',
        company: '1st Birthday Jungle Theme Party',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        content: 'From the LED number marquee to the kids entertainer and balloon styling, they turned our clubhouse into a magical jungle adventure. Super professional team!',
        isApproved: true,
      },
    ];

    await Testimonial.insertMany(testimonialsData);
    console.log('[Seed] Created default client testimonials.');

    // 6. Create Website Settings
    await WebsiteSettings.create({
      companyName: 'Utsav Events & Photography Studio',
      siteTitle: 'Utsav Events | Weddings, Mandap Decors, Photography & Celebrations',
      tagline: 'Premier Event Management & Wedding Decors — Blending Trendy & Traditional Elegance Since 2004.',
      contactEmail: 'info@utsavevents.in',
      contactPhone: '+91 93441 68280 / +91 98945 95787',
      address: 'Kattadimoodu Junction, Nagercoil Road, Eraniel, Kanyakumari District, Tamil Nadu – 629802',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com',
      },
      currency: 'INR',
      enablePublicRegistration: true,
    });
    console.log('[Seed] Initialized website settings for Utsav Events.');

    console.log('\n===============================================');
    console.log('  Event Agency Database Seeding Successful!   ');
    console.log('===============================================');
    console.log('Default Accounts:');
    console.log('  Super Admin : superadmin@eventpro.com | password123');
    console.log('  Admin       : admin@eventpro.com      | password123');
    console.log('  Organizer   : organizer@eventpro.com  | password123');
    console.log('  Attendee    : attendee@eventpro.com   | password123');
    console.log('===============================================\n');

    process.exit(0);
  } catch (error: any) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seed();
