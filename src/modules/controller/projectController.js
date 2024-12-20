import { createProject } from "../model/project.js";
import { getBuffer } from "../model/localStorage.js";

export function addProject(name) {
  getBuffer().push(createProject(name));
}

export function changeNameProject(oldName, newName) {
  getBuffer()[searchProject(oldName)].name = newName;
}

export function removeProject(projectName) {
  getBuffer().splice(searchProject(projectName), 1);
}

export function searchProject(projectName) {
  let index = 0;
  for (let item of getBuffer()) {
    if (item.name == projectName) {
      return index;
    }
    index++;
  }

  return null;
}

export function getProjectNames() {
  const names = [];

  for (let item of getBuffer()) {
    names.push(item.name);
  }

  return names;
}

export function getSelectedProject() {
  const collection = document.querySelector(".user-projects").children;

  for (let i = 0; i < collection.length; i++) {
    if (collection[i].id == "selected") {
      return getBuffer()[searchProject(collection[i].firstChild.value)];
    }
  }
}

export function getSelectedProjectName() {
  if (getSelectedProject() == undefined) {
    return "";
  }
  return getSelectedProject().name;
}
