import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";
import { taskMutationKeys } from "../../keys/mutations";
import { tasksQueryKeys } from "../../keys/queries";

export const useUpdateTask = (taskId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data: Partial<TaskModel>) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data?.title?.trim(),
          description: data?.description?.trim(),
          time: data?.time,
          status: data?.status,
        }),
      });

      if (!response.ok) {
        throw Error();
      }

      const taskUpdated = await response.json();

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
