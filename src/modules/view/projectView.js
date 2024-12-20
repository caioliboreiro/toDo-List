import { getBuffer } from "../model/localStorage.js";
import {
  removeProject,
  getProjectNames,
  changeNameProject,
} from "../controller/projectController.js";
import { renderTasks } from "./taskView.js";
import { showAddProjectModal } from "./addProjectModalView.js";
import editImgSrc from "../../assets/edit.svg";
import confirmImgSrc from "../../assets/confirm.svg";
import deleteImgSrc from "../../assets/delete.svg";
import { write } from "../model/localStorage.js";

export function renderProjects(selectedProjectName) {
  const userProjects = document.querySelector(".user-projects");
  userProjects.innerHTML = "";

  for (let projectName of getProjectNames()) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.toggle("project-container");

    const listItem = document.createElement("input");
    listItem.value = projectName;
    listItem.setAttribute("readonly", "readonly");
    projectContainer.appendChild(listItem);

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.classList.toggle("delete-project-btn");
    deleteProjectBtn.setAttribute("hidden", true);

    const deleteImg = document.createElement("img");
    deleteImg.classList.toggle("delete-project-btn-img");
    deleteImg.src = deleteImgSrc;

    deleteProjectBtn.appendChild(deleteImg);

    const editProjectBtn = document.createElement("button");
    editProjectBtn.classList.toggle("edit-project-btn");
    editProjectBtn.setAttribute("hidden", true);

    const editImg = document.createElement("img");
    editImg.classList.toggle("edit-project-btn-img");
    editImg.src = editImgSrc;

    editProjectBtn.appendChild(editImg);

    projectContainer.appendChild(deleteProjectBtn);
    projectContainer.appendChild(editProjectBtn);

    if (projectName === selectedProjectName) {
      projectContainer.setAttribute("id", "selected");
    }

    projectContainer.addEventListener("click", () => {
      renderProjects(projectContainer.firstChild.value);
      renderTasks(projectContainer.firstChild.value);
    });

    projectContainer.addEventListener("mouseover", () => {
      deleteProjectBtn.removeAttribute("hidden");
      editProjectBtn.removeAttribute("hidden");
    });

    projectContainer.addEventListener("mouseout", () => {
      deleteProjectBtn.setAttribute("hidden", true);
      editProjectBtn.setAttribute("hidden", true);
    });

    deleteProjectBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeProject(listItem.value);

      if (getBuffer().length != 0) {
        renderProjects(getBuffer()[0].name);
        renderTasks(getBuffer()[0].name);
      } else {
        const taskList = document.querySelector(".task-list");
        const projectName = document.querySelector(".project-name");
        userProjects.innerHTML = "";
        taskList.innerHTML = "";
        projectName.remove();
      }
    });

    let oldName;
    editProjectBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (editImg.src == editImgSrc) {
        oldName = listItem.value;
        listItem.removeAttribute("readonly");
        listItem.focus();
        listItem.style.color = "#a970ff";
        editImg.src = confirmImgSrc;
      } else {
        listItem.style.color = "inherit";
        listItem.setAttribute("readonly", "readonly");
        editImg.src = editImgSrc;
        const newName = listItem.value;
        changeNameProject(oldName, newName);
        renderProjects(newName);
        renderTasks(newName);
      }
    });

    userProjects.appendChild(projectContainer);
  }
}

export function createProjectViewEventListeners() {
  const addProjectBtn = document.querySelector(".add-project-btn");
  const saveDataBtn = document.querySelector(".save-data-btn");

  addProjectBtn.addEventListener("click", () => {
    showAddProjectModal();
  });

  saveDataBtn.addEventListener("click", () => {
    write();
  });
}

export function changeSelectedProject(projectName) {
  const userProjects = document.querySelector(".user-projects");
  for (container of userProjects.children) {
    if (container.firstChild.value == projectName) {
      container.setAttribute("id", "selected");
    }
  }
}
