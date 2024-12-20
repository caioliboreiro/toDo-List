import {
  getProjectNames,
  getSelectedProjectName,
} from "../controller/projectController";
import { renderProjects } from "./projectView";
import { renderTasks } from "./taskView";
import { editTask } from "../controller/taskController";

let oldTaskTitle;
export function createEditTaskModalViewEventListeners() {
  const editModal = document.querySelector(".edit-modal");
  const closeEditTaskBtn = document.querySelector(".close-edit-task-btn");
  const editTaskBtn = document.querySelector(".edit-task-btn");
  const editTaskNameBtn = document.querySelector(".edit-modal-task-name-btn");
  const editTaskDescBtn = document.querySelector(".edit-modal-task-desc-btn");
  const editModalTaskName = document.querySelector(".edit-modal-task-name");
  const editModalTaskDesc = document.querySelector(".edit-modal-task-desc");

  closeEditTaskBtn.addEventListener("click", () => {
    editModal.close();
  });

  editTaskNameBtn.addEventListener("click", () => {
    if (editTaskNameBtn.textContent == "EDIT") {
      editModalTaskName.removeAttribute("readonly");
      editModalTaskName.focus();
      editModalTaskName.style.color = "#a970ff";
      editTaskNameBtn.textContent = "SAVE";
    } else {
      editModalTaskName.style.color = "white";
      editModalTaskName.setAttribute("readonly", "readonly");
      editTaskNameBtn.textContent = "EDIT";
    }
  });

  editTaskDescBtn.addEventListener("click", () => {
    if (editTaskDescBtn.textContent == "EDIT") {
      editModalTaskDesc.removeAttribute("readonly");
      editModalTaskDesc.focus();
      editModalTaskDesc.style.color = "#a970ff";
      editTaskDescBtn.textContent = "SAVE";
    } else {
      editModalTaskDesc.style.color = "lightgray";
      editModalTaskDesc.setAttribute("readonly", "readonly");
      editTaskDescBtn.textContent = "EDIT";
    }
  });

  editTaskBtn.addEventListener("click", () => {
    const editModalTaskName = document.querySelector(".edit-modal-task-name");
    const editModalTaskDesc = document.querySelector(".edit-modal-task-desc");
    const projectInput = document.querySelector("#edit-project-input");
    const dueDateInput = document.querySelector("#due-date-input");
    const editPriorityInput = document.querySelector("#edit-priority-input");

    editTask(
      oldTaskTitle,
      editModalTaskName.value,
      editModalTaskDesc.value,
      dueDateInput.value,
      editPriorityInput.value
    );
    editModal.close();
    renderProjects(getSelectedProjectName());
    renderTasks(getSelectedProjectName());
  });
}

export function showEditTaskModal(projectName, task) {
  const modalHeading = document.querySelector(".edit-modal-heading");
  const editModalTaskName = document.querySelector(".edit-modal-task-name");
  const editModalTaskDesc = document.querySelector(".edit-modal-task-desc");
  const projectInput = document.querySelector("#edit-project-input");
  const dueDateInput = document.querySelector("#due-date-input");
  const editPriorityInput = document.querySelector("#edit-priority-input");

  modalHeading.textContent = projectName;
  editModalTaskName.value = task.title;
  oldTaskTitle = task.title;

  editModalTaskDesc.value = task.description;

  if (task.description == "") {
    editModalTaskDesc.textContent = "[Description Empty]";
  }

  projectInput.innerHTML = "";

  for (let projectName of getProjectNames()) {
    const option = document.createElement("option");
    option.value = projectName;
    option.textContent = projectName;

    projectInput.appendChild(option);
  }

  if (task.description == "") {
    editModalTaskDesc.value = "[Description Empty]";
  }

  dueDateInput.placeholder = task.dueDate;

  if (task.dueDate == "") {
    dueDateInput.placeholder = "mm/dd/yyyy";
  }

  editPriorityInput.value = task.priority;

  const editModal = document.querySelector(".edit-modal");
  editModal.showModal();
}
