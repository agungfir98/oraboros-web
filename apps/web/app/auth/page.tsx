import { redirect } from "next/navigation";
import React from "react";
import GoogleSignInBtn from "~/components/Button/googleSignInBtn";
import userSession from "~/lib/actions/guard";

const AuthPage = async () => {
	const { data } = await userSession();

	if (data.session) {
		return redirect("/");
	}

	return (
		<div>
			<GoogleSignInBtn />
		</div>
	);
};

export default AuthPage;
