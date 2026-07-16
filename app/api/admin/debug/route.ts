import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

// DELETE THIS FILE after debugging
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  // 1. Check Supabase env vars
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
    return NextResponse.json({ error: "NEXT_PUBLIC_SUPABASE_URL not set" }, { status: 500 });
  }
  if (!serviceKey || serviceKey === "placeholder") {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY not set" }, { status: 500 });
  }

  // 2. Test Supabase connection
  try {
    const supabase = createServerSupabaseClient();
    const { count, error: countErr } = await supabase
      .from("members")
      .select("*", { count: "exact", head: true });

    if (countErr) {
      return NextResponse.json({ error: "Supabase query failed", detail: countErr.message }, { status: 500 });
    }

    // 3. If email param given, check if that member exists
    if (email) {
      const { data, error: findErr } = await supabase
        .from("members")
        .select("id, name, email, status, membership_type, password_hash")
        .eq("email", email.toLowerCase())
        .single();

      if (findErr || !data) {
        return NextResponse.json({
          supabase: "connected",
          total_members: count,
          member_found: false,
          email_checked: email,
        });
      }

      return NextResponse.json({
        supabase: "connected",
        total_members: count,
        member_found: true,
        member: {
          id: data.id,
          name: data.name,
          email: data.email,
          status: data.status,
          membership_type: data.membership_type,
          has_password_hash: !!data.password_hash,
          hash_prefix: data.password_hash?.slice(0, 7),
        },
      });
    }

    return NextResponse.json({ supabase: "connected", total_members: count });
  } catch (e: any) {
    return NextResponse.json({ error: "Exception", detail: e.message }, { status: 500 });
  }
}
