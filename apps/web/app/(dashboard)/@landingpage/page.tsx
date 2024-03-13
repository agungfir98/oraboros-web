import React from "react";
import Link from "~/components/Link";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className=" container relative mx-auto flex min-h-screen flex-1 flex-col items-center justify-center">
        <div className="absolute left-0 top-0 w-full">
          <nav className="container mx-auto flex h-20 items-center justify-end">
            <Link
              href={"/auth"}
              variant="button"
              outline="1"
              className="h-fit rounded-full bg-green-300 px-10 font-semibold"
            >
              Sign In
            </Link>
          </nav>
        </div>
        <h1 className="text-7xl font-bold md:text-9xl">Oraboros</h1>
        <p className="text-center font-mono max-sm:text-xs">
          Bare necessity daily expense tracker for your need
        </p>
      </main>
    </div>
  );
};

export default LandingPage;
