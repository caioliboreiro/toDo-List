import { addProject } from "../controller/projectController.js";
import { renderProjects } from "./projectView.js";
import { renderTasks } from "./taskView.js";

export function createAddProjectModalViewEventListeners() {
  const addProjectModal = document.querySelector(".add-project-modal");
  const closeAddProjectBtn = document.querySelector(".close-add-project-btn");
  const submitProjectBtn = document.querySelector(".submit-project-btn");

  closeAddProjectBtn.addEventListener("click", () => {
    addProjectModal.close();
  });

  submitProjectBtn.addEventListener("click", () => {
    let newProjectNameInput = document.querySelector("#new-project-name");
    if (newProjectNameInput.value !== "") {
      addProject(newProjectNameInput.value);
      renderProjects(newProjectNameInput.value);
      renderTasks(newProjectNameInput.value);
      newProjectNameInput.value = "";
      addProjectModal.close();
    }
  });
}

export function showAddProjectModal() {
  const addProjectModal = document.querySelector(".add-project-modal");
  addProjectModal.showModal();
}
