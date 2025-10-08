export const tasksQueryKeys = {
  getAll: () => ["my-tasks"],
  getOne: (taskId?: string) => ["my-tasks", taskId],
};
