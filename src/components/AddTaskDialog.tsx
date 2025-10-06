import "./AddTaskDialog.css";
import { createPortal } from "react-dom";
import Button from "./Button";
import Input from "./Input";
import InputSelect from "./InputSelect";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

interface AddTaskDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

const AddTaskDialog = ({ isOpen, handleClose }: AddTaskDialogProps) => {
  const nodeRef = useRef<null | HTMLDivElement>(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="task-dialog"
      unmountOnExit
    >
      <>
        {createPortal(
          <div
            className="fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center backdrop-blur-xs"
            ref={nodeRef}
          >
            <div className="w-[376px] space-y-4 rounded-xl bg-white p-5">
              <div className="space-y-1 text-center">
                <h2 className="text-dark-blue text-xl font-semibold">
                  Nova Tarefa
                </h2>
                <p className="text-text-gray text-sm">
                  Insira as informações abaixo
                </p>
              </div>
              <Input title="Título" placeholder="Título da tarefa" id="title" />
              <InputSelect title="Horário" id="time" />
              <Input
                title="Descrição"
                placeholder="Descrição da tarefa"
                id="desc"
              />
              <div className="flex items-center gap-3">
                <Button
                  color="secondary"
                  size="large"
                  width="full"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button color="primary" size="large" width="full">
                  Salvar
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    </CSSTransition>
  );
};

export default AddTaskDialog;
