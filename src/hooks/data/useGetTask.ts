import { useQuery } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";
import { tasksQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useGetTask = (
  onSuccess: (task: TaskModel) => void,
  taskId?: string
) => {
  return useQuery<TaskModel>({
    queryKey: tasksQueryKeys.getOne(taskId),
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`);
      onSuccess(task);
      return task;
    },
  });
};
