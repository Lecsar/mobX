import React, { useCallback } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Todo } from '../components';

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

enum FilterTypes {
  completed,
  uncomleted
}

type Filter = FilterTypes | null;

interface AppProps {
  name: string;
}

export const App = observer(({ name }: AppProps) => {
  const store = useLocalStore(() => ({
    inputValue: '',
    todos: [] as Task[],
    filter: null as Filter,

    setInputValue(value: string) {
      store.inputValue = value;
    },

    setFilter(filter: Filter) {
      store.filter = filter;
    },

    addTodo() {
      store.todos.unshift({
        id: Math.floor(Math.random() * 1000),
        text: store.inputValue,
        completed: false
      });

      store.inputValue = '';
    },

    deleteTodo(deletedTodoId: number) {
      store.todos = store.todos.filter(({ id }) => deletedTodoId !== id);
    },

    toggleTodo(todoId: number) {
      const findedTodo = store.todos.find(({ id }) => id === todoId);

      if (findedTodo) {
        findedTodo.completed = !findedTodo.completed;
      }
    },

    get remainingTodos() {
      return store.todos.filter(todo => !todo.completed).length;
    },

    get filteredTodos() {
      switch (store.filter) {
        case FilterTypes.completed:
          return store.todos.filter(({ completed }) => completed);
        case FilterTypes.uncomleted:
          return store.todos.filter(({ completed }) => !completed);
        default:
          return store.todos;
      }
    }
  }));

  const { inputValue, toggleTodo, setInputValue, addTodo, deleteTodo } = store;

  const onChangeInput = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      setInputValue(value),
    [setInputValue]
  );

  const onKeyDownInput = useCallback(
    ({ keyCode }: React.KeyboardEvent) => {
      switch (keyCode) {
        case 13:
          addTodo();
          break;
      }
    },
    [addTodo]
  );

  return (
    <main style={{ margin: '0 auto' }}>
      <h1>{name}</h1>
      <input
        placeholder="Введите название"
        value={inputValue}
        onKeyDown={onKeyDownInput}
        onChange={onChangeInput}
      />

      <h2>{store.remainingTodos}</h2>

      {store.filteredTodos.map(({ id, text, completed }, index) => (
        <Todo
          key={id}
          id={id}
          text={text}
          completed={completed}
          checkTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </main>
  );
});
