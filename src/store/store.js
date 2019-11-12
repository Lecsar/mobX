import { FILTER_TYPES } from '../const';

let id = 1;

export function createStore() {
  return {
    todos: [],
    filter: FILTER_TYPES.ALL,
    editedTodoId: null,

    get checkedAll() {
      return this.todos.every(({ checked }) => checked);
    },

    get hasTodos() {
      return !!this.todos.length;
    },

    get visibleTodos() {
      switch (this.filter) {
        case FILTER_TYPES.CHECKED:
          return this.todos.filter(({ checked }) => checked);
        case FILTER_TYPES.UNCHECKED:
          return this.todos.filter(({ checked }) => !checked);
        default:
          return this.todos;
      }
    },

    get amountUncheckedTodos() {
      return this.todos.filter(({ checked }) => !checked).length;
    },

    get editedTodo() {
      return this.todos.find(({ id }) => this.editedTodoId === id);
    },

    addTask(inputValue) {
      const text = inputValue.trim();

      if (text) {
        this.todos.push({
          id,
          text,
          checked: false,
        });
        id++;
      }
    },

    toggleTodo(todoId) {
      const findedTodo = this.todos.find(({ id }) => todoId === id);
      findedTodo.checked = !findedTodo.checked;
    },

    toggleAllTodo(checked) {
      this.todos.forEach(todo => {
        todo.checked = checked;
      });
    },

    setFilter(filter) {
      this.filter = filter;
    },

    setEditedTodoId(editedTodoId) {
      this.editedTodoId = editedTodoId;
    },

    deleteTodo(deletedTodoId) {
      this.todos = this.todos.filter(({ id }) => deletedTodoId !== id);
    },

    editTodo(editedText) {
      const formatedText = editedText.trim();

      if (formatedText) {
        this.editedTodo.text = formatedText;
      } else {
        this.deleteTodo(this.editedTodoId);
      }

      this.editedTodoId = null;
    },
  };
}
