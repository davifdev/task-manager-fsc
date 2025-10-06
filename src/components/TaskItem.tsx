import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { type TaskModel } from "../models/TaskModel";
import { type DefaultColors } from "../models/TaskColors";
import Button from "./Button";

interface TaskItemProps {
  task: TaskModel;
  handleDelete: (taskId: string) => void;
  handleStatus: (taskId: string) => void;
}
const TaskItem = ({ task, handleDelete, handleStatus }: TaskItemProps) => {
  const itemColors: DefaultColors = {
    done: "bg-[var(--primary-opacity)]",
    in_progress: "bg-[var(--process-opacity)]",
    not_started: "bg-[var(--dark-blue-opacity)]",
  } as const;

  const checkboxColors: DefaultColors = {
    done: "bg-primary",
    in_progress: "bg-process",
    not_started: "bg-[var(--dark-blue-opacity)]",
  } as const;

  const textColors: DefaultColors = {
    done: "text-primary",
    in_progress: "text-process",
    not_started: "text-dark-blue",
  } as const;

  return (
    <div
      className={`flex items-center justify-between rounded-md p-3 ${itemColors[task.status as keyof typeof itemColors]}`}
    >
      <div className="flex items-center gap-3">
        <label
          htmlFor="status"
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-md ${checkboxColors[task.status as keyof typeof checkboxColors]}`}
        >
          <input
            type="checkbox"
            id="status"
            checked={task.status === "done"}
            className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
            onChange={() => handleStatus(task.id)}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>
        <p
          className={`text-sm ${textColors[task.status as keyof typeof textColors]}`}
        >
          {task.title}
        </p>
      </div>
      <div className="flex items-center">
        <Button color="ghost" onClick={() => handleDelete(task.id)}>
          <TrashIcon />
        </Button>
        <a href="#">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
