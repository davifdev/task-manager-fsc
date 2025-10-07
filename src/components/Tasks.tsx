import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons";
import Header from "./Header";
import TaskItem from "./TaskItem";
import TaskSeparator from "./TaskSeparator";
import type { TaskModel } from "../models/TaskModel";

import SectionWrapper from "./SectionWrapper";
import { useQuery } from "@tanstack/react-query";

const Tasks = () => {
  const { data: tasks } = useQuery<TaskModel[]>({
    queryKey: ["my-tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const tasks = await response.json();
      if (!response.ok) {
        throw Error();
      }
      return tasks;
    },
  });

  const tasksMorning = tasks?.filter((task) => task.time === "morning");
  const tasksAfternoon = tasks?.filter((task) => task.time === "afternoon");
  const tasksEvening = tasks?.filter((task) => task.time === "evening");

  return (
    <SectionWrapper>
      <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />
      <div className="space-y-6 rounded-md bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator text="Manhã" icon={<SunIcon />} />
          {tasksMorning?.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSeparator text="Tarde" icon={<CloudSunIcon />} />
          {tasksAfternoon?.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSeparator text="Noite" icon={<MoonIcon />} />
          {tasksEvening?.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Tasks;
