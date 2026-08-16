
create extension if not exists pgcrypto;

create table if not exists public.photography_photos (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  title text not null default '',
  alt_text text not null default '',
  category text not null default 'Beauty & Salon',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.photography_photos enable row level security;

do $$
begin
  alter table public.photography_photos
    add constraint photography_photos_category_check
    check (category in (
      'Healthcare', 'Brides', 'Real Estate', 'Education', 'Fashion',
      'Beauty & Salon', 'Restaurants & Hotels', 'Startups', 'Ecommerce',
      'NGOs', 'Manufacturing', 'Corporate Companies'
    ));
exception when duplicate_object then null;
end $$;

create index if not exists photography_photos_category_sort_idx
  on public.photography_photos (category, sort_order, created_at);


-- Public visitors can read the gallery metadata.
do $$
begin
  create policy "Public can view photography" on public.photography_photos
    for select using (true);
exception when duplicate_object then null;
end $$;

-- Only signed-in Supabase users can manage the gallery.
do $$
begin
  create policy "Authenticated can insert photography" on public.photography_photos
    for insert to authenticated with check (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy "Authenticated can update photography" on public.photography_photos
    for update to authenticated using (true) with check (true);
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy "Authenticated can delete photography" on public.photography_photos
    for delete to authenticated using (true);
exception when duplicate_object then null;
end $$;

-- Public Storage bucket for optimized gallery delivery.
insert into storage.buckets (id, name, public)
values ('photography', 'photography', true)
on conflict (id) do update set public = true;

do $$
begin
  create policy "Public can view photography files" on storage.objects
    for select using (bucket_id = 'photography');
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy "Authenticated can upload photography files" on storage.objects
    for insert to authenticated with check (bucket_id = 'photography');
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy "Authenticated can update photography files" on storage.objects
    for update to authenticated using (bucket_id = 'photography') with check (bucket_id = 'photography');
exception when duplicate_object then null;
end $$;

do $$
begin
  create policy "Authenticated can delete photography files" on storage.objects
    for delete to authenticated using (bucket_id = 'photography');
exception when duplicate_object then null;
end $$;
