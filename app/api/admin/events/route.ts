import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase";
import { MOCK_EVENTS } from "@/lib/mock-data";

async function isAdmin(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return !!token && verifyAdminToken(token);
}

// GET — list all events (Supabase first, fallback to mock)
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    if (data && data.length > 0) return NextResponse.json(data);
  } catch {}

  // Supabase not wired yet — return mock events
  return NextResponse.json(MOCK_EVENTS);
}

// POST — create a new event
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, date, location, description, category, image_url, featured } = body;

  if (!title || !date) {
    return NextResponse.json({ error: "title and date are required" }, { status: 400 });
  }

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("events")
      .insert({ title, date, location, description, category: category ?? "Community", image_url, featured: featured ?? false })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Insert failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
