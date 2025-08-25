import { createClient } from '@supabase/supabase-js'

// Create a Supabase client for the browser.  Session persistence and auto refresh are enabled
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
)