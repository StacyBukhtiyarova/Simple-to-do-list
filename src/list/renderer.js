import { getItem } from './storage';

import './list.scss';

const compareTasks = (a, b) => {
  if (a.done - b.done !== 0) {
    return a.done - b.done;
  }

  if (a.done) {
    return new Date(b.finishDate) - new Date(a.finishDate);
  }

  return new Date(b.createDate) - new Date(a.createDate);
};

const listElem = document.querySelector('.list');

const createCheckbox = ({ done, id }) => {
  const checkboxElem = document.createElement('input');
  checkboxElem.setAttribute('type', 'checkbox');
  checkboxElem.setAttribute('data-id', id);
  checkboxElem.checked = done;
  checkboxElem.classList.add('list__item-checkbox');

  return checkboxElem;
};

const createListItem = ({ text, done, id }) => {
  const listItemElem = document.createElement('li');
  listItemElem.classList.add('list__item');
  const checkboxElem = createCheckbox({ done, id });
  const deleteBtnElem = document.createElement('button');
  deleteBtnElem.classList.add('list__item-delete-btn');
  deleteBtnElem.dataset.id = id;
  if (done) {
    listItemElem.classList.add('list__item_done');
  }
  const textElem = document.createElement('span');
  textElem.textContent = text;
  listItemElem.append(checkboxElem, textElem, deleteBtnElem);

  return listItemElem;
};

export default function renderTasks() {
  const tasksList = getItem('tasksList') || [];
  listElem.innerHTML = '';
  const tasksElems = tasksList.map(createListItem).sort(compareTasks);

  listElem.append(...tasksElems);
}
