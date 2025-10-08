import { useQuery } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";
import type { FormValues } from "../../models/FormValues";
import type { TaskModel } from "../../models/TaskModel";
import { tasksQueryKeys } from "../../keys/queries";

export const useGetTask = (
  reset?: UseFormReset<FormValues>,
  taskId?: string
) => {
  return useQuery<TaskModel>({
    queryKey: tasksQueryKeys.getOne(taskId),
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const task = await response.json();
      if (!reset) return;
      reset({
        title: task.title,
        time: task.time,
        description: task.description,
      });
      return task;
    },
  });
};
