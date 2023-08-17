import { initTodoListHandlers } from './toDoList.js';
import { renderTasks } from './renderer.js';
import { getTasksList } from './serverExchange.js';
import { setItem } from './storage.js';
document.addEventListener('DOMContentLoaded', function () {
  getTasksList().then(function (tasks) {
    //  setItem('tasksList', tasks);
    renderTasks();
  });
  initTodoListHandlers();
});
var onStorageChange = function onStorageChange(e) {
  if (e.key === 'tasksList') {
    renderTasks();
  }
};
window.addEventListener('storage', onStorageChange);