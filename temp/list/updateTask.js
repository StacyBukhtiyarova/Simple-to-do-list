import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.to-string.js";
import { renderTasks } from './renderer.js';
import { getItem, setItem } from './storage.js';
import { updateTask, getTasksList, deleteTask } from './serverExchange.js';
import { onDeleteTask } from './createTask.js';
export var onToggleTask = function onToggleTask(e) {
  var isCheckbox = e.target.classList.contains('list__item-checkbox');
  if (!isCheckbox) {
    return;
  }
  var tasksList = getItem('tasksList');
  var taskId = e.target.dataset.id;
  var _tasksList$find = tasksList.find(function (task) {
      return task.id === taskId;
    }),
    text = _tasksList$find.text,
    createDate = _tasksList$find.createDate;
  var done = e.target.checked;
  var updatedTask = {
    text: text,
    createDate: createDate,
    done: done,
    finishDate: done ? new Date().toISOString() : null
  };
  updateTask(taskId, updatedTask).then(function () {
    return getTasksList();
  }).then(function (newTasksList) {
    setItem('tasksList', newTasksList);
    renderTasks();
  });
};