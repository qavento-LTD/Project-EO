-- Create Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  role text default 'customer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Categories table
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Products table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price decimal(10, 2) not null,
  category_id uuid references public.categories(id),
  image_url text,
  stock integer default 0,
  is_featured boolean default false,
  rating decimal(2, 1) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Orders table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  status text default 'pending', -- pending, processing, shipped, delivered, cancelled
  total decimal(10, 2) not null,
  shipping_address jsonb,
  payment_method text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Order Items table
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity integer not null,
  price decimal(10, 2) not null, -- Price at time of purchase
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Policies
-- Profiles: Users can view/edit their own profile
create policy "Public profiles are viewable by everyone." on public.profiles for select using ( true );
create policy "Users can insert their own profile." on public.profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on public.profiles for update using ( auth.uid() = id );

-- Categories/Products: Public read
drop policy if exists "Categories are viewable by everyone." on public.categories;
drop policy if exists "Products are viewable by everyone." on public.products;
create policy "Categories are viewable by everyone." on public.categories for select using ( true );
create policy "Products are viewable by everyone." on public.products for select using ( true );

-- Orders: Users can view their own orders, and anyone can insert (for guest checkout)
drop policy if exists "Users can view own orders." on public.orders;
drop policy if exists "Users can insert own orders." on public.orders;
create policy "Users can view own orders." on public.orders for select using ( auth.uid() = user_id or user_id is null );
create policy "Anyone can insert orders." on public.orders for insert with check ( true );

-- Order Items: Anyone can insert
drop policy if exists "Anyone can insert order items." on public.order_items;
create policy "Anyone can insert order items." on public.order_items for insert with check ( true );
create policy "Anyone can view order items." on public.order_items for select using ( true );

-- Initial Data Seeding (Optional)
insert into public.categories (name, slug, icon) values
('أطقم لانجري', 'lingerie-sets', 'fa-heart'),
('ملابس نوم', 'sleepwear', 'fa-moon'),
('أرواب', 'robes', 'fa-user-secret'),
('تجهيز العرايس', 'bridal', 'fa-ring'),
('اكسسوارات', 'accessories', 'fa-gem');
