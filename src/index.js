import "./style.css";
import { write, read, getBuffer } from "./modules/model/localStorage.js";
import { renderProjects } from "./modules/view/projectView.js";
import { renderTasks } from "./modules/view/taskView.js";
import { createProjectViewEventListeners } from "./modules/view/projectView.js";
import { createTaskViewEventListeners } from "./modules/view/taskView.js";
import { createAddProjectModalViewEventListeners } from "./modules/view/addProjectModalView.js";
import { createAddTaskModalViewEventListeners } from "./modules/view/addTaskModalView.js";
import { createEditTaskModalViewEventListeners } from "./modules/view/editTaskModalView.js";

read();

if (getBuffer().length != 0) {
  renderProjects(getBuffer()[0].name);
  renderTasks(getBuffer()[0].name);
}

createProjectViewEventListeners();
createTaskViewEventListeners();
createAddProjectModalViewEventListeners();
createAddTaskModalViewEventListeners();
createEditTaskModalViewEventListeners();
