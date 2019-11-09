import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Text } from './components';
import { AddField, TodoWrapper, FilterPanel } from './containers';
import { appState as state } from './store';
import { ORANGE_COLOR } from './const';

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex-basis: 300px;
  max-width: 700px;
  margin: 0 10px;
`;

export const App = observer(() => (
  <MainWrapper>
    <Text color={ORANGE_COLOR} fontSize={40} justify="center">
      todo
    </Text>
    <AddField />
    {state.visibleTodos.map(({ id, ...props }) => (
      <TodoWrapper key={id} id={id} isEditedTodo={id === state.editedTodoId} {...props} />
    ))}
    {state.hasTodos && <FilterPanel />}
  </MainWrapper>
));
