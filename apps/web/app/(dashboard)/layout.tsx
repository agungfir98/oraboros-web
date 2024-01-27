import React from "react";
import userSession from "~/lib/actions/guard";

const MainLayout: React.FC<{
  children: React.ReactNode;
  landingpage: React.ReactNode;
}> = async ({ children, landingpage }) => {
  const { data } = await userSession();
  return <div>{data.session ? children : landingpage}</div>;
};

export default MainLayout;
