import { initTodoListHandlers } from './list/toDoList.js';
import { renderTasks } from './list/renderer.js';
import { getTasksList } from './list/serverExchange.js';
import { setItem } from './list/storage.js';
import './index.scss';
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