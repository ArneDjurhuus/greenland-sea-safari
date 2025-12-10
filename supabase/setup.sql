-- =====================================================
-- GREENLAND SEA SAFARI - COMPLETE DATABASE SCHEMA
-- =====================================================
-- This script will DROP ALL EXISTING TABLES and recreate them.
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- =====================================================

-- Enable UUID extension (already enabled by default in Supabase)
create extension if not exists "uuid-ossp";

-- =====================================================
-- DROP EXISTING TABLES AND POLICIES
-- This will delete ALL data and recreate the schema from scratch
-- =====================================================

-- Drop tables (cascade will automatically drop related policies and indexes)
drop table if exists public.contact_messages cascade;
drop table if exists public.bookings cascade;
drop table if exists public.tours cascade;
drop table if exists public.settings cascade;

-- =====================================================
-- SETTINGS TABLE
-- Single row for global application settings
-- =====================================================
create table public.settings (
  id uuid not null default uuid_generate_v4() primary key,
  company_name text not null default 'Greenland Sea Safari',
  email text not null default 'info@greenlandseasafari.com',
  phone text not null default '+299 483328',
  website text not null default 'https://greenlandseasafari.com',
  address text not null default 'Noah Mølgaardsvej, 3952 Ilulissat, Greenland',
  notify_on_booking boolean not null default true,
  notify_on_cancellation boolean not null default true,
  auto_confirm_bookings boolean not null default false,
  updated_at timestamp with time zone not null default timezone('utc'::text, now())
);

-- Ensure only one settings row can exist
create unique index settings_singleton_idx on public.settings ((true));

