import type { ReactNode } from "react";
import { Toaster } from "sonner";

interface MessageContainerProps {
  children: ReactNode;
}

const MessageContainer = ({ children }: MessageContainerProps) => {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            color: "#35383e",
          },
        }}
      />
      {children}
    </>
  );
};

export default MessageContainer;
