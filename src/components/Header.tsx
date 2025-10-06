import { useState } from "react";
import { AddIcon, TrashIcon } from "../assets/icons";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";
import type { TaskModel } from "../models/TaskModel";

interface HeaderProps {
  title: string;
  subtitle: string;
  handleSubmit: (newTask: TaskModel) => void;
}

const Header = ({ title, subtitle, handleSubmit }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-end justify-between">
      <div className="space-y-2">
        <span className="text-primary text-sm font-semibold">{subtitle}</span>
        <h2 className="text-dark-blue text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button
          color="ghost"
          size="small"
          title="Excluir Tarefas"
          aria-label="Excluir Tarefas"
        >
          Limpar tarefas <TrashIcon />
        </Button>
        <Button
          color="primary"
          size="small"
          title="Criar Nova Tarefa"
          aria-label="Criar Nova Tarefa"
          onClick={() => setIsOpen(true)}
        >
          Nova tarefa <AddIcon />
        </Button>

        <AddTaskDialog
          isOpen={isOpen}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Header;
