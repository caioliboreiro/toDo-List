function createTask(title, description, dueDate, priority, isDone) {
  return {
    title,
    description,
    dueDate,
    priority,
    isDone,
  };
}

export { createTask };