-- =====================================================
-- TOURS TABLE
-- All available tours/experiences
-- =====================================================
create table public.tours (
  id uuid not null default uuid_generate_v4() primary key,
  slug text not null unique,
  title text not null,
  description text,
  duration text,
  price_dkk integer not null,
  max_guests integer not null default 7,
  image_url text,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

-- =====================================================
-- BOOKINGS TABLE
-- Customer bookings for tours
-- =====================================================
create table public.bookings (
  id uuid not null default uuid_generate_v4() primary key,
  tour_id uuid references public.tours(id) on delete set null,
  
  -- Customer Information
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  
  -- Booking Details
  tour_date date not null,
  guest_count integer not null default 1 check (guest_count >= 1),
  total_price_dkk integer not null default 0 check (total_price_dkk >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'paid', 'refunded')),
  
  -- Metadata
  notes text,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

-- =====================================================
-- CONTACT MESSAGES TABLE
-- Messages from the contact form
-- =====================================================
create table public.contact_messages (
  id uuid not null default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null default 'General Inquiry',
  message text not null,
  is_read boolean not null default false,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

-- =====================================================
-- INDEXES
-- Optimize query performance
-- =====================================================

-- Bookings indexes
create index idx_bookings_tour_id on public.bookings(tour_id);
create index idx_bookings_status on public.bookings(status);
create index idx_bookings_payment_status on public.bookings(payment_status);
create index idx_bookings_customer_email on public.bookings(customer_email);
create index idx_bookings_tour_date on public.bookings(tour_date);
create index idx_bookings_created_at on public.bookings(created_at desc);

-- Tours indexes
create index idx_tours_is_active on public.tours(is_active);
create index idx_tours_slug on public.tours(slug);
create index idx_tours_created_at on public.tours(created_at desc);

-- Contact messages indexes
create index idx_contact_messages_is_read on public.contact_messages(is_read);
create index idx_contact_messages_created_at on public.contact_messages(created_at desc);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
alter table public.settings enable row level security;
alter table public.tours enable row level security;
alter table public.bookings enable row level security;
alter table public.contact_messages enable row level security;

-- =====================================================
-- POLICIES: SETTINGS
-- =====================================================

-- Everyone can read settings (for contact info on public pages)
create policy "Public settings are viewable by everyone"
  on public.settings for select
  using (true);

-- Only authenticated users can update settings
create policy "Authenticated users can update settings"
  on public.settings for update
  to authenticated
  using (true);

-- =====================================================
-- POLICIES: TOURS
-- =====================================================

-- Everyone can read tours (public catalog)
create policy "Public tours are viewable by everyone"
  on public.tours for select
  using (true);

-- Only authenticated users can create tours
create policy "Authenticated users can insert tours"
  on public.tours for insert
  to authenticated
  with check (true);

-- Only authenticated users can update tours
create policy "Authenticated users can update tours"
  on public.tours for update
  to authenticated
  using (true);

-- Only authenticated users can delete tours
create policy "Authenticated users can delete tours"
  on public.tours for delete
  to authenticated
  using (true);

-- =====================================================
-- POLICIES: BOOKINGS
-- =====================================================

-- Authenticated users can view all bookings
create policy "Admins can view all bookings"
  on public.bookings for select
  to authenticated
  using (true);

-- Authenticated users can create bookings
create policy "Admins can insert bookings"
  on public.bookings for insert
  to authenticated
  with check (true);

-- Authenticated users can update bookings
create policy "Admins can update bookings"
  on public.bookings for update
  to authenticated
  using (true);

-- Authenticated users can delete bookings
create policy "Admins can delete bookings"
  on public.bookings for delete
  to authenticated
  using (true);

-- Anonymous users can create bookings (public booking form)
create policy "Public can create bookings"
  on public.bookings for insert
  to anon
  with check (true);

-- =====================================================
-- POLICIES: CONTACT MESSAGES
-- =====================================================

-- Anonymous users can create contact messages
create policy "Public can create contact messages"
  on public.contact_messages for insert
  to anon
  with check (true);

-- Authenticated users can view all contact messages
create policy "Admins can view contact messages"
  on public.contact_messages for select
  to authenticated
  using (true);

-- Authenticated users can update contact messages (mark as read)
create policy "Admins can update contact messages"
  on public.contact_messages for update
  to authenticated
  using (true);

-- Authenticated users can delete contact messages
create policy "Admins can delete contact messages"
  on public.contact_messages for delete
  to authenticated
  using (true);

-- =====================================================
-- SEED DATA: SETTINGS
-- =====================================================
insert into public.settings (
  company_name,
  email,
  phone,
  website,
  address
) values (
  'Greenland Sea Safari',
  'info@greenlandseasafari.com',
  '+299 483328',
  'https://greenlandseasafari.com',
  'Noah Mølgaardsvej, 3952 Ilulissat, Greenland'
);

-- =====================================================
-- SEED DATA: TOURS
-- =====================================================
insert into public.tours (slug, title, description, duration, price_dkk, max_guests, image_url, is_active) values
(
  'hot-tub',
  'Floating Hot Tub Among Icebergs',
  'An exclusive once in a lifetime experience for adventurers! Relax in a warm hot tub while drifting through the freezing Arctic waters surrounding majestic icebergs.',
  '3 hours',
  1495,
  6,
  '/hottub_1.png',
  true
),
(
  'icefjord-safari',
  'Ilulissat Icefjord Safari',
  'Navigate through the massive icebergs of the UNESCO World Heritage site. Witness the sheer scale of nature as you cruise past ice giants.',
  '2.5 hours',
  895,
  7,
  'https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2078',
  true
),
(
  'whale-watching',
  'Whale Watching Adventure',
  'Get up close with the gentle giants of the sea. Spot Humpback, Fin, and Minke whales feeding in the nutrient-rich waters of Disko Bay.',
  '3 hours',
  995,
  7,
  'https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=2073',
  true
),
(
  'midnight-sun',
  'Midnight Sun Cruise',
  'Experience the endless golden hour. Watch the icebergs glow in different shades of orange and pink as the sun refuses to set.',
  '2.5 hours',
  795,
  7,
  'https://images.unsplash.com/photo-1504788363733-507549153474?q=80&w=2067',
  true
);

-- =====================================================
-- SAMPLE BOOKINGS (for testing - uncomment if needed)
-- =====================================================
/*
insert into public.bookings (tour_id, customer_name, customer_email, customer_phone, tour_date, guest_count, total_price_dkk, status, payment_status) values
(
  (select id from public.tours where slug = 'hot-tub'),
  'John Smith',
  'john.smith@example.com',
  '+45 12345678',
  '2025-07-15',
  2,
  2990,
  'confirmed',
  'paid'
),
(
  (select id from public.tours where slug = 'whale-watching'),
  'Maria Jensen',
  'maria.jensen@example.com',
  '+45 87654321',
  '2025-07-16',
  4,
  3980,
  'pending',
  'unpaid'
),
(
  (select id from public.tours where slug = 'icefjord-safari'),
  'Hans Olsen',
  'hans.olsen@example.com',
  null,
  '2025-07-20',
  2,
  1790,
  'confirmed',
  'paid'
);
*/

-- =====================================================
-- VERIFY SETUP
-- =====================================================
select 'Settings rows:' as status, count(*) as count from public.settings;
select 'Tours created:' as status, count(*) as count from public.tours;
select 'Bookings created:' as status, count(*) as count from public.bookings;
select 'Contact messages:' as status, count(*) as count from public.contact_messages;
