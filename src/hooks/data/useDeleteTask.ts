import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";
import { taskMutationKeys } from "../../keys/mutations";
import { tasksQueryKeys } from "../../keys/queries";

export const useDeleteTask = (taskId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw Error();
      }
      queryClient.setQueryData(
        tasksQueryKeys.getAll(),
        (oldTasks: TaskModel[]) => {
          return oldTasks.filter((oldTask) => oldTask.id !== taskId);
        }
      );
    },
  });
};
