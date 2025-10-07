import type { ReactNode } from "react";

interface ErrorMessageProps {
  children: ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <p className="text-danger text-left text-xs">{children}</p>;
};

export default ErrorMessage;
