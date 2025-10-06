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
import { useEffect, useRef, useState } from "react";
import type { TaskModel } from "../models/TaskModel";
import { showMessage } from "../adapters/showMessage";

const TasksDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskModel>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const titleRef = useRef<null | HTMLInputElement>(null);
  const timeRef = useRef<null | HTMLSelectElement>(null);
  const descriptionRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const task = await response.json();
      setTask(task);
    };

    fetchTask();
  }, [taskId]);

  const backPage = () => {
    navigate(-1);
  };

  const handleUpdateTask = async () => {
    setIsLoading(true);
    const title = titleRef.current?.value;
    const time = timeRef.current?.value;
    const description = descriptionRef.current?.value;

    const taskUpdated = {
      title,
      time,
      description,
    };

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskUpdated),
    });

    if (!response.ok) {
      setIsLoading(false);
      showMessage.success("Erro ao atualizar tarefa");
      return;
    }

    const newTask = await response.json();
    setTask(newTask);

    setIsLoading(false);
    showMessage.success("Tarefa atualizada com sucesso");
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
          <Button size="small" color="danger">
            Deletar tarefa <TrashIcon />
          </Button>
        </div>
      </div>
      <div className="space-y-6 rounded-md bg-white p-6">
        <Input
          title="Título"
          defaultValue={task?.title}
          ref={titleRef}
          disabled={isLoading}
        />
        <InputSelect
          title="Horário"
          defaultValue={task?.time}
          ref={timeRef}
          disabled={isLoading}
        />
        <Input
          title="Descrição"
          defaultValue={task?.description}
          ref={descriptionRef}
          disabled={isLoading}
        />
      </div>
      <div className="flex justify-end">
        <Button
          color="primary"
          size="large"
          onClick={handleUpdateTask}
          disabled={isLoading}
        >
          {isLoading && <LoaderIcon className="animate-spin" />}
          Salvar
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default TasksDetails;
