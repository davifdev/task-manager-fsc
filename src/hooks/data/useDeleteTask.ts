import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";

export const useDeleteTask = (taskId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw Error();
      }
      queryClient.setQueryData(["my-tasks"], (oldTasks: TaskModel[]) => {
        return oldTasks.filter((oldTask) => oldTask.id !== taskId);
      });
    },
  });
};
