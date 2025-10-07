import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons";
import SectionWrapper from "./SectionWrapper";
import Button from "./Button";
import Input from "./Input";
import InputSelect from "./InputSelect";
import { showMessage } from "../adapters/showMessage";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormValues } from "../models/FormValues";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TaskModel } from "../models/TaskModel";

const TasksDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  });

  const { data: task } = useQuery({
    queryKey: ["taskId", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const task = await response.json();
      reset({
        title: task.title,
        time: task.time,
        description: task.description,
      });
      return task;
    },
  });

  const backPage = () => {
    navigate(-1);
  };

  const queryClient = useQueryClient();
  const { mutate: updateTask } = useMutation({
    mutationKey: ["uptade-task", taskId],
    mutationFn: async (taskUpdated: FormValues) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskUpdated),
      });

      if (!response.ok) {
        throw Error();
      }

      const newTask = await response.json();
      return newTask;
    },
  });

  const handleUpdateTask: SubmitHandler<FormValues> = async (data) => {
    const title = data.title;
    const time = data.time;
    const description = data.description;

    const taskUpdated = {
      title,
      time,
      description,
    };

    updateTask(taskUpdated, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["taskId", taskId] });
        showMessage.success("Tarefa atualizada com sucesso");
      },
      onError: () => {
        showMessage.error("Não foi possível atualizar a tarefa");
      },
    });
  };

  const { mutate: deleteTask } = useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw Error();
      }
      const deleteTask = await response.json();

      queryClient.setQueryData(["my-tasks"], (oldTasks: TaskModel[]) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deleteTask.id);
      });
    },
  });

  const handleDelete = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        showMessage.success("Tarefa deletada com sucesso");
        backPage();
      },
      onError: () => {
        showMessage.error("Erro ao deletar tarefa");
      },
    });
  };

  return (
    <SectionWrapper>
      <div className="flex items-end justify-between">
        <div className="space-y-6">
          <button
            className="bg-primary flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all hover:opacity-70"
            onClick={backPage}
          >
            <ArrowLeftIcon />
          </button>
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Link
                to="/"
                className="text-text-gray text-xs transition-all hover:opacity-70"
              >
                Minhas Tarefas
              </Link>
              <span>
                <ChevronRightIcon className="text-text-gray" />
              </span>
              <span className="text-primary text-xs font-semibold">
                {task?.title}
              </span>
            </div>
            <h2 className="text-dark-blue text-xl font-semibold">
              {task?.title}
            </h2>
          </div>
        </div>
        <div>
          <Button
            size="small"
            color="danger"
            disabled={isSubmitting}
            onClick={handleDelete}
          >
            Deletar tarefa <TrashIcon />
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleUpdateTask)}>
        <div className="space-y-6 rounded-md bg-white p-6">
          <Input
            title="Título"
            defaultValue={task?.title}
            disabled={isSubmitting}
            {...register("title", {
              required: "O Título é obrigatório",
              validate: (value) => {
                if (!value.trim()) {
                  return "O campo não pode ser vazio";
                }
              },
            })}
            errorMessage={errors.title?.message}
          />
          <InputSelect
            title="Horário"
            defaultValue={task?.time}
            disabled={isSubmitting}
            {...register("time", {
              required: "O Horário é obrigatório",
              validate: (value) => {
                if (!value.trim()) {
                  return "O campo não pode ser vazio";
                }
              },
            })}
            errorMessage={errors.time?.message}
          />
          <Input
            title="Descrição"
            defaultValue={task?.description}
            disabled={isSubmitting}
            {...register("description", {
              required: "A Descrição é obrigatória",
              validate: (value) => {
                if (!value.trim()) {
                  return "O campo não pode ser vazio";
                }
              },
            })}
            errorMessage={errors.description?.message}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            color="primary"
            size="large"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </form>
    </SectionWrapper>
  );
};

export default TasksDetails;
