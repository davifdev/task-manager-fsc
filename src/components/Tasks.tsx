import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons";
import Header from "./Header";
import TaskItem from "./TaskItem";
import TaskSeparator from "./TaskSeparator";
import SectionWrapper from "./SectionWrapper";
import { useGetTasks } from "../hooks/data/useGetTasks";

const Tasks = () => {
  const { data: tasks } = useGetTasks();

  const tasksMorning = tasks?.filter((task) => task.time === "morning");
  const tasksAfternoon = tasks?.filter((task) => task.time === "afternoon");
  const tasksEvening = tasks?.filter((task) => task.time === "evening");

  return (
    <SectionWrapper>
      <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />
      <div className="space-y-6 rounded-md bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator text="Manhã" icon={<SunIcon />} />
          {tasksMorning && tasksMorning.length <= 0 && (
            <p className="text-text-gray text-sm">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}
          {tasksMorning?.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSeparator text="Tarde" icon={<CloudSunIcon />} />
          {tasksMorning && tasksMorning.length <= 0 && (
            <p className="text-text-gray text-sm">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}
          {tasksAfternoon?.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSeparator text="Noite" icon={<MoonIcon />} />
          {tasksMorning && tasksMorning.length <= 0 && (
            <p className="text-text-gray text-sm">
              Nenhuma tarefa cadastrada para o período da noite.
            </p>
          )}
          {tasksEvening?.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Tasks;
