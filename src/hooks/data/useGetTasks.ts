import { useQuery } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";

export const useGetTasks = () => {
  return useQuery<TaskModel[]>({
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
};
