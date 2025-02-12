export const commandLogs = [
  { command: "task-cli list", description: "List all tasks" },
  { command: "task-cli add <desc>", description: "Add a task" },
  { command: "task-cli update <id> <desc>", description: "Update a task" },
  { command: "task-cli delete <id>", description: "Delete a task" },
  {
    command: "task-cli mark-in-progress <id>",
    description: "Mark a task as in-progress",
  },
  {
    command: "task-cli mark-done <id>",
    description: "Mark a task as done",
  },
  { command: "task-cli help", description: "List all available commands" },
];

export const dateTimeFormat = () => {
  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "medium",
    dateStyle: "short",
  }).format();
};
