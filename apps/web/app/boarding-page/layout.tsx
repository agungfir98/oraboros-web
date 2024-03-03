import { Theme } from "@radix-ui/themes";
import React from "react";
import Navbar from "~/app/boarding-page/components/nav";
import ProfileProvider from "~/components/ProfileProvider";
import { ReactQueryProvider } from "~/components/ReactQueryProvider";
import { SessionWrapper } from "~/components/sessionWrapper";
import CustomToaster from "~/components/toaster";

const BoardingLayoutPage: React.FC<{ children: React.ReactNode }> = async ({
	children,
}) => {
	return (
		<Theme>
			<CustomToaster />
			<ReactQueryProvider>
				<SessionWrapper>
					<ProfileProvider>
						<div className="flex flex-col min-h-screen">
							<Navbar />
							{children}
						</div>
					</ProfileProvider>
				</SessionWrapper>
			</ReactQueryProvider>
		</Theme>
	);
};

export default BoardingLayoutPage;
