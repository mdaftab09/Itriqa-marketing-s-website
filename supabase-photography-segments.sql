

alter table public.photography_photos
  add column if not exists category text not null default 'Beauty & Salon';

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


alter table public.photography_photos
  alter column category set default 'Beauty & Salon';
