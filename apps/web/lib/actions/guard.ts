"use server";
import { createSupabaseServerClientComponent } from "../supabase/server";

export default async function userSession() {
  const supabase = await createSupabaseServerClientComponent();

  // supabase.auth
  // 	.getSession()
  // 	.then((res) => console.log({ actions: res.data.session }))
  // 	.catch((err) => console.error({ err }));

  return supabase.auth.getSession();
}
