import { createTask } from "../model/task.js";
import { getSelectedProject, searchProject } from "./projectController.js";
import { getBuffer } from "../model/localStorage.js";

export function addTask(
  title,
  description,
  dueDate,
  priority,
  isDone,
  projectName
) {
  const project = getBuffer()[searchProject(projectName)];

  project.tasks.push(createTask(title, description, dueDate, priority, isDone));
}

export function editTask(oldTaskTitle, title, description, dueDate, priority) {
  const selectedProject = getSelectedProject();
  const task = selectedProject.tasks[searchTask(selectedProject, oldTaskTitle)];

  console.log(oldTaskTitle);
  task.title = title;
  task.description = description;
  task.dueDate = dueDate;
  task.priority = priority;
}

export function toggleTask(taskTitle) {
  const selectedProject = getSelectedProject();

  for (let task of selectedProject.tasks) {
    if (task.title == taskTitle) {
      task.isDone = !task.isDone;
    }
  }
}

export function removeTask(taskTitle) {
  const selectedProject = getSelectedProject();

  selectedProject.tasks.splice(searchTask(selectedProject, taskTitle), 1);
}

export function searchTask(selectedProject, taskTitle) {
  let index = 0;
  for (let task of selectedProject.tasks) {
    if (task.title == taskTitle) {
      return index;
    }
    index++;
  }
}

export function getTasks(projectName) {
  return getBuffer()[searchProject(projectName)].tasks;
}
