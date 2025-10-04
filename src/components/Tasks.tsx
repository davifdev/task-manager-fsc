import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons";

import Header from "./Header";
import TaskItem from "./TaskItem";
import TaskSeparator from "./TaskSeparator";

const Tasks = () => {
  return (
    <section className="w-full space-y-6 px-9 py-16">
      <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />
      <div className="space-y-6 rounded-md bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator text="Manhã" icon={<SunIcon />} />
          <TaskItem />
          <TaskItem />
        </div>
        <div className="space-y-3">
          <TaskSeparator text="Tarde" icon={<CloudSunIcon />} />
          <TaskItem />
          <TaskItem />
        </div>
        <div className="space-y-3">
          <TaskSeparator text="Noite" icon={<MoonIcon />} />
          <TaskItem />
          <TaskItem />
        </div>
      </div>
    </section>
  );
};

export default Tasks;
