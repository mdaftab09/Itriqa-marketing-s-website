-- Irtiqa Marketing: Photography Segments Migration
-- Run this once in Supabase SQL Editor AFTER supabase-photography.sql.
-- Existing gallery photos are placed in Beauty & Salon so the current gallery
-- stays visible. You can move individual photos to Brides or another segment
-- from the Admin > Photography screen.

alter table public.photography_photos
  add column if not exists category text not null default 'Beauty & Salon';

-- Keep category values controlled from the database as well as the UI.
do $$
begin
  alter table public.photography_photos
    add constraint photography_photos_category_check
    check (category in (
      'Healthcare',
      'Brides',
      'Real Estate',
      'Education',
      'Fashion',
      'Beauty & Salon',
      'Restaurants & Hotels',
      'Startups',
      'Ecommerce',
      'NGOs',
      'Manufacturing',
      'Corporate Companies'
    ));
exception when duplicate_object then null;
end $$;

create index if not exists photography_photos_category_sort_idx
  on public.photography_photos (category, sort_order, created_at);

-- Make the intended default explicit for future uploads.
alter table public.photography_photos
  alter column category set default 'Beauty & Salon';
