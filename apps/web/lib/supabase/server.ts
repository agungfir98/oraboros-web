"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "~/lib/env";
import type { CookieOptions } from "@supabase/ssr";

export async function createSupabaseServerClientComponent() {
	const cookieStore = cookies();

	return createServerClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					cookieStore.set({ name, value, ...options });
				},
				remove(name: string, options: CookieOptions) {
					cookieStore.delete({ name, ...options });
				},
			},
		}
	);
}
