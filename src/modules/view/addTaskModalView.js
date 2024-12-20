import { addTask } from "../controller/taskController";
import { renderTasks } from "./taskView";
import {
  getProjectNames,
  getSelectedProjectName,
} from "../controller/projectController";
import { renderProjects } from "./projectView";

export function createAddTaskModalViewEventListeners() {
  const addTaskModal = document.querySelector(".add-task-modal");
  const closeAddTaskBtn = document.querySelector(".close-add-task-btn");
  const submitTaskBtn = document.querySelector(".submit-task-btn");

  closeAddTaskBtn.addEventListener("click", () => {
    addTaskModal.close();
  });

  submitTaskBtn.addEventListener("click", () => {
    const taskTitleInput = document.querySelector("#task-title-input");
    const taskDescInput = document.querySelector("#task-desc-input");
    const addDueDateInput = document.querySelector("#add-due-date-input");
    const priorityInput = document.querySelector("#priority-input");
    const projectInput = document.querySelector("#project-input");

    if (taskTitleInput.value !== "" && projectInput.value !== "") {
      addTask(
        taskTitleInput.value,
        taskDescInput.value,
        addDueDateInput.value,
        priorityInput.value,
        false,
        projectInput.value
      );
      renderProjects(projectInput.value);
      renderTasks(projectInput.value);

      taskTitleInput.value = "";
      taskDescInput.value = "";
      addDueDateInput.value = "";
      addTaskModal.close();
    }
  });
}

export function showAddTaskModal() {
  const projectInput = document.querySelector("#project-input");
  projectInput.innerHTML = "";

  for (let projectName of getProjectNames()) {
    const option = document.createElement("option");
    option.value = projectName;
    option.textContent = projectName;

    projectInput.appendChild(option);
  }
  projectInput.value = getSelectedProjectName();

  const addTaskModal = document.querySelector(".add-task-modal");
  addTaskModal.showModal();
}
