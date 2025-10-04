import { AddIcon, TrashIcon } from "../assets/icons";

const Tasks = () => {
  return (
    <section className="py-16 px-9 w-full space-y-6">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <span className="text-sm font-semibold text-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold text-dark-blue">
            Minhas Tarefas
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2">
            Limpar tarefas <TrashIcon />
          </button>
          <button className="flex items-center gap-2">
            Nova tarefa <AddIcon />
          </button>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Tasks;
