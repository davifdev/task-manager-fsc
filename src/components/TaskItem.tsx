import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { type TaskModel } from "../models/TaskModel";
import { type DefaultColors } from "../models/TaskColors";
import Button from "./Button";
import { showMessage } from "../adapters/showMessage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteTask } from "../hooks/data/useDeleteTask";
import { useUpdateTask } from "../hooks/data/useUpdateTask";
interface TaskItemProps {
  task: TaskModel;
}

const TaskItem = ({ task }: TaskItemProps) => {
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

  const titleTasks: DefaultColors = {
    done: "Reiniciar tarefa",
    in_progress: "Concluir tarefa",
    not_started: "Iniciar tarefa",
  };

  const { mutate: deleteTask } = useDeleteTask(task.id);

  const handleDelete = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        showMessage.success("Tarefa deletada com sucesso");
      },
      onError: () => {
        showMessage.error("Erro ao deletar tarefa");
      },
    });

    setIsLoading(false);
  };

  const getNewStatus = () => {
    showMessage.dismiss();

    if (task.status === "done") {
      showMessage.success("Tarefa reiniciada com sucesso");
      return "not_started";
    }

    if (task.status === "not_started") {
      showMessage.success("Tarefa iniciada com sucesso");
      return "in_progress";
    }

    if (task.status === "in_progress") {
      showMessage.success("Tarefa concluída com sucesso");
      return "done";
    }

    return task.status;
  };

  const { mutate: uptadeTask } = useUpdateTask(task.id);

  const handleStatus = () => {
    uptadeTask(
      { status: getNewStatus() },
      {
        onError: () => {
          showMessage.error("Erro ao atualizar tarefa");
        },
      }
    );
  };

  return (
    <div
      className={`flex items-center justify-between rounded-md p-3 ${itemColors[task.status as keyof typeof itemColors]}`}
    >
      <div className="flex items-center gap-3">
        <label
          htmlFor={task.id}
          title={titleTasks[task.status as keyof typeof titleTasks]}
          aria-label={titleTasks[task.status as keyof typeof titleTasks]}
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-md ${checkboxColors[task.status as keyof typeof checkboxColors]} `}
        >
          <input
            type="checkbox"
            id={task.id}
            checked={task.status === "done"}
            className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
            onChange={handleStatus}
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
          aria-label="Excluir tarefa"
          title="Excluir tarefa"
          color="ghost"
          size="small"
          disabled={isLoading}
          onClick={handleDelete}
        >
          {isLoading ? (
            <LoaderIcon className="text-text-gray animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
        <Link
          to={`/tasks/${task.id}`}
          className="transition-all hover:opacity-75"
          aria-label="Ver detalhes"
          title="Ver detalhes"
        >
          <DetailsIcon className="text-dark-gray" />
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;
