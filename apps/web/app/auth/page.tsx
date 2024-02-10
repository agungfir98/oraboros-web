import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import GoogleSignInBtn from "~/components/Button/googleSignInBtn";
import userSession from "~/lib/actions/guard";
import { FaArrowLeft } from "react-icons/fa";

const AuthPage = async () => {
  const { data } = await userSession();

  if (data.session) {
    return redirect("/");
  }

  return (
    <div className="h-screen flex flex-col">
      <nav className="px-3 py-4">
        <Link href={"/"} className="w-fit flex items-center font-medium gap-2">
          <FaArrowLeft />
          <p className="text-sm">Main page</p>
        </Link>
      </nav>
      <div className="flex-1 flex justify-center items-center">
        <div className="outline outline-black outline-1 px-3 py-4 flex flex-col gap-3 w-full mx-6 md:w-1/4 bg-white shadow-solid-base">
          <h1 className="text-center font-semibold">Sign In Method</h1>

          <div>
            <GoogleSignInBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
