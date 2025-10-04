import { useEffect, useState } from "react";
import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons";

import Header from "./Header";
import TaskItem from "./TaskItem";
import TaskSeparator from "./TaskSeparator";
import type { TaskModel } from "../models/TaskModel";

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const tasks = await response.json();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const tasksMorning = tasks?.filter((task) => task.time === "morning");
  const tasksAfternoon = tasks?.filter((task) => task.time === "afternoon");
  const tasksEvening = tasks?.filter((task) => task.time === "evening");

  return (
    <section className="w-full space-y-6 px-9 py-16">
      <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />
      <div className="space-y-6 rounded-md bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator text="Manhã" icon={<SunIcon />} />
          {tasksMorning.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSeparator text="Tarde" icon={<CloudSunIcon />} />
          {tasksAfternoon.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSeparator text="Noite" icon={<MoonIcon />} />
          {tasksEvening.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tasks;
