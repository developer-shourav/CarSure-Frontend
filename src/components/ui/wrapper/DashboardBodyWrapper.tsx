import { ReactNode } from "react";

const DashboardBodyWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="w-full mt-5 mx-auto p-4 md:p-7 lg:p-8">{children}</div>;
};

export default DashboardBodyWrapper;
