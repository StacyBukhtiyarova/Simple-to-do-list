import { onCreateTask } from './createTask.js';
import { onToggleTask } from './updateTask.js';
import { deleteTask, getTasksList } from './serverExchange.js';
import { renderTasks } from './renderer.js';
import { setItem, getItem } from './storage.js';
var onDeleteTask = function onDeleteTask(e) {
  var taskId = e.target.dataset.id;
  deleteTask(taskId).then(function () {
    return getTasksList();
  }).then(function (newTasksList) {
    setItem('tasksList', newTasksList);
    renderTasks();
  });
};
export var onListClick = function onListClick(e) {
  var isCheckbox = e.target.classList.contains('list__item-checkbox');
  if (isCheckbox) {
    onToggleTask(e);
    return;
  }
  var isDeleteButton = e.target.classList.contains('list__item-delete-btn');
  if (isDeleteButton) {
    onDeleteTask(e);
  }
};
export var initTodoListHandlers = function initTodoListHandlers() {
  var createBtnElem = document.querySelector('.create-task-btn');
  createBtnElem.addEventListener('click', onCreateTask);
  var todoListElem = document.querySelector('.list');
  todoListElem.addEventListener('click', onListClick);
};