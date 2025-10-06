import type { ComponentProps } from "react";
import LabelText from "./LabelText";

type InputAttributes = ComponentProps<"input">;

interface InputProps extends InputAttributes {
  title?: string;
}

const Input = ({ title, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <LabelText id={props.id} title={title} />
      <input
        type="text"
        {...props}
        className="border-border-gray rounded-xl border p-3 outline-none"
      />
    </div>
  );
};

export default Input;
