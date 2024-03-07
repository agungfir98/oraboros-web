"use server";
import React from "react";
import ProfileProvider from "~/components/ProfileProvider";
import { ReactQueryProvider } from "~/components/ReactQueryProvider";
import userSession from "~/lib/actions/guard";
import { SessionWrapper } from "~/components/sessionWrapper";
import CustomToaster from "~/components/toaster";
import DashboardNavigation from "~/components/DashboardNavigation";

const MainLayout: React.FC<{
  children: React.ReactNode;
  landingpage: React.ReactNode;
}> = async ({ children, landingpage }) => {
  const { data } = await userSession();

  return (
    <>
      {data.session ? (
        <ReactQueryProvider>
          <CustomToaster />
          <SessionWrapper>
            <ProfileProvider>
              <DashboardNavigation />
              <div className="container mx-auto">{children}</div>
            </ProfileProvider>
          </SessionWrapper>
        </ReactQueryProvider>
      ) : (
        landingpage
      )}
    </>
  );
};

export default MainLayout;
