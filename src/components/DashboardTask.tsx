import type { ReactNode } from "react";

interface DashboardTaskProps {
  mainText: string;
  secondaryText?: number;
  icon: ReactNode;
}

const DashboardTask = ({
  mainText,
  secondaryText,
  icon,
}: DashboardTaskProps) => {
  return (
    <div className="flex h-[149px] items-center justify-center rounded-xl bg-white">
      <div className="flex flex-col gap-1.5">
        <div className="text-primary flex items-center justify-center gap-2">
          {icon}
          <p className="text-dark-blue text-3xl font-semibold">
            {secondaryText}
          </p>
        </div>
        <p className="text-dark-blue text-base">{mainText}</p>
      </div>
    </div>
  );
};

export default DashboardTask;
