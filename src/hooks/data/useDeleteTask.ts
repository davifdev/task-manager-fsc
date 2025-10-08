import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";
import { taskMutationKeys } from "../../keys/mutations";
import { tasksQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useDeleteTask = (taskId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deleteTask } = await api.delete(`tasks/${taskId}`);
      return deleteTask;
    },
    onSuccess: () => {
      queryClient.setQueryData(
        tasksQueryKeys.getAll(),
        (oldTasks: TaskModel[]) => {
          return oldTasks.filter((oldTask) => oldTask.id !== taskId);
        }
      );
    },
  });
};
