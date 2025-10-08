import DashboardTask from "./DashboardTask";
import { LayoutListIcon, LoaderIcon, TasksIcon } from "../assets/icons";
import { useGetTasks } from "../hooks/data/useGetTasks";

const DashboardItems = () => {
  const { data: tasks } = useGetTasks();

  const tasksComplete = tasks?.filter((task) => task.status === "done");
  const tasksLoading = tasks?.filter((task) => task.status === "in_progress");
  const tasksNotStarted = tasks?.filter(
    (task) => task.status === "not_started"
  );

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardTask
        icon={<LayoutListIcon />}
        mainText="Tarefas disponíveis"
        secondaryText={tasks?.length}
      />
      <DashboardTask
        icon={<LoaderIcon />}
        mainText="Tarefas não iniciadas"
        secondaryText={tasksNotStarted?.length}
      />
      <DashboardTask
        icon={
          <LoaderIcon
            className={
              tasksLoading && tasksLoading.length >= 1 ? "animate-spin" : ""
            }
          />
        }
        mainText="Tarefas em andamento"
        secondaryText={tasksLoading?.length}
      />

      <DashboardTask
        icon={<TasksIcon />}
        mainText="Tarefas concluídas"
        secondaryText={tasksComplete?.length}
      />
    </div>
  );
};

export default DashboardItems;
