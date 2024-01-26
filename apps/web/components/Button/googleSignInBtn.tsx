"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { createSupabaseClientComponent } from "~/lib/supabase/client";

const GoogleSignInBtn = () => {
	const supabase = createSupabaseClientComponent();

	const handleGoogleSignin = () => {
		return supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${location.origin}/auth/callback` },
		});
	};
	return (
		<button
			className="flex gap-2 items-center outline-slate-400 outline-1 outline px-3 py-4 rounded-lg hover:bg-neutral-200"
			onClick={handleGoogleSignin}
		>
			<FcGoogle size={24} />
			<p className="font-semibold text-neutral-600 tex-2xl">
				Sign in With Google
			</p>
		</button>
	);
};

export default GoogleSignInBtn;
