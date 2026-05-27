# QA Launch Checklist
- Route tests: all public + /app routes render and navigate.
- Auth tests: login/register/forgot/reset validate and show states.
- Form tests: program/document/bank/interview/report/consultant/profile/tasks/settings.
- Responsive tests: mobile, tablet, desktop nav and cards.
- Security checks: no service_role or AI keys in frontend; no source txt imported.
- Vercel env list: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_SITE_URL(optional).
- Supabase setup: run migrations, deploy edge functions, create optional waitlist table.
- Known limitations: demo fallbacks used when Supabase/env unavailable.
