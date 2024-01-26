import React from "react";
import userSession from "~/lib/actions/guard";

const MainLayout: React.FC<{
	children: React.ReactNode;
	landingpage: React.ReactNode;
	dashboard: React.ReactNode;
}> = async ({ children, dashboard, landingpage }) => {
	const { data } = await userSession();
	return (
		<div>
			<div>{children}</div>
			{data.session ? dashboard : landingpage}
		</div>
	);
};

export default MainLayout;
