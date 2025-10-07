import type { ComponentProps } from "react";
import LabelText from "./LabelText";
import ErrorMessage from "./ErrorMessage";

type InputAttributes = ComponentProps<"input">;

interface InputProps extends InputAttributes {
  title?: string;
  errorMessage?: string;
}

const Input = ({ title, errorMessage, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <LabelText id={props.id} title={title} />
      <input
        type="text"
        {...props}
        className="border-border-gray rounded-xl border p-3 outline-none"
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default Input;
