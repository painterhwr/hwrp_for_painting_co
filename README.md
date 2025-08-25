# HWRP for Painting Co

This repository contains the initial skeleton for **HWRP**, a job management dashboard for painting/contracting businesses.  The goal is to provide a role‑based web application built on Next.js 14, TypeScript and TailwindCSS with Supabase for authentication, database and storage.

## Prerequisites

* **Node.js v18+** – Install from [nodejs.org](https://nodejs.org/) if you don't have it.
* **A Supabase project** – Create one at [supabase.com](https://supabase.com/) and note your project URL and anon key.
* **pnpm/Yarn/npm** – Any package manager will work; the examples below use `npm`.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create your environment file:**

   Copy the provided `.env.example` to `.env.local` and populate the values with your Supabase credentials and any email provider settings.  At minimum you need `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

   ```bash
   cp .env.example .env.local
   # then edit .env.local
   ```

3. **Run migrations:**

   Supabase migrations live under `supabase/migrations`.  Use the Supabase CLI to apply them:

   ```bash
   supabase db reset --schema public
   supabase db push
   ```

   Alternatively, you can copy/paste the SQL into the Supabase dashboard's SQL editor.

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## Building for production

To build the application for production use:

```bash
npm run build
npm start
```

## Project Structure

This scaffold follows the Next.js **App Router** convention.  Key folders include:

* `src/lib` – Supabase client and auth context.
* `src/components` – Shared UI components such as the sidebar and forms.
* `src/app` – Application routes.  See `app/login/page.tsx`, `app/dashboard/page.tsx`, etc.
* `supabase/migrations` – SQL migrations defining your schema and row‑level security policies.

## Notes

* This is a starter skeleton.  Many features (drag & drop tasks, expense editing, file uploads, etc.) are provided as stubs ready for implementation.
* The app uses Supabase row‑level security (RLS) policies.  Ensure your policies match your intended access model.
* Only the `anon key` should be exposed in the browser.  The `service_role` key, if used, must remain server‑side.