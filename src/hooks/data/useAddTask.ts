import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskModel } from "../../models/TaskModel";
import { taskMutationKeys } from "../../keys/mutations";
import { tasksQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (newTask: TaskModel) => {
      const { data: createdTask } = await api.post("/tasks", newTask);
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(
        tasksQueryKeys.getAll(),
        (oldTasks: TaskModel[]) => {
          return [...oldTasks, createdTask];
        }
      );
    },
  });
};
