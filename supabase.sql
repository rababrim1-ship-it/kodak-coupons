-- شغّلي هذا الملف مرة واحدة في Supabase > SQL Editor
create table if not exists public.codes (
  id uuid primary key default gen_random_uuid(),
  store text not null,
  code text not null,
  discount text,
  description text,
  link text not null,
  expires date,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.codes enable row level security;

create policy "Public can view active codes"
on public.codes for select
to anon, authenticated
using (active = true);

create policy "Authenticated can insert codes"
on public.codes for insert
to authenticated
with check (true);

create policy "Authenticated can update codes"
on public.codes for update
to authenticated
using (true) with check (true);

create policy "Authenticated can delete codes"
on public.codes for delete
to authenticated
using (true);

-- ملاحظة:
-- في هذه النسخة أي حساب Authenticated يستطيع تعديل/حذف الأكواد.
-- إذا أردتِ صلاحيات مختلفة لكل شخص (Admin/Editor/Contributor)،
-- يمكن إضافة نظام roles أكثر أماناً في النسخة التالية.
