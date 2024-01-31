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
			className="outline outline-1 outline-black hover:bg-green-400 flex h-full w-full items-center justify-center py-3"
			onClick={handleGoogleSignin}
		>
			<FcGoogle size={24} />
			<p className="font-semibold">Sign in With Google</p>
		</button>
	);
};

export default GoogleSignInBtn;
