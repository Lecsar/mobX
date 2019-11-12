import React, { useCallback } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { services, useStore } from '../store';
import { GREY_COLOR } from '../const';
import { Todo } from '.';
import { Input } from '../components';

const TodoStyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 40px;
  background-color: white;
  border-top: 1px solid ${GREY_COLOR};
  border-bottom: 1px solid ${GREY_COLOR};
`;

const useStoreData = () => {
  const { toggleTodo, setEditedTodoId, deleteTodo } = useStore();
  return { toggleTodo, setEditedTodoId, deleteTodo };
};

export const TodoWrapper = observer(({ id, checked, text, isEditedTodo }) => {
  const { toggleTodo, setEditedTodoId, deleteTodo } = useStoreData();

  const onClickCheckbox = useCallback(() => {
    toggleTodo(id);
  }, [id, toggleTodo]);

  const throwOffTodoId = useCallback(() => {
    setEditedTodoId(null);
  }, [setEditedTodoId]);

  const onSetEditedTodoId = useCallback(() => {
    setEditedTodoId(id);
  }, [id, setEditedTodoId]);

  const onDeleteTodo = useCallback(() => {
    deleteTodo(id);
  }, [id, deleteTodo]);

  return (
    <TodoStyledWrapper onDoubleClick={onSetEditedTodoId} onBlur={throwOffTodoId}>
      {isEditedTodo ? (
        <Input
          startValue={text}
          onEnterKeyDown={services.editTodo}
          onEscapeKeyDown={throwOffTodoId}
          setFocus
        />
      ) : (
        <Todo
          checked={checked}
          text={text}
          onClickCheckbox={onClickCheckbox}
          onClickDelete={onDeleteTodo}
        />
      )}
    </TodoStyledWrapper>
  );
});
