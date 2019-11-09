import { observable } from 'mobx';
import { createServices } from '../services';
import { FILTER_TYPES } from '../const';

export const appState = observable({
  addInputValue: '',
  todos: [],
  filter: FILTER_TYPES.ALL,
  editedTodoId: null,

  get checkedAll() {
    return appState.todos.every(({ checked }) => checked);
  },

  get hasTodos() {
    return !!appState.todos.length;
  },

  get visibleTodos() {
    switch (appState.filter) {
      case FILTER_TYPES.CHECKED:
        return appState.todos.filter(({ checked }) => checked);
      case FILTER_TYPES.UNCHECKED:
        return appState.todos.filter(({ checked }) => !checked);
      default:
        return appState.todos;
    }
  },

  get amountUncheckedTodos() {
    return appState.todos.filter(({ checked }) => !checked).length;
  },

  get editedTodo() {
    return appState.todos.find(({ id }) => appState.editedTodoId === id);
  }
});

export const services = createServices(appState);
