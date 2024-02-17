import React from "react";
import SignOutButton from "./Button/SignOutButton";
import Link from "./Link";

const DashboardNavigation = () => {
	return (
		<div className="relative">
			<nav className="h-10 text-sm md:text-base md:h-16 outline outline-1 outline-black flex gap-0 justify-end">
				<div className="flex gap-[1px]">
					<Link href={"#"} outline="1" className="px-3">
						Budgets
					</Link>
					<Link href={"#"} outline="1" className="px-3">
						Transactions
					</Link>
					<SignOutButton />
				</div>
			</nav>
		</div>
	);
};

export default DashboardNavigation;
