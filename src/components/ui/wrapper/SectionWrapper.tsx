import { ReactNode } from "react";

const SectionWrapper = ({ children }: { children: ReactNode }) => {
  return <section className="max-w-[1233px] mx-auto px-4 w-full py-8 lg:py-10  xl:py-12">{children}</section>;
};

export default SectionWrapper;
