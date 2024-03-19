import React, { PropsWithChildren, Suspense } from "react";
import MainLoading from "./loading";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Suspense fallback={<MainLoading />}>{children}</Suspense>;
};

export default MainLayout;
