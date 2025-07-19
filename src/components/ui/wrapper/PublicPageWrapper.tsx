import { ReactNode } from "react";
//

const PublicPageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-[95vh]  mt-[62px]">
      {children}
    </div>
  );
};

export default PublicPageWrapper;
