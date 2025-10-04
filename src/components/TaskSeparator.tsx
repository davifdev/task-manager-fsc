import type { ReactNode } from "react";

interface TaskSeparatorProps {
  text: string;
  icon: ReactNode;
}

const TaskSeparator = ({ text, icon }: TaskSeparatorProps) => {
  return (
    <div className="border-b-border-gray border-b pb-1.5">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-text-gray text-sm font-semibold">{text}</span>
      </div>
    </div>
  );
};

export default TaskSeparator;
