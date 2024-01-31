import Link from "next/link";
import React from "react";

const LandingPage = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<nav className="h-14 border-b-2 border-black flex">
				<div className="w-full flex justify-end">
					<Link href={"/auth"}>
						<div className="h-full px-10 flex items-center outline-2 outline outline-black hover:bg-green-400">
							<p className="font-medium text-base ">Sign In</p>
						</div>
					</Link>
				</div>
			</nav>
			<main className="flex-1 flex items-center flex-col justify-center container mx-auto">
				<h1 className="text-7xl md:text-9xl font-bold">Oraboros</h1>
				<p className="font-mono max-sm:text-xs text-center">
					Bare necessity daily expense tracker for your need
				</p>
			</main>
		</div>
	);
};

export default LandingPage;
