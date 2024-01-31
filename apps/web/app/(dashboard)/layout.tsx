"use server";
import React from "react";
import ProfileProvider from "~/components/ProfileProvider";
import { ReactQueryProvider } from "~/components/ReactQueryProvider";
import userSession from "~/lib/actions/guard";

const MainLayout: React.FC<{
	children: React.ReactNode;
	landingpage: React.ReactNode;
}> = async ({ children, landingpage }) => {
	const { data } = await userSession();

	return (
		<>
			{data.session ? (
				<ReactQueryProvider>
					<ProfileProvider>{children}</ProfileProvider>
				</ReactQueryProvider>
			) : (
				landingpage
			)}
		</>
	);
};

export default MainLayout;
