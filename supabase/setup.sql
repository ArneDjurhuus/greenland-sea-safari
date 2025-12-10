-- =====================================================
-- GREENLAND SEA SAFARI - DATABASE SETUP SCRIPT
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- =====================================================

-- Enable UUID extension (already enabled by default in Supabase, but safe to run)
create extension if not exists "uuid-ossp";

-- =====================================================
-- DROP EXISTING TABLES
-- This will delete all data and recreate the schema
-- =====================================================
drop table if exists public.bookings cascade;
drop table if exists public.tours cascade;
drop table if exists public.settings cascade;

-- =====================================================
-- SETTINGS TABLE
-- =====================================================
create table if not exists public.settings (
  id uuid not null default uuid_generate_v4() primary key,
  company_name text not null default 'Greenland Sea Safari',
  email text not null default 'info@greenlandseasafari.com',
  phone text not null default '+299 123 456',
  website text not null default 'https://greenlandseasafari.com',
  address text not null default 'Ilulissat Harbor, 3952 Ilulissat, Greenland',
  notify_on_booking boolean default true,
  notify_on_cancellation boolean default true,
  auto_confirm_bookings boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure only one row exists
create unique index on public.settings ((true));

-- =====================================================
-- TOURS TABLE
-- =====================================================
create table if not exists public.tours (
  id uuid not null default uuid_generate_v4() primary key,
  slug text not null unique,
  title text not null,
  description text,
  duration text,
  price_dkk integer not null,
  max_guests integer default 7,
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =====================================================
-- BOOKINGS TABLE
-- =====================================================
create table if not exists public.bookings (
  id uuid not null default uuid_generate_v4() primary key,
  tour_id uuid references public.tours(id) on delete set null,
  
  -- Customer Info
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  
  -- Booking Details
  tour_date date not null,
  guest_count integer not null default 1,
  total_price_dkk integer not null default 0,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status text default 'unpaid' check (payment_status in ('unpaid', 'paid', 'refunded')),
  
  -- Metadata
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
alter table public.tours enable row level security;
alter table public.bookings enable row level security;
alter table public.settings enable row level security;

-- Settings: Public can read settings (for contact info etc)
create policy "Public settings are viewable by everyone"
  on public.settings for select
  using ( true );

-- Settings: Only admins can update
create policy "Admins can update settings"
  on public.settings for update
  to authenticated
  using ( true );

-- Tours: Everyone can read active tours
create policy "Public tours are viewable by everyone"
  on public.tours for select
  using ( true );

-- Bookings: Authenticated users (admins) can view all bookings
create policy "Admins can view all bookings"
  on public.bookings for select
  to authenticated
  using ( true );

-- Bookings: Authenticated users can insert bookings
create policy "Admins can insert bookings"
  on public.bookings for insert
  to authenticated
  with check ( true );

-- Bookings: Authenticated users can update bookings
create policy "Admins can update bookings"
  on public.bookings for update
  to authenticated
  using ( true );

-- Bookings: Authenticated users can delete bookings
create policy "Admins can delete bookings"
  on public.bookings for delete
  to authenticated
  using ( true );

-- Bookings: Anonymous users (website visitors) can create bookings
create policy "Public can create bookings"
  on public.bookings for insert
  to anon
  with check ( true );

-- =====================================================
-- SEED DATA - TOURS
-- =====================================================
insert into public.tours (slug, title, description, duration, price_dkk, max_guests, image_url, is_active) values
(
  'midnight-sun',
  'Midnight Sun Whale Safari',
  'Experience the magic of whale watching under the midnight sun. Spot humpback whales, fin whales, and orcas in the pristine waters of Disko Bay.',
  '3 hours',
  1990,
  7,
  '/images/whale-tail.jpg',
  true
),
(
  'ice-fjord',
  'Ice Fjord Explorer',
  'Navigate through the UNESCO World Heritage Ilulissat Icefjord. Witness massive icebergs calving from the Sermeq Kujalleq glacier.',
  '2.5 hours',
  895,
  7,
  '/images/iceberg.jpg',
  true
),
(
  'hot-tub',
  'Arctic Hot Tub Experience',
  'Relax in a heated hot tub on deck while sailing past icebergs. The ultimate Arctic luxury experience with stunning fjord views.',
  '2 hours',
  2500,
  6,
  '/images/hot-tub.jpg',
  true
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  duration = excluded.duration,
  price_dkk = excluded.price_dkk,
  max_guests = excluded.max_guests,
  image_url = excluded.image_url,
  is_active = excluded.is_active;

-- =====================================================
-- SEED DATA - SETTINGS
-- =====================================================
insert into public.settings (company_name) values ('Greenland Sea Safari')
on conflict do nothing;

-- =====================================================
-- SAMPLE BOOKINGS (Optional - for testing)
-- Uncomment to add test data
-- =====================================================
-- insert into public.bookings (tour_id, customer_name, customer_email, customer_phone, tour_date, guest_count, total_price_dkk, status, payment_status) values
-- ((select id from public.tours where slug = 'midnight-sun'), 'John Smith', 'john@example.com', '+45 12345678', '2025-07-15', 2, 3980, 'confirmed', 'paid'),
-- ((select id from public.tours where slug = 'ice-fjord'), 'Maria Jensen', 'maria@example.com', '+45 87654321', '2025-07-16', 4, 3580, 'pending', 'unpaid'),
-- ((select id from public.tours where slug = 'hot-tub'), 'Hans Olsen', 'hans@example.com', NULL, '2025-07-20', 2, 5000, 'confirmed', 'paid');

-- =====================================================
-- VERIFY SETUP
-- =====================================================
select 'Tours created:' as status, count(*) as count from public.tours;
select 'Bookings created:' as status, count(*) as count from public.bookings;
