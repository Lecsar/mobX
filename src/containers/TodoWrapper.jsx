import React, { useCallback } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { services } from '../store';
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

export const TodoWrapper = observer(({ id, checked, text, isEditedTodo }) => {
  const onClickCheckbox = useCallback(() => {
    services.toggleTodo(id);
  }, [id, services.toggleTodo]);

  const throwOffTodoId = useCallback(() => {
    services.setEditedTodoId(null);
  }, [services.setEditedTodoId]);

  const setEditedTodoId = useCallback(() => {
    services.setEditedTodoId(id);
  }, [id, services.setEditedTodoId]);

  const deleteTodo = useCallback(() => {
    services.deleteTodo(id);
  }, [id, services.deleteTodo]);

  return (
    <TodoStyledWrapper onDoubleClick={setEditedTodoId} onBlur={throwOffTodoId}>
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
          onClickDelete={deleteTodo}
        />
      )}
    </TodoStyledWrapper>
  );
});
