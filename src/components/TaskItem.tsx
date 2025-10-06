import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { type TaskModel } from "../models/TaskModel";
import { type DefaultColors } from "../models/TaskColors";
import Button from "./Button";
import { showMessage } from "../adapters/showMessage";
import { useState } from "react";

interface TaskItemProps {
  task: TaskModel;
  onSuccess: (taskId: string) => void;
  handleStatus: (taskId: string) => void;
}

const TaskItem = ({ task, onSuccess, handleStatus }: TaskItemProps) => {
  const [isLoading, setIsLoading] = useState(false);

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

  const onDeleteTask = async () => {
    setIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setIsLoading(false);
      showMessage.error("Erro ao deletar tarefa!");
      return;
    }

    setIsLoading(false);
    onSuccess(task.id);
  };

  return (
    <div
      className={`flex items-center justify-between rounded-md p-3 ${itemColors[task.status as keyof typeof itemColors]}`}
    >
      <div className="flex items-center gap-3">
        <label
          htmlFor={task.id}
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-md ${checkboxColors[task.status as keyof typeof checkboxColors]}`}
        >
          <input
            type="checkbox"
            id={task.id}
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
        <Button
          color="ghost"
          size="small"
          disabled={isLoading}
          onClick={onDeleteTask}
        >
          {isLoading ? (
            <LoaderIcon className="text-text-gray animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
        <a href="#" className="transition-all hover:opacity-75">
          <DetailsIcon className="text-dark-gray" />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
