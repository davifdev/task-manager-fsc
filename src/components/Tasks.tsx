import { AddIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";

const Tasks = () => {
  return (
    <section className="w-full space-y-6 px-9 py-16">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <span className="text-primary text-sm font-semibold">
            Minhas Tarefas
          </span>
          <h2 className="text-dark-blue text-xl font-semibold">
            Minhas Tarefas
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar tarefas <TrashIcon />
          </Button>
          <Button color="primary">
            Nova tarefa <AddIcon />
          </Button>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Tasks;
