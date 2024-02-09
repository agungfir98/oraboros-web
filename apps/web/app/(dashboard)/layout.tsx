"use server";
import React from "react";
import ProfileProvider from "~/components/ProfileProvider";
import { ReactQueryProvider } from "~/components/ReactQueryProvider";
import userSession from "~/lib/actions/guard";
import { SessionProvider } from '~/components/sessionProvider'

const MainLayout: React.FC<{
  children: React.ReactNode;
  landingpage: React.ReactNode;
}> = async ({ children, landingpage }) => {
  const { data } = await userSession();

  return (
    <>
      {data.session ? (
        <ReactQueryProvider>
          <SessionProvider>
            <ProfileProvider>{children}</ProfileProvider>
          </SessionProvider>
        </ReactQueryProvider>
      ) : (
        landingpage
      )}
    </>
  );
};

export default MainLayout;
