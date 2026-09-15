كودك V2 — إدارة الأكواد من الهاتف

1) أنشئي حساباً مجانياً في Supabase.
2) أنشئي Project جديد.
3) افتحي SQL Editor والصقي محتوى supabase.sql ثم Run.
4) من Authentication > Users أنشئي حسابك (البريد + كلمة المرور).
5) من Project Settings > API انسخي Project URL و anon/publishable key.
6) افتحي config.js وضعي القيم مكان:
   SUPABASE_URL
   SUPABASE_KEY
7) ارفعي الملفات إلى GitHub.
8) فعّلي GitHub Pages من Settings > Pages.

بعدها:
- الموقع: index.html
- الإدارة: admin.html
- من الهاتف يمكنك تسجيل الدخول وإضافة/تعطيل/حذف الأكواد.

تنبيه:
لا تضعي Service Role Key داخل config.js.
هذه النسخة تعطي كل المستخدمين المسجلين صلاحية إدارة الأكواد. إذا أردتِ دعوة أشخاص بصلاحيات محددة، نحتاج نظام Roles (Admin / Editor / Contributor).
