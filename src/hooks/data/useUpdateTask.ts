import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";
import { taskMutationKeys } from "../../keys/mutations";
import { tasksQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useUpdateTask = (taskId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data: Partial<TaskModel>) => {
      const { data: taskUpdated } = await api.patch(`/tasks/${taskId}`, {
        title: data?.title?.trim(),
        description: data?.description?.trim(),
        time: data?.time,
        status: data?.status,
      });

      queryClient.setQueryData(
        tasksQueryKeys.getAll(),
        (oldTasks: TaskModel[]) => {
          return oldTasks.map((oldTask) => {
            if (oldTask.id === taskId) {
              return taskUpdated;
            }
            return oldTask;
          });
        }
      );

      return taskUpdated;
    },

    onSuccess: (taskUpdated) => {
      queryClient.setQueryData(tasksQueryKeys.getOne(taskId), taskUpdated);
    },
  });
};
