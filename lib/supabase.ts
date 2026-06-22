import { createClient } from "@supabase/supabase-js";

// Lazy client — created on first call, not at import time.
// This prevents "supabaseUrl is required" errors during Next.js build.
let _client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _client;
}

// Server-side client with service role key (never expose to the browser).
// Always creates a new instance so the service role key isn't cached across requests.
export function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
