import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Task } from '../containers';

type TodoProps = Task & {
  checkTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export const Todo = observer(
  ({ id, text, completed, checkTodo, deleteTodo }: TodoProps) => {
    const onCheck = useCallback(() => checkTodo(id), [id, checkTodo]);
    const onDelete = useCallback(() => deleteTodo(id), [id, deleteTodo]);

    return (
      <div>
        <button onClick={onCheck}>Чек</button>
        <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
          {text}
        </span>
        <button onClick={onDelete}>Удалить</button>
      </div>
    );
  }
);
