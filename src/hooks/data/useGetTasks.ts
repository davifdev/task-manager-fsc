import { useQuery } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";
import { tasksQueryKeys } from "../../keys/queries";

export const useGetTasks = () => {
  return useQuery<TaskModel[]>({
    queryKey: tasksQueryKeys.getAll(),
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
