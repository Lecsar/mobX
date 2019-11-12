import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { useStore } from './store';
import { Text } from './components';
import { AddField, TodoWrapper, FilterPanel } from './containers';
import { ORANGE_COLOR } from './const';

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex-basis: 300px;
  max-width: 700px;
  margin: 0 10px;
`;

const useStoreData = () => {
  const { visibleTodos, hasTodos, editedTodoId } = useStore();

  return {
    visibleTodos,
    hasTodos,
    editedTodoId,
  };
};

export const App = observer(() => {
  const { visibleTodos, hasTodos, editedTodoId } = useStoreData();

  return (
    <MainWrapper>
      <Text color={ORANGE_COLOR} fontSize={40} justify="center">
        todo
      </Text>
      <AddField />
      {visibleTodos.map(({ id, ...props }) => (
        <TodoWrapper
          key={id}
          id={id}
          isEditedTodo={id === editedTodoId}
          {...props}
        />
      ))}
      {hasTodos && <FilterPanel />}
    </MainWrapper>
  );
});
