import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Camera,
  Baby,
  Cake,
  MapPin,
  Calendar,
  ArrowRight,
  X,
  Maximize2,
  CheckCircle2,
  Filter,
  Search,
  Star,
  Layers,
  ChevronLeft,
  ChevronRight,
  Clock,
  Palette,
  Users,
  Quote,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '../../components/common/Button';

interface GalleryPhoto {
  url: string;
  caption: string;
}

interface TimelineItem {
  time: string;
  activity: string;
}

interface PastWork {
  id: string;
  title: string;
  category: 'wedding' | 'photography' | 'baby_shower' | 'birthday' | 'mandap_decor' | 'pre_wedding';
  categoryLabel: string;
  client: string;
  date: string;
  venue: string;
  city: string;
  thumbnail: string;
  gallery: GalleryPhoto[];
  description: string;
  duration: string;
  guestCount?: number;
  highlight: string;
  palette: { name: string; hex: string }[];
  timeline: TimelineItem[];
  servicesDelivered: string[];
  testimonial: {
    quote: string;
    author: string;
    rating: number;
  };
}

const PAST_WORKS: PastWork[] = [
  {
    id: 'work-1',
    title: 'Grand Royal Palace Wedding & 1000-Rose Floral Mandap',
    category: 'wedding',
    categoryLabel: 'Weddings & Receptions',
    client: 'Priya & Rahul Sharma',
    date: 'February 2026',
    venue: 'The Leela Palace Ballroom & Courtyard',
    city: 'Bengaluru',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
        caption: 'Circular 1,000-Fresh-Rose Mandap Architecture with Cascading White Orchids & Floating Urli Diya',
      },
      {
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85',
        caption: 'Golden-Hour Courtyard Couple Portraits with Royal Silk Dupattas & Royal Regalia',
      },
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85',
        caption: 'Courtyard Banquet Styling with Crystal Chandeliers, Mirrored Tables & Scented Tuberose',
      },
      {
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=85',
        caption: 'Sacred Varmala Garland Exchange on the Elevated Glass Stage with Cold Spark Pyro',
      },
      {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
        caption: 'Musical Bollywood Sangeet Night with Dynamic Intelligent Beam Lighting & Live Celebrity DJ',
      },
    ],
    duration: '3-Day Heritage Celebration',
    guestCount: 550,
    highlight: 'Cascading 1,000-rose circular mandap with royal cold-pyro bridal entry',
    palette: [
      { name: 'Royal Crimson', hex: '#8B1E2D' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Ivory Cream', hex: '#FDFBF7' },
      { name: 'Emerald Velvet', hex: '#1C3A27' },
    ],
    description:
      'A 3-day royal heritage celebration with 550+ guests. Our team managed full event logistics across Haldi, Sangeet, and the Vedic Wedding Ceremony. We engineered a circular 1,000-fresh-rose mandap over a water feature, orchestrated royal bride/groom entries with cold pyro, and delivered a same-day 4K cinematic film teaser shown at the reception dinner.',
    timeline: [
      { time: 'Day 1 (10:00 AM)', activity: 'Vibrant Marigold Haldi & Floral Splash Poolside Setup' },
      { time: 'Day 1 (07:00 PM)', activity: 'Grand Bollywood Sangeet Night with Pyro Climax' },
      { time: 'Day 2 (04:30 PM)', activity: 'Sunset Vedic Pheras at the Palace Courtyard Mandap' },
      { time: 'Day 2 (08:00 PM)', activity: 'Formal Black-Tie Banquet Dinner & 4K Teaser Premiere' },
    ],
    servicesDelivered: [
      'Full 3-Day Wedding Planning & Day Coordination',
      'Fresh Rose & Orchid Circular Mandap Architecture',
      '2 Candid Photographers & 1 Traditional Team',
      'Aerial 4K Drone Cinematography & Same-Day Edit',
      'Royal Bride & Groom Grand Entrance with Cold Pyro',
      'Sangeet Audio, Acoustic Line-Array & DJ Setup',
    ],
    testimonial: {
      quote:
        'Utsav Events made our dream palace wedding effortless. From the breathtaking 1,000-rose mandap to our candid photos that made our families weep with joy, their coordination was flawless.',
      author: 'Priya & Rahul Sharma (Bride & Groom)',
      rating: 5,
    },
  },
  {
    id: 'work-2',
    title: 'Candid Golden-Hour Bridal Shoot & 4K Teaser Film',
    category: 'photography',
    categoryLabel: 'Wedding Photography & Films',
    client: 'Alisha & David Fernandez',
    date: 'January 2026',
    venue: 'Taj West End Heritage Gardens',
    city: 'Bengaluru',
    thumbnail: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=85',
        caption: 'Natural Golden Hour Candid Bridal Portrait among 150-Year-Old Banyan Trees',
      },
      {
        url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1400&q=85',
        caption: 'Emotional First Look: Raw Tearful Smiles Between the Bride & Groom',
      },
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85',
        caption: 'Aerial Drone Perspective of the Heritage Garden Pathway & Veil Flow',
      },
      {
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1400&q=85',
        caption: 'Macro Jewelry & Diamond Band Details with Floral Heirlooms',
      },
      {
        url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=85',
        caption: 'Romantic Twilight Silhouette Shot at the Victorian Gazebo',
      },
    ],
    duration: 'Full-Day Visual Production',
    highlight: 'Unscripted emotional portraits & 3-minute 4K cinematic film teaser',
    palette: [
      { name: 'Warm Amber', hex: '#E29547' },
      { name: 'Sage Leaf', hex: '#879F84' },
      { name: 'Vintage Rose', hex: '#C28490' },
      { name: 'Soft Linen', hex: '#FAF5EE' },
    ],
    description:
      'An intimate golden hour shoot focusing on authentic, unposed chemistry. Our candid photo directors guided gentle natural interactions rather than stiff posing. Includes drone wave reveal shots, a custom 3-minute cinematic 4K highlight teaser, and 450 hand-retouched high-resolution images delivered in a handcrafted Italian velvet album.',
    timeline: [
      { time: '02:00 PM', activity: 'Bridal Suite Details, Veil Styling & Getting-Ready Candids' },
      { time: '04:15 PM', activity: 'Garden First Look & Private Vow Exchange' },
      { time: '05:30 PM', activity: 'Golden Hour Couple Session with Drone Aerials' },
      { time: '07:00 PM', activity: 'Twilight Lantern Portraits & Family Mini-Sessions' },
    ],
    servicesDelivered: [
      '2 Candid Specialist Photographers',
      '1 4K Drone Pilot & Lead Cinematographer',
      'Handcrafted Italian Velvet Hardcover Album (50 Pages)',
      '3-Minute 4K Cinematic Highlight Reel with Licensed Soundtrack',
      'Private Cloud Gallery with One-Click Family Sharing',
    ],
    testimonial: {
      quote:
        'Marcus and the photo team were invisible yet everywhere! They captured moments we did not even realize happened. The 4K teaser brought our entire family to tears.',
      author: 'Alisha & David Fernandez',
      rating: 5,
    },
  },
  {
    id: 'work-3',
    title: 'Dreamy Pastel Blossom Baby Shower & Custom Cradle Styling',
    category: 'baby_shower',
    categoryLabel: 'Baby Showers & Cradle Ceremonies',
    client: 'Ananya & Karthik Sundaram',
    date: 'March 2026',
    venue: 'Grand Hyatt Waterfront Lawn',
    city: 'Mumbai',
    thumbnail: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=1400&q=85',
        caption: 'Antique Wooden Ring Cradle Wrapped in Baby Breath & Blush Carnations',
      },
      {
        url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85',
        caption: '10-Foot Organic Pastel Balloon Cloud Arch & Customized Welcome Backdrop',
      },
      {
        url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=85',
        caption: 'Pastel Dessert Table with Macaron Towers, Cake Pops & Personalized Goodies',
      },
      {
        url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=85',
        caption: 'Mom-to-Be Luxury Floral Throne & Traditional Family Blessings',
      },
      {
        url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1400&q=85',
        caption: 'Interactive Baby Shower Fun: Guess-the-Baby Trivia & Advice Cards Station',
      },
    ],
    duration: 'Full Afternoon Celebration (120 Guests)',
    guestCount: 120,
    highlight: 'Fresh baby breath cradle wrap & cloud balloon photo booth',
    palette: [
      { name: 'Blush Pink', hex: '#F4C2C2' },
      { name: 'Soft Mint', hex: '#A8E6CF' },
      { name: 'Warm Cream', hex: '#FFFDD0' },
      { name: 'Muted Gold', hex: '#D4AF37' },
    ],
    description:
      'A welcoming ceremony styled with blush pink, soft mint, and gold accents. Featuring a 10-foot organic balloon arch, antique carved baby cradle draped in fresh baby breath and carnations, mom-to-be throne setup, personalized signage, and interactive trivia games.',
    timeline: [
      { time: '11:30 AM', activity: 'Guest Welcome with Welcome Drinks & Custom Name Badges' },
      { time: '12:15 PM', activity: 'Traditional Blessing Ceremony & Cradle Rocking Ritual' },
      { time: '01:30 PM', activity: 'Gourmet Grazing Lunch & Live Dessert Table' },
      { time: '02:45 PM', activity: 'Fun Baby Trivia Games, Cake Cutting & Candid Portraits' },
    ],
    servicesDelivered: [
      'Custom Ring Cradle Decor with 100% Fresh Blooms',
      'Organic Pastel Balloon Cloud Arch & Photobooth',
      'Mom-to-Be Throne & Floral Backdrop Installation',
      'Baby Shower Games & Professional Host Emcee',
      'Candid Event Photography & Social Media Reel Cut',
    ],
    testimonial: {
      quote:
        'The pastel cradle decor was beyond what I had pinned on Pinterest! Eleanor and her styling team made me feel like an absolute queen on my special day.',
      author: 'Ananya Sundaram (Mom-to-Be)',
      rating: 5,
    },
  },
  {
    id: 'work-4',
    title: 'Fairytale 1st Birthday & Jungle Safari Adventure',
    category: 'birthday',
    categoryLabel: 'Birthday Themes & Styling',
    client: 'Baby Liam (Parents: Vikram & Neha)',
    date: 'February 2026',
    venue: 'Royal Orchid Pavilion Banquets',
    city: 'Bengaluru',
    thumbnail: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1400&q=85',
        caption: '4-Foot Illuminated LED Marquee Number "1" with Jungle Safari Balloon Arch',
      },
      {
        url: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=1400&q=85',
        caption: 'Custom 3-Tier Safari Animals Buttercream Cake & Personalized Dessert Table',
      },
      {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
        caption: 'Live Magician Show & Animal Balloon Sculpting for Toddler Guests',
      },
      {
        url: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1400&q=85',
        caption: 'Jungle Vines Candy Table, Safari Juice Bar & Grazing Station',
      },
      {
        url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=85',
        caption: 'Cake Smash Milestone Moments with Custom Safari Explorer Costumes',
      },
    ],
    duration: '4-Hour Birthday Extravaganza',
    guestCount: 150,
    highlight: '4-ft illuminated marquee "1" & interactive children entertainment',
    palette: [
      { name: 'Safari Olive', hex: '#556B2F' },
      { name: 'Terracotta', hex: '#E2725B' },
      { name: 'Mustard Gold', hex: '#FFDB58' },
      { name: 'Warm Sand', hex: '#F4A460' },
    ],
    description:
      'Liam’s first milestone birthday transformed into a whimsical jungle safari. Included 3D animal cutouts, 4-foot LED marquee number "1", balloon garland tunnels, customized dessert table styling, magician show, and custom take-home gift hampers.',
    timeline: [
      { time: '04:00 PM', activity: 'Kids Welcome, Tattoo Artist & Jungle Headband Handout' },
      { time: '05:00 PM', activity: 'Interactive Magic Show & Puppet Performance' },
      { time: '06:00 PM', activity: 'Cake Smash & Grand Cake Cutting Ceremony' },
      { time: '06:45 PM', activity: 'Kids Dinner Buffet & Personalized Hamper Distribution' },
    ],
    servicesDelivered: [
      'Jungle Safari Theme Backdrop & 3D Animal Cutouts',
      '4-Foot Illuminated LED Marquee Number 1',
      'Organic Safari Balloon Garland & Entrance Tunnel',
      'Children Entertainment (Magician & Balloon Artist)',
      'Cake Table Styling & Dessert Bar Decor',
    ],
    testimonial: {
      quote:
        'All the parents were stunned by the setup! Liam loved the life-sized animals and the cake smash photos are our treasure forever. Thank you Utsav Events!',
      author: 'Neha & Vikram (Liam’s Parents)',
      rating: 5,
    },
  },
  {
    id: 'work-5',
    title: 'Traditional Seemantham & Jasmine Blossom Heritage Setup',
    category: 'baby_shower',
    categoryLabel: 'Baby Showers & Cradle Ceremonies',
    client: 'Samyuktha & Arvind Narayan',
    date: 'December 2025',
    venue: 'ITC Grand Chola Banquet Hall',
    city: 'Chennai',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=85',
        caption: 'Madurai Jasmine (Malli) Floral Curtain Cascade with Antique Brass Urlis',
      },
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
        caption: 'Traditional Floral Jhula (Swing) Draped in Marigold & Tube Rose Garlands',
      },
      {
        url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=85',
        caption: 'Bangle Ceremony: Traditional Glass Bangles Blessing for the Mother-to-Be',
      },
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85',
        caption: 'Traditional 24-Item Festive Feast Banana Leaf Dining Coordination',
      },
    ],
    duration: 'Traditional Half-Day Ceremony',
    guestCount: 180,
    highlight: 'Fresh jasmine swing installation & heritage brass lamp accents',
    palette: [
      { name: 'Jasmine White', hex: '#F8F9FA' },
      { name: 'Marigold Yellow', hex: '#FFC107' },
      { name: 'Temple Red', hex: '#9E2A2B' },
      { name: 'Antique Brass', hex: '#B5A642' },
    ],
    description:
      'A South Indian heritage Seemantham ceremony honoring ancient traditions. Adorned with 300+ meters of fresh Madurai Malli (jasmine), antique brass urns, traditional banana tree pillars, and a custom floral jhula (swing) for the mother-to-be.',
    timeline: [
      { time: '08:30 AM', activity: 'Traditional Nadaswaram Welcome & Kolam Entrance Art' },
      { time: '09:30 AM', activity: 'Vedic Rituals, Homa Coordination & Bangle Blessing' },
      { time: '11:30 AM', activity: 'Floral Jhula (Swing) Songs & Family Portraits' },
      { time: '12:30 PM', activity: 'Traditional Banana Leaf Feast (24 Authentic Dishes)' },
    ],
    servicesDelivered: [
      'Madurai Jasmine Garland Backdrop & Brass Urlis',
      'Custom Fresh Floral Swing (Jhula) Decor',
      'Traditional Ritual Coordination & Priest Assistance',
      'Traditional & Candid Portrait Photography',
      'Banana Leaf Dining Coordination',
    ],
    testimonial: {
      quote:
        'Our elders were full of praise. The pure fragrance of fresh Madurai jasmine and the respectful coordination made our Seemantham memorable.',
      author: 'Samyuktha & Arvind Narayan',
      rating: 5,
    },
  },
  {
    id: 'work-6',
    title: 'Sunset Coastal Pre-Wedding Shoot & Cinema Story',
    category: 'pre_wedding',
    categoryLabel: 'Pre-Wedding & Maternity',
    client: 'Maya & Ethan Brooks',
    date: 'January 2026',
    venue: 'Ashvem Beach & Cliffside Villa',
    city: 'Goa',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85',
        caption: 'Sunset Clifftop Drone Perspective Overlooking the Arabian Sea',
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
        caption: 'Candid Waves Walk in Flowing Scarlet Gown at Golden Hour',
      },
      {
        url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85',
        caption: 'Heritage Fontainhas Portuguese Quarter with Vintage Scooter & Bougainvillea',
      },
      {
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1400&q=85',
        caption: 'Private Candlelit Bohemian Teepee Tent Dinner on Private Sand Dunes',
      },
    ],
    duration: '2-Day Coastal Visual Story',
    highlight: 'Golden hour coastal drone footage & Save-the-Date video invite',
    palette: [
      { name: 'Sunset Coral', hex: '#FF6F61' },
      { name: 'Ocean Aqua', hex: '#007791' },
      { name: 'Warm Amber', hex: '#FFBF00' },
      { name: 'Sea Salt', hex: '#F0F8FF' },
    ],
    description:
      'A 2-day pre-wedding visual story captured across Goa’s coastline, historic Portuguese quarters, and secluded clifftops. Delivered in romantic film tones with drone wave reveals and sunset boat sessions.',
    timeline: [
      { time: 'Day 1 (03:00 PM)', activity: 'Heritage Portuguese Quarter Stroll & Vintage Props' },
      { time: 'Day 1 (05:30 PM)', activity: 'Sunset Coastal Clifftop Drone Shoot' },
      { time: 'Day 2 (06:00 AM)', activity: 'Sunrise Secluded Beach Walk & Water Reflections' },
      { time: 'Day 2 (05:00 PM)', activity: 'Bohemian Teepee Sunset Candlelight Session' },
    ],
    servicesDelivered: [
      '2-Day Destination Photography & 4K Filming',
      'Coastal Aerial Drone Sequences',
      '3 Outfit Changes & Stylist Coordination',
      'Custom Pre-Wedding Save-the-Date Video Card',
      '50 Retouched High-Definition Prints',
    ],
    testimonial: {
      quote:
        'The drone footage at the cliffs blew our minds! We played the Save-the-Date video at our engagement party and everyone thought it was a Netflix trailer.',
      author: 'Maya & Ethan Brooks',
      rating: 5,
    },
  },
  {
    id: 'work-7',
    title: 'Enchanted Crystal & Wisteria Stage Architecture',
    category: 'mandap_decor',
    categoryLabel: 'Stage & Mandap Decor',
    client: 'Vikas & Sneha Patel',
    date: 'November 2025',
    venue: 'JW Marriott Grand Ballroom',
    city: 'Pune',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85',
        caption: '40-Foot Wisteria Arch with Hanging Crystal Chandeliers & Mirrored Runway',
      },
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
        caption: 'Reflective Glass Runway with Floating Candle Urns & Orchid Accents',
      },
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85',
        caption: 'Intelligent Beam Moving-Head Stage Lighting Sync during Grand Couple Entry',
      },
      {
        url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=85',
        caption: 'VIP Velvet Chesterfield Sofas with Crystal Centerpieces & Candle Pillars',
      },
    ],
    duration: 'Single-Day Grand Gala (600 Guests)',
    guestCount: 600,
    highlight: '40-ft crystal wisteria stage canopy with mirrored walkway',
    palette: [
      { name: 'Lavender Wisteria', hex: '#C9A0DC' },
      { name: 'Crystal Clear', hex: '#E0F7FA' },
      { name: 'Midnight Navy', hex: '#183153' },
      { name: 'Silver Sheen', hex: '#C0C0C0' },
    ],
    description:
      'A luxurious reception stage architecture featuring hanging crystal chandeliers, 2,000 strings of purple wisteria, mirrored walkway ramp, and intelligent moving-head ambient lighting tailored to the couple’s entrance.',
    timeline: [
      { time: '06:00 PM', activity: 'Ballroom Doors Open: Candlelight & Harpist Welcome' },
      { time: '07:30 PM', activity: 'Bride & Groom Grand Entrance with Low Fog & Spotlight' },
      { time: '08:15 PM', activity: 'Champagne Toast, Stage Photos & Family Blessings' },
      { time: '09:30 PM', activity: 'Gourmet Multi-Cuisine Dinner & Live Symphony' },
    ],
    servicesDelivered: [
      'Custom 40-Foot Crystal & Wisteria Floral Arch',
      'Mirrored Runway & Candlelit Walkway',
      'Intelligent Beam & Gobo Projection Lighting',
      'VIP Couch Styling & Floral Console Accents',
      'Sound & DJ Stage Integration',
    ],
    testimonial: {
      quote:
        'Walking onto that mirrored stage under thousands of crystals felt like walking on stars. Our guests could not stop taking pictures all night.',
      author: 'Sneha & Vikas Patel',
      rating: 5,
    },
  },
  {
    id: 'work-8',
    title: 'Rose Gold & Velvet 18th Milestone Birthday Gala',
    category: 'birthday',
    categoryLabel: 'Birthday Themes & Styling',
    client: 'Zara Kapoor (Parents: Sanjay & Reema)',
    date: 'January 2026',
    venue: 'Radisson Blu Luxury Suites',
    city: 'New Delhi',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85',
        caption: 'Custom Neon Sign ("Zara Turns 18") with Emerald Velvet & Chrome Balloons Wall',
      },
      {
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=85',
        caption: '360-Degree Rotating Video Selfie Booth with Slow-Mo FX & Instant AirDrop',
      },
      {
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=85',
        caption: 'Club Lighting System, Bass Audio & Low-Fog Smoke Dancefloor',
      },
      {
        url: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1400&q=85',
        caption: 'Artisan Mocktail Bar & Towering Macaron Pyramid Grazing Table',
      },
    ],
    duration: 'Evening Teen Gala (110 Guests)',
    guestCount: 110,
    highlight: 'Custom neon photo backdrop & 360-degree slow-mo video booth',
    palette: [
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Emerald Green', hex: '#50C878' },
      { name: 'Onyx Black', hex: '#1B1B1B' },
      { name: 'Champagne', hex: '#F7E7CE' },
    ],
    description:
      'A chic 18th debutante celebration styled in deep emerald velvet, rose gold chrome balloons, custom neon name signage, mocktail bar setup, and a 360-degree rotating selfie video booth for teenage guests.',
    timeline: [
      { time: '07:00 PM', activity: 'Red Carpet Arrival, 360 Video Booth & Mocktail Welcome' },
      { time: '08:15 PM', activity: 'Zara’s Grand Reveal, Champagne Flute Toast & Cake Cut' },
      { time: '09:00 PM', activity: 'DJ Dancefloor Opening with CO2 Fog Cannon FX' },
      { time: '10:30 PM', activity: 'Midnight Slider Bar & Personalized Favor Boxes' },
    ],
    servicesDelivered: [
      'Custom Neon Signage ("Zara Turns 18")',
      'Rose Gold & Emerald Velvet Photo Wall',
      '360-Degree Video Selfie Booth with Slow-Mo FX',
      'Club DJ, Sound System & Fog Machine',
      'Live Mocktail Bar & Grazing Table Styling',
    ],
    testimonial: {
      quote:
        'The best 18th birthday party in Delhi! The 360 video booth had a line all night and the neon velvet wall was everywhere on Instagram.',
      author: 'Zara Kapoor',
      rating: 5,
    },
  },
  {
    id: 'work-9',
    title: 'Maternity Glow Botanical Garden Shoot',
    category: 'pre_wedding',
    categoryLabel: 'Pre-Wedding & Maternity',
    client: 'Dr. Radhika & Vikram Menon',
    date: 'December 2025',
    venue: 'Lalbagh Botanical Sanctuary',
    city: 'Bengaluru',
    thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=85',
        caption: 'Soft Natural Sunrise Illumination Among Ancient Botanical Tree Canopies',
      },
      {
        url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1400&q=85',
        caption: 'Gentle Baby Bump Embrace in Flowing Sky Blue Chiffon Gown',
      },
      {
        url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=85',
        caption: 'Unscripted Couple Laughter & Natural Posing Guidance',
      },
      {
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1400&q=85',
        caption: 'Macro Detail Flatlay: First Sonogram Ultrasound & Handcrafted Baby Booties',
      },
    ],
    duration: '3-Hour Relaxed Morning Session',
    highlight: 'Soft sunrise natural lighting & relaxed maternity guidance',
    palette: [
      { name: 'Sky Chiffon', hex: '#87CEEB' },
      { name: 'Botanical Green', hex: '#2E8B57' },
      { name: 'Morning Mist', hex: '#E6E6FA' },
      { name: 'Warm Peach', hex: '#FFDAB9' },
    ],
    description:
      'A serene sunrise maternity session honoring the upcoming arrival. Styled in flowing pastel chiffon gowns with natural morning dew lighting, captured by our female-led portrait team with gentle posing guidance.',
    timeline: [
      { time: '06:15 AM', activity: 'Sunrise Arrival at the Lake Gazebo with Floral Crown' },
      { time: '07:00 AM', activity: 'Soft Backlit Gown Flow Portraits on the Lawn' },
      { time: '08:00 AM', activity: 'Rest Break with Refreshing Herbal Tea in On-Site Tent' },
      { time: '08:30 AM', activity: 'Couple Intimate Portraits & Sonogram Flatlays' },
    ],
    servicesDelivered: [
      'Female Lead Portrait Photographer',
      '3 Outfit Concepts with Floral Props',
      'Comfortable Pacing & On-Location Rest Tents',
      'Magazine-Quality Skin & Tone Retouching',
      'Keepsake Acrylic Maternity Frame Box',
    ],
    testimonial: {
      quote:
        'Being 8 months pregnant, I was worried about getting exhausted. The team was so gentle, patient, and made me feel so beautiful.',
      author: 'Dr. Radhika Menon',
      rating: 5,
    },
  },
  {
    id: 'work-10',
    title: 'Cinematic Sangeet Extravaganza with Pyro FX',
    category: 'wedding',
    categoryLabel: 'Weddings & Receptions',
    client: 'Kavya & Siddharth Rao',
    date: 'November 2025',
    venue: 'Sheraton Grand Ballroom',
    city: 'Hyderabad',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
        caption: 'Cold-Spark Pyro Synchronization During Couple Bollywood Dance Climax',
      },
      {
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=85',
        caption: '30-Foot High-Res Curved LED Visual Stage with Synchronized Graphics',
      },
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85',
        caption: 'High-Energy Choreographed Family & Friends Performance Face-Off',
      },
      {
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=85',
        caption: 'First Dance on Clouds: Heavy Dry-Ice Low Fog Floor Effect',
      },
    ],
    duration: 'High-Octane Evening Celebration (380 Guests)',
    guestCount: 380,
    highlight: 'Cold-spark pyro sync during couple dance & dynamic LED backdrop',
    palette: [
      { name: 'Electric Royal Blue', hex: '#4169E1' },
      { name: 'Magenta Glow', hex: '#FF00FF' },
      { name: 'Golden Spark', hex: '#FFD700' },
      { name: 'Deep Indigo', hex: '#4B0082' },
    ],
    description:
      'A high-energy Bollywood Sangeet night with 380 family and friends. Our team managed stage choreography, cold-spark pyrotechnics during dance climaxes, customized LED visual backdrops, and live DJ audio control.',
    timeline: [
      { time: '07:30 PM', activity: 'Pre-Function Cocktail Welcome with Live Dhol Beats' },
      { time: '08:30 PM', activity: 'Family Dance Face-Off with LED Stage Visuals' },
      { time: '09:45 PM', activity: 'Couple Grand Entry & Dance with Pyro Climax' },
      { time: '10:30 PM', activity: 'Open Dancefloor with Celebrity DJ & After-Party' },
    ],
    servicesDelivered: [
      'Full Stage & LED Backdrop Production',
      'Cold Spark Pyro & Dry-Ice Cloud FX',
      'Multi-Camera Live Feed & Fast Re-Cut',
      'Family Dance Choreography Alignment',
      'Celebrity DJ & Acoustic Line Array Audio',
    ],
    testimonial: {
      quote:
        'The energy in the ballroom was explosive! The cold sparks going off right on the beat drop was the highlight of our entire wedding week.',
      author: 'Kavya & Siddharth Rao',
      rating: 5,
    },
  },
  {
    id: 'work-11',
    title: 'Teddy Bear & Clouds Pastel Naming Ceremony',
    category: 'baby_shower',
    categoryLabel: 'Baby Showers & Cradle Ceremonies',
    client: 'Little Noah (Parents: Daniel & Sophie)',
    date: 'February 2026',
    venue: 'Palm Meadows Club Resort',
    city: 'Bengaluru',
    thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=85',
        caption: 'Life-Sized Plush Teddy Bears Sitting Amid Fluffy Cloud Balloon Ceilings',
      },
      {
        url: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=1400&q=85',
        caption: 'Embossed Golden Cradle with Silk Ribbons & Fresh White Baby Breath',
      },
      {
        url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1400&q=85',
        caption: 'Personalized "Welcome Little Noah" Calligraphy Board & Balloon Garland',
      },
      {
        url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=85',
        caption: 'Candid Three-Generation Family Blessings & Keepsake Portraits',
      },
    ],
    duration: 'Intimate Family Morning (90 Guests)',
    guestCount: 90,
    highlight: 'Life-sized plush teddy bears & fluffy cloud balloon ceilings',
    palette: [
      { name: 'Powder Blue', hex: '#B0E0E6' },
      { name: 'Teddy Brown', hex: '#8B5A2B' },
      { name: 'Cloud White', hex: '#FDFDFD' },
      { name: 'Warm Cream', hex: '#F5F5DC' },
    ],
    description:
      'A whimsical baby naming ceremony designed with life-sized plush teddy bears, baby blue balloon clouds, customized golden cradle, personalized welcome chalkboard, and mini dessert tables.',
    timeline: [
      { time: '10:30 AM', activity: 'Guest Welcome with Signature Cotton Candy Station' },
      { time: '11:15 AM', activity: 'Official Name Announcement & Cradle Blessing Ritual' },
      { time: '12:00 PM', activity: 'Family Portrait Sessions with the Teddy Bear Stage' },
      { time: '01:00 PM', activity: 'Artisan Brunch Buffet & Customized Keepsake Gifts' },
    ],
    servicesDelivered: [
      'Custom Pastel Cloud Balloon Installation',
      'Life-Sized Plush Teddy Bear Stage Accents',
      'Personalized Baby Name Board with Calligraphy',
      'Candid Family & Baby Photography',
      'Custom Favor Boxes for Guests',
    ],
    testimonial: {
      quote:
        'The teddy bear setup was adorable! Everyone commented on how whimsical and tasteful everything looked. The team took care of all the little details.',
      author: 'Sophie & Daniel',
      rating: 5,
    },
  },
  {
    id: 'work-12',
    title: 'Heritage Fort Marigold Mandap & Royal Procession',
    category: 'mandap_decor',
    categoryLabel: 'Stage & Mandap Decor',
    client: 'Simran & Jaspreet Dhillon',
    date: 'December 2025',
    venue: 'Neemrana Heritage Fort Palace',
    city: 'Rajasthan',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=85',
        caption: '5,000-Fresh-Marigold Canopy Mandap with Handcrafted Brass Bells',
      },
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
        caption: 'Sunset Phera Ceremony with Ancient Rajasthani Sandstone Backdrop',
      },
      {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
        caption: 'Traditional Dholak & Folk Dancers Welcoming the Royal Groom Procession',
      },
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85',
        caption: 'Lantern-Lit Fort Courtyard Royal Banquet with Authentic Mughlai Feast',
      },
    ],
    duration: '2-Day Royal Fort Wedding (300 Guests)',
    guestCount: 300,
    highlight: 'Sunset fort pheras with 5,000 marigold garlands & brass lamps',
    palette: [
      { name: 'Saffron Marigold', hex: '#FF9933' },
      { name: 'Sun Yellow', hex: '#FFD700' },
      { name: 'Sandstone Beige', hex: '#D2B48C' },
      { name: 'Antique Brass', hex: '#B5A642' },
    ],
    description:
      'A majestic heritage fort wedding draped in thousands of yellow and saffron marigolds. Complete with traditional Rajasthani dholak players, palace courtyard lighting, brass lanterns, and a sunset phera ceremony.',
    timeline: [
      { time: 'Day 1 (04:00 PM)', activity: 'Folk Welcome & Sunset Mehndi at Fort Terrace' },
      { time: 'Day 1 (08:00 PM)', activity: 'Bhangra Night with Live Traditional Dholak Beats' },
      { time: 'Day 2 (03:30 PM)', activity: 'Royal Barat Procession through the Fort Gateway' },
      { time: 'Day 2 (05:15 PM)', activity: 'Sunset Anand Karaj & Pheras in Marigold Mandap' },
    ],
    servicesDelivered: [
      'Full Marigold & Mirror Mandap Architecture',
      'Heritage Fort Courtyard Illumination & Lanterns',
      'Royal Folk Performers & Traditional Dhol Welcome',
      'Cinematic 4K Heritage Wedding Documentary',
      'Guest Logistics & Heritage Shuttle Transit',
    ],
    testimonial: {
      quote:
        'Managing an event in a historic fort is challenging, but Utsav Events executed everything with effortless royal perfection. The sunset marigold mandap was breathtaking.',
      author: 'Simran & Jaspreet Dhillon',
      rating: 5,
    },
  },
];

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWork, setSelectedWork] = useState<PastWork | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const categories = [
    { id: 'all', label: 'All Celebrations', icon: Sparkles },
    { id: 'wedding', label: 'Weddings & Receptions', icon: Heart },
    { id: 'photography', label: 'Photography & Films', icon: Camera },
    { id: 'baby_shower', label: 'Baby Showers & Cradle', icon: Baby },
    { id: 'birthday', label: 'Birthday Themes & Decor', icon: Cake },
    { id: 'mandap_decor', label: 'Stage & Mandap Decor', icon: Layers },
    { id: 'pre_wedding', label: 'Pre-Wedding & Maternity', icon: Star },
  ];

  // Reset active photo index when opening a new past work
  const handleOpenWork = (work: PastWork) => {
    setSelectedWork(work);
    setActivePhotoIndex(0);
  };

  // Keyboard navigation for image slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedWork) return;

      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % selectedWork.gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev === 0 ? selectedWork.gallery.length - 1 : prev - 1
        );
      } else if (e.key === 'Escape') {
        setSelectedWork(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWork]);

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedWork) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? selectedWork.gallery.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedWork) return;
    setActivePhotoIndex((prev) => (prev + 1) % selectedWork.gallery.length);
  };

  const filteredWorks = PAST_WORKS.filter((work) => {
    const matchesCategory = activeCategory === 'all' || work.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.servicesDelivered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-24">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-primary/10 via-brand-background to-brand-background pt-14 pb-20 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Our Past Celebrations & Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-primary font-heading tracking-tight max-w-4xl mx-auto leading-tight">
            Real Weddings, Baby Showers & Moments We’ve{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">
              Brought to Life.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-brand-mutedGray max-w-2xl mx-auto leading-relaxed">
            Every celebration has a soul. Click any past project card below to view multi-photo albums, event timelines,
            design concepts, and client testimonials.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-brand-darkSlate font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              <span><strong>450+</strong> Celebrations Executed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              <span><strong>25,000+</strong> 4K Photos Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              <span><strong>100%</strong> In-House Team Execution</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? PAST_WORKS.length
                  : PAST_WORKS.filter((w) => w.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shadow-subtle ${isActive
                      ? 'bg-brand-primary text-white shadow-card-hover scale-[1.02]'
                      : 'bg-brand-surface text-brand-darkSlate hover:bg-brand-hoverBg border border-brand-border'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-accent' : 'text-brand-secondary'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1 px-1.5 py-0.5 text-[10px] rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-brand-mutedGray'
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mutedGray" />
            <input
              type="text"
              placeholder="Search by venue, couple, theme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-brand-border bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-accent shadow-subtle"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-brand-mutedGray border-b border-brand-border pb-3">
          <span>
            Showing <strong className="text-brand-primary">{filteredWorks.length}</strong> of{' '}
            {PAST_WORKS.length} completed projects
          </span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-brand-accent hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* 3. PAST WORKS GRID */}
        {filteredWorks.length === 0 ? (
          <div className="p-16 text-center bg-brand-surface rounded-2xl border border-brand-border space-y-3">
            <Filter className="w-10 h-10 text-brand-mutedGray mx-auto" />
            <h3 className="text-lg font-bold text-brand-primary font-heading">No past works found</h3>
            <p className="text-xs text-brand-mutedGray max-w-sm mx-auto">
              We couldn't find any projects matching your search. Try adjusting the category or search keywords.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
            >
              Show All Celebrations
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => handleOpenWork(work)}
                className="group cursor-pointer rounded-2xl bg-brand-surface border border-brand-border overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Image Container with High Contrast Overlay */}
                <div className="relative h-64 overflow-hidden bg-gray-900">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Heavy dark gradient to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Top Category Badge & Photo Count Badge */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white/95 backdrop-blur-md text-brand-primary shadow-subtle">
                      {work.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold">
                      <ImageIcon className="w-3 h-3 text-brand-accent" />
                      <span>{work.gallery.length} Photos</span>
                    </div>
                  </div>

                  {/* Bottom Image Overlay Details (Fix contrast with text-white) */}
                  <div className="absolute bottom-3.5 inset-x-3.5 z-10 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-brand-accent font-semibold drop-shadow">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{work.venue}, {work.city}</span>
                    </div>
                    {/* Explicitly styled with text-white and drop-shadow to guarantee crystal clarity */}
                    <h3 className="text-base font-bold font-heading text-white drop-shadow-md line-clamp-1 leading-snug">
                      {work.title}
                    </h3>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-brand-mutedGray">
                      <span className="font-semibold text-brand-primary">
                        Client: <span className="font-normal text-brand-darkSlate">{work.client}</span>
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 text-brand-secondary" />
                        {work.date}
                      </span>
                    </div>

                    <p className="text-xs text-brand-mutedGray line-clamp-2 leading-relaxed">
                      {work.description}
                    </p>
                  </div>

                  {/* Service Delivered Tags */}
                  <div className="space-y-3 pt-2 border-t border-brand-border">
                    <div className="flex flex-wrap gap-1.5">
                      {work.servicesDelivered.slice(0, 3).map((service, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-brand-primary/5 text-brand-primary border border-brand-primary/10"
                        >
                          {service}
                        </span>
                      ))}
                      {work.servicesDelivered.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-brand-secondary">
                          +{work.servicesDelivered.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-brand-accent font-semibold text-[11px] flex items-center gap-1">
                        <span>Click to view {work.gallery.length} photos & story</span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-brand-primary transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. MULTI-IMAGE ALBUM & EVENT DETAILS LIGHTBOX MODAL */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-brand-surface rounded-2xl shadow-2xl border border-brand-border overflow-hidden my-6">
            {/* Modal Top Bar */}
            <div className="sticky top-0 z-30 bg-brand-surface/95 backdrop-blur-md px-6 py-4 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-brand-primary/10 text-brand-primary">
                  {selectedWork.categoryLabel}
                </span>
                <span className="hidden sm:inline text-xs text-brand-mutedGray">|</span>
                <span className="hidden sm:inline text-xs text-brand-darkSlate font-medium">
                  {selectedWork.client}
                </span>
              </div>

              <button
                onClick={() => setSelectedWork(null)}
                className="w-9 h-9 rounded-full bg-brand-background hover:bg-gray-200 text-brand-darkSlate flex items-center justify-center transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* A. MULTI-IMAGE GALLERY VIEWER (HERO SLIDER) */}
            <div className="relative bg-black select-none">
              <div className="relative h-80 sm:h-[460px] w-full flex items-center justify-center overflow-hidden">
                <img
                  key={activePhotoIndex}
                  src={selectedWork.gallery[activePhotoIndex].url}
                  alt={selectedWork.gallery[activePhotoIndex].caption}
                  className="w-full h-full object-contain animate-fade-in"
                />

                {/* Left Navigation Arrow */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 shadow-lg"
                  title="Previous image (Left arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 shadow-lg"
                  title="Next image (Right arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Top Counter Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-semibold backdrop-blur-md">
                  Photo {activePhotoIndex + 1} of {selectedWork.gallery.length}
                </div>

                {/* Bottom Image Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm font-medium leading-relaxed max-w-3xl">
                    {selectedWork.gallery[activePhotoIndex].caption}
                  </p>
                </div>
              </div>

              {/* B. THUMBNAIL STRIP */}
              <div className="bg-gray-950 p-3 sm:p-4 border-t border-gray-800 flex items-center gap-3 overflow-x-auto scrollbar-none">
                {selectedWork.gallery.map((photo, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => setActivePhotoIndex(pIdx)}
                    className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${activePhotoIndex === pIdx
                        ? 'border-brand-accent ring-2 ring-brand-accent/50 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={photo.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* C. RICH EVENT DETAILS BODY */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              {/* Event Title & Metadata Bar */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-primary font-heading">
                    {selectedWork.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-mutedGray">
                    Celebration for <strong className="text-brand-darkSlate">{selectedWork.client}</strong>
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-brand-background border border-brand-border space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-brand-mutedGray font-medium">
                      <MapPin className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>Venue & City</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-brand-darkSlate truncate">
                      {selectedWork.venue}, {selectedWork.city}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-brand-background border border-brand-border space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-brand-mutedGray font-medium">
                      <Calendar className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>Date</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-brand-darkSlate">
                      {selectedWork.date}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-brand-background border border-brand-border space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-brand-mutedGray font-medium">
                      <Users className="w-3.5 h-3.5 text-brand-accent" />
                      <span>Guest Count</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-brand-darkSlate">
                      {selectedWork.guestCount ? `${selectedWork.guestCount} Guests` : 'Intimate Session'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-brand-background border border-brand-border space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-brand-mutedGray font-medium">
                      <Clock className="w-3.5 h-3.5 text-brand-accent" />
                      <span>Duration</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-brand-darkSlate truncate">
                      {selectedWork.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Signature Highlight Banner */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 border border-brand-primary/20 text-brand-primary flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xs uppercase tracking-wider font-extrabold text-brand-accent">
                    Creative Highlight
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-brand-primary">
                    {selectedWork.highlight}
                  </p>
                </div>
              </div>

              {/* Story & Execution */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-brand-primary uppercase tracking-wider font-heading">
                  Event Story & Execution
                </h4>
                <p className="text-sm text-brand-darkSlate leading-relaxed">
                  {selectedWork.description}
                </p>
              </div>

              {/* Color Palette Swatches */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-brand-primary uppercase tracking-wider font-heading">
                  <Palette className="w-4 h-4 text-brand-secondary" />
                  <span>Color Palette & Aesthetic</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {selectedWork.palette.map((color, cIdx) => (
                    <div
                      key={cIdx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-background border border-brand-border shadow-subtle"
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs font-semibold text-brand-darkSlate">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline of Celebrations */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-brand-primary uppercase tracking-wider font-heading">
                  <Clock className="w-4 h-4 text-brand-secondary" />
                  <span>Celebration Schedule & Milestones</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedWork.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-brand-background border border-brand-border"
                    >
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-primary text-white shrink-0 mt-0.5">
                        {step.time}
                      </span>
                      <span className="text-xs text-brand-darkSlate font-medium leading-relaxed">
                        {step.activity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Delivered Scope */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-brand-primary uppercase tracking-wider font-heading">
                  Services Managed by Our Team
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedWork.servicesDelivered.map((service, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-brand-darkSlate p-3 rounded-xl bg-brand-background border border-brand-border"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                      <span className="font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonial Card */}
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-subtle relative overflow-hidden space-y-3">
                <Quote className="absolute right-4 bottom-4 w-16 h-16 text-brand-primary/5 pointer-events-none" />
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(selectedWork.testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-brand-darkSlate italic leading-relaxed">
                  "{selectedWork.testimonial.quote}"
                </p>
                <div className="text-xs font-bold text-brand-primary">
                  — {selectedWork.testimonial.author}
                </div>
              </div>

              {/* Call to Action Bar */}
              <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-brand-mutedGray text-center sm:text-left">
                  Planning a celebration like this? Our team will tailor every detail for your date.
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link to="/events" className="flex-1 sm:flex-none">
                    <Button variant="outline" size="md" className="w-full">
                      View All Packages
                    </Button>
                  </Link>
                  <Link to="/contact" className="flex-1 sm:flex-none">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Check Date & Get Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SERVICES OVERVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-8 sm:p-12 shadow-subtle space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
              What Our Team Delivers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-primary font-heading">
              End-to-End Management & Creative Production
            </h2>
            <p className="text-xs sm:text-sm text-brand-mutedGray">
              You won't have to hire 10 different vendors. Our in-house specialists coordinate everything under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-brand-background border border-brand-border space-y-2">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-brand-primary" />
              </div>
              <h4 className="text-sm font-bold text-brand-primary font-heading">Wedding & Haldi Decor</h4>
              <p className="text-xs text-brand-mutedGray leading-relaxed">
                Traditional yellow marigold mandaps, floral cascades, aisle styling, and bride/groom grand entries.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-brand-background border border-brand-border space-y-2">
              <div className="w-10 h-10 rounded-lg bg-brand-secondary/15 text-brand-secondary flex items-center justify-center">
                <Camera className="w-5 h-5 text-brand-secondary" />
              </div>
              <h4 className="text-sm font-bold text-brand-primary font-heading">4K Cinematic Films</h4>
              <p className="text-xs text-brand-mutedGray leading-relaxed">
                Aerial drone cinematics, unscripted candid emotions, 3-minute teaser cuts, and lifetime velvet albums.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-brand-background border border-brand-border space-y-2">
              <div className="w-10 h-10 rounded-lg bg-brand-accent/15 text-brand-accent flex items-center justify-center">
                <Baby className="w-5 h-5 text-brand-accent" />
              </div>
              <h4 className="text-sm font-bold text-brand-primary font-heading">Baby Showers & Cradles</h4>
              <p className="text-xs text-brand-mutedGray leading-relaxed">
                Floral ring cradles, cloud balloon backdrops, customized naming boards, and mom-to-be luxury throne sets.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-brand-background border border-brand-border space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <Cake className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-brand-primary font-heading">Milestone Birthdays</h4>
              <p className="text-xs text-brand-mutedGray leading-relaxed">
                LED marquee numbers, themed balloon tunnels, dessert tables, magic shows, and 360-degree photo booths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-primary to-brand-primary/95 text-white rounded-2xl p-8 sm:p-12 shadow-modal flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white drop-shadow-md">
              Have an Upcoming Celebration in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Lock in your date early. Our senior coordinators and creative stylists will craft a celebration tailored to your family's dreams and budget.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link to="/contact">
              <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Check Date Availability
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Explore Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
