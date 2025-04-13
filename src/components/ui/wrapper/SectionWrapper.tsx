import { ReactNode } from "react";

const SectionWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[1233px] mx-auto px-4">{children}</div>;
};

export default SectionWrapper;
