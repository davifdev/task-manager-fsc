export const taskMutationKeys = {
  add: (taskId?: string) => ["add-task", taskId],
  update: (taskId?: string) => ["update-task", taskId],
  delete: (taskId?: string) => ["delete-task", taskId],
};
