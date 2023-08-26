import { initTodoListHandlers } from './list/toDoList';
import renderTasks from './list/renderer';
import { getTasksList } from './list/serverExchange';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  getTasksList().then(() => {
    renderTasks();
  });
  initTodoListHandlers();
});

const onStorageChange = (e) => {
  if (e.key === 'tasksList') {
    renderTasks();
  }
};

window.addEventListener('storage', onStorageChange);
