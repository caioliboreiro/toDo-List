import { showAddTaskModal } from "./addTaskModalView.js";
import {
  removeTask,
  getTasks,
  toggleTask,
} from "../controller/taskController.js";
import { showEditTaskModal } from "./editTaskModalView.js";
import deleteImgSrc from "../../assets/delete.svg";
import { getSelectedProjectName } from "../controller/projectController.js";

export function renderTasks(projectName) {
  const taskList = document.querySelector(".task-list");
  const taskHeading = document.querySelector(".project-name");
  const tasksWrapper = document.querySelector(".tasks-wrapper");

  if (taskHeading !== null) {
    taskHeading.remove();
  }

  const newTaskHeading = document.createElement("h1");
  newTaskHeading.classList.toggle("project-name");
  newTaskHeading.textContent = projectName;
  tasksWrapper.insertBefore(newTaskHeading, taskList);

  taskList.innerHTML = "";
  for (let task of getTasks(projectName)) {
    const taskTag = document.createElement("li");
    taskTag.classList.toggle("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    taskTag.appendChild(checkbox);

    checkbox.checked = task.isDone;

    checkbox.addEventListener("click", () => {
      toggleTask(task.title);
      renderTasks(projectName);
    });

    const taskInfo = document.createElement("div");
    taskInfo.classList.toggle("task-info");

    taskInfo.addEventListener("click", () => {
      showEditTaskModal(projectName, task);
    });

    const taskTitle = document.createElement("p");
    taskTitle.textContent = task.title;
    taskTitle.classList.toggle("task-title");

    if (task.priority == "high") {
      taskTitle.setAttribute("id", "high");
    } else if (task.priority == "medium") {
      taskTitle.setAttribute("id", "medium");
    } else {
      taskTitle.setAttribute("id", "low");
    }

    const taskDesc = document.createElement("p");
    taskDesc.textContent = task.description;
    taskDesc.classList.toggle("task-description");

    const taskDate = document.createElement("p");
    taskDate.textContent = task.dueDate;
    taskDate.classList.toggle("task-date");

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.toggle("delete-task-btn");
    deleteTaskBtn.setAttribute("hidden", true);

    const deleteImg = document.createElement("img");
    deleteImg.classList.toggle("delete-task-btn-img");
    deleteImg.src = deleteImgSrc;

    deleteTaskBtn.appendChild(deleteImg);

    taskInfo.appendChild(taskTitle);
    taskInfo.appendChild(taskDesc);
    taskInfo.appendChild(taskDate);
    taskTag.appendChild(taskInfo);
    taskTag.appendChild(deleteTaskBtn);

    taskTag.addEventListener("mouseover", () => {
      deleteTaskBtn.removeAttribute("hidden");
    });

    taskTag.addEventListener("mouseout", () => {
      deleteTaskBtn.setAttribute("hidden", true);
    });

    deleteTaskBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeTask(taskTitle);
      renderTasks(getSelectedProjectName());
    });

    taskList.appendChild(taskTag);
  }
}

export function createTaskViewEventListeners() {
  const addTaskBtn = document.querySelector(".add-task-wrapper");

  addTaskBtn.addEventListener("click", () => {
    showAddTaskModal();
  });
}
