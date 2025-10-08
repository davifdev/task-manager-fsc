import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-task"],
    mutationFn: async (newTask: TaskModel) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw Error();
      }
      const createdTask = await response.json();

      queryClient.setQueryData(["my-tasks"], (oldTasks: TaskModel[]) => {
        return [...oldTasks, createdTask];
      });
    },
  });
};
