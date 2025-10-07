import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
}
const SectionWrapper = ({ children }: SectionWrapperProps) => {
  return <section className="w-full space-y-6 px-9 py-16">{children}</section>;
};

export default SectionWrapper;
