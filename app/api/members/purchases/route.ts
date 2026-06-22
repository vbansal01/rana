import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerSupabaseClient();
  const { data: member } = await supabase
    .from("members")
    .select("id")
    .eq("email", session.user.email!)
    .single();

  if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("member_id", member.id)
    .order("date", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
