"use server";
import { createSupabaseServerClientComponent } from "../supabase/server";

export default async function userSession() {
  const supabase = await createSupabaseServerClientComponent();

  return supabase.auth.getSession();
}
