import type { ComponentProps } from "react";
import LabelText from "./LabelText";

type InputAttributes = ComponentProps<"select">;

interface InputSelectProps extends InputAttributes {
  title?: string;
}

const InputSelect = ({ title, ...props }: InputSelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <LabelText id={props.id} title={title} />
      <select
        {...props}
        className="border-border-gray rounded-xl border p-3 outline-none"
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  );
};

export default InputSelect;
