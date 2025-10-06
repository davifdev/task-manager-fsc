import { useEffect, useState } from "react";
import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons";

import Header from "./Header";
import TaskItem from "./TaskItem";
import TaskSeparator from "./TaskSeparator";
import type { TaskModel } from "../models/TaskModel";
import { showMessage } from "../adapters/showMessage";
import SectionWrapper from "./SectionWrapper";

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const tasks = await response.json();
      setTasks(tasks);

      if (!response.ok) {
        console.log("Erro ao buscar tarefas!");
        return;
      }
    };

    fetchTasks();
  }, []);

  const tasksMorning = tasks?.filter((task) => task.time === "morning");
  const tasksAfternoon = tasks?.filter((task) => task.time === "afternoon");
  const tasksEvening = tasks?.filter((task) => task.time === "evening");

  const handleDeleteTask = async (taskId: string) => {
    showMessage.dismiss();
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);

    showMessage.success("Tarefa deletada com sucesso!");
  };

  const handleStatusTask = async (taskId: string) => {
    console.log(taskId);
    const newTask = tasks.map((task) => {
      if (task.id !== taskId) return task;
      showMessage.dismiss();

      if (task.status === "done") {
        showMessage.success("Tarefa reiniciada com sucesso");
        return { ...task, status: "not_started" };
      }

      if (task.status === "not_started") {
        showMessage.success("Tarefa iniciada com sucesso");
        return { ...task, status: "in_progress" };
      }

      if (task.status === "in_progress") {
        showMessage.success("Tarefa concluída com sucesso");
        return { ...task, status: "done" };
      }

      return task;
    });

    setTasks(newTask);

    const newTaskStatus = newTask.filter((task) => task.id === taskId)[0];

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskStatus),
    });
    if (!response.ok) {
      showMessage.error("Não foi possível atualizar status");
      return;
    }
  };

  const handleSubmitTask = async (newTask: TaskModel) => {
    showMessage.dismiss();
    setTasks([...tasks, newTask]);
    showMessage.success("Tarefa criada com sucesso");
  };

  return (
    <SectionWrapper>
      <Header
        title="Minhas Tarefas"
        subtitle="Minhas Tarefas"
        handleSubmit={handleSubmitTask}
      />
      <div className="space-y-6 rounded-md bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator text="Manhã" icon={<SunIcon />} />
          {tasksMorning.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              onSuccess={handleDeleteTask}
              handleStatus={handleStatusTask}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSeparator text="Tarde" icon={<CloudSunIcon />} />
          {tasksAfternoon.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              onSuccess={handleDeleteTask}
              handleStatus={handleStatusTask}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSeparator text="Noite" icon={<MoonIcon />} />
          {tasksEvening.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              onSuccess={handleDeleteTask}
              handleStatus={handleStatusTask}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Tasks;
