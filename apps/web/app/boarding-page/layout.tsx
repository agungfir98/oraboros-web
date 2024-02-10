import { Theme } from "@radix-ui/themes";
import React from "react";
import Navbar from "~/app/boarding-page/components/nav";
import { ReactQueryProvider } from "~/components/ReactQueryProvider";
import CustomToaster from "~/components/toaster";
import { SessionProvider } from "~/components/sessionProvider";

const BoardingLayoutPage: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  return (
    <Theme>
      <CustomToaster />
      <ReactQueryProvider>
        <SessionProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
          </div>
        </SessionProvider>
      </ReactQueryProvider>
    </Theme>
  );
};

export default BoardingLayoutPage;
