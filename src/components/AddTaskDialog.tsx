import "./AddTaskDialog.css";
import { createPortal } from "react-dom";
import Button from "./Button";
import Input from "./Input";
import InputSelect from "./InputSelect";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import type { TaskModel } from "../models/TaskModel";
import { v4 } from "uuid";
import { showMessage } from "../adapters/showMessage";
import { LoaderIcon } from "../assets/icons";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormValues } from "../models/FormValues";

interface AddTaskDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  onSuccess: (newTask: TaskModel) => void;
}

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSuccess,
}: AddTaskDialogProps) => {
  const nodeRef = useRef<null | HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const handleAddTask: SubmitHandler<FormValues> = async (data) => {
    showMessage.dismiss();

    const title = data?.title;
    const time = data?.time;
    const description = data?.description;

    const newTask = {
      id: v4(),
      title,
      time,
      status: "not_started",
      description,
    };

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) {
      showMessage.error("Erro ao criar tarefa");
    }

    onSuccess(newTask);
    handleClose();
    reset({
      title: "",
      time: "morning",
      description: "",
    });
  };

  const handleResetFields = () => {
    handleClose();
    reset({
      title: "",
      time: "morning",
      description: "",
    });
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      classNames="task-dialog"
      timeout={500}
      unmountOnExit
    >
      <>
        {createPortal(
          <div
            className="fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center backdrop-blur-xs"
            ref={nodeRef}
          >
            <form
              onSubmit={handleSubmit(handleAddTask)}
              className="w-[376px] space-y-4 rounded-xl bg-white p-5"
            >
              <div className="space-y-1 text-center">
                <h2 className="text-dark-blue text-xl font-semibold">
                  Nova Tarefa
                </h2>
                <p className="text-text-gray text-sm">
                  Insira as informações abaixo
                </p>
              </div>
              <Input
                title="Título"
                placeholder="Título da tarefa"
                id="title"
                disabled={isSubmitting}
                {...register("title", {
                  required: "O título é obrigatório",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O campo não pode ser vazio";
                    }
                  },
                  minLength: {
                    value: 3,
                    message: "O título deve ter no mínimo 3 caracteres",
                  },
                })}
                errorMessage={errors.title?.message}
              />
              <InputSelect
                title="Horário"
                id="time"
                disabled={isSubmitting}
                {...register("time", {
                  required: "O horário é obrigatório",

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
                placeholder="Descrição da tarefa"
                id="desc"
                disabled={isSubmitting}
                {...register("description", {
                  required: "A descrição é obrigatória",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O campo não pode ser vazio";
                    }
                  },
                })}
                errorMessage={errors.description?.message}
              />
              <div className="flex items-center gap-3">
                <Button
                  color="secondary"
                  size="large"
                  width="full"
                  disabled={isSubmitting}
                  onClick={handleResetFields}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  size="large"
                  width="full"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting && <LoaderIcon className="animate-spin" />}
                  Salvar
                </Button>
              </div>
            </form>
          </div>,
          document.body
        )}
      </>
    </CSSTransition>
  );
};

export default AddTaskDialog;
