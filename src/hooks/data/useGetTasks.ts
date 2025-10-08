import { useQuery } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";
import { tasksQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useGetTasks = () => {
  return useQuery<TaskModel[]>({
    queryKey: tasksQueryKeys.getAll(),
    queryFn: async () => {
      const { data: task } = await api.get("/tasks");
      return task;
    },
  });
};
