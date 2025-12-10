-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- TOURS TABLE
create table public.tours (
  id uuid not null default uuid_generate_v4() primary key,
  slug text not null unique, -- e.g. 'midnight-sun-whale-safari'
  title text not null,
  description text,
  duration text, -- e.g. '3 hours'
  price_dkk integer not null, -- e.g. 1990
  max_guests integer,
  image_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BOOKINGS TABLE
create table public.bookings (
  id uuid not null default uuid_generate_v4() primary key,
  tour_id uuid references public.tours(id),
  
  -- Customer Info
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  
  -- Booking Details
  tour_date date not null,
  guest_count integer not null default 1,
  total_price_dkk integer not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status text default 'unpaid' check (payment_status in ('unpaid', 'paid', 'refunded')),
  
  -- Metadata
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.tours enable row level security;
alter table public.bookings enable row level security;

-- POLICIES

-- Tours: Everyone can read active tours
create policy "Public tours are viewable by everyone"
  on public.tours for select
  using ( true );

-- Bookings: Only authenticated admins can view all bookings
-- (For now, we assume any authenticated user is an admin, or you can check for specific email)
create policy "Admins can view all bookings"
  on public.bookings for select
  to authenticated
  using ( true );

create policy "Admins can insert bookings"
  on public.bookings for insert
  to authenticated
  with check ( true );

create policy "Admins can update bookings"
  on public.bookings for update
  to authenticated
  using ( true );

-- Allow public to create bookings (for the booking form)
create policy "Public can create bookings"
  on public.bookings for insert
  to anon
  with check ( true );

-- SEED DATA (Initial Tours)
insert into public.tours (slug, title, duration, price_dkk, image_url) values
('midnight-sun', 'Midnight Sun Whale Safari', '3 hours', 1990, '/images/whale-tail.jpg'),
('ice-fjord', 'Ice Fjord Explorer', '2.5 hours', 895, '/images/iceberg.jpg'),
('hot-tub', 'Arctic Hot Tub Experience', '2 hours', 2500, '/images/hot-tub.jpg');
