export { appState } from '../store';

let id = 1;

export const createServices = appState => {
  const addTask = (inputValue) => {
    const text = inputValue.trim();

    if (text) {
      appState.todos.push({
        id,
        text,
        checked: false
      });
      id++;
    }
  };

  const toggleTodo = todoId => {
    const findedTodo = appState.todos.find(({ id }) => todoId === id);
    findedTodo.checked = !findedTodo.checked;
  };

  const toggleAllTodo = checked => {
    appState.todos.forEach(todo => {
      todo.checked = checked;
    });
  };

  const setFilter = filter => {
    appState.filter = filter;
  };

  const setEditedTodoId = editedTodoId => {
    appState.editedTodoId = editedTodoId;
  };

  const deleteTodo = deletedTodoId => {
    appState.todos = appState.todos.filter(({ id }) => deletedTodoId !== id);
  };

  const editTodo = editedText => {
    const formatedText = editedText.trim();

    if (formatedText) {
      appState.editedTodo.text = formatedText;
    } else {
      deleteTodo(appState.editedTodoId);
    }

    appState.editedTodoId = null;
  };

  return {
    addTask,
    toggleTodo,
    toggleAllTodo,
    setFilter,
    setEditedTodoId,
    editTodo,
    deleteTodo
  };
};
