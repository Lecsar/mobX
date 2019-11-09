import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { appState, services } from '../store';
import { Input, Checkbox, Icon } from '../components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const AbsoluteWrapper = styled.div`
  display: flex;
  position: absolute;
  width: max-content;
  top: ${({ topOffset }) => `calc(50% - ${topOffset}px)`};
  left: ${({ left }) => (left >= 0 ? `${left}px` : '')};
  right: ${({ right }) => `${right || 0}px`};
`;

export const AddField = observer(() => (
  <Wrapper>
    {appState.hasTodos && (
      <AbsoluteWrapper left={0} topOffset={20}>
        <Checkbox
          checked={appState.checkedAll}
          onClick={services.toggleAllTodo}
        />
      </AbsoluteWrapper>
    )}
    <Input
      placeholder="What needs to be done?"
      padding="10px 45px"
      value={appState.addInputValue}
      onChange={services.setAddInputValue}
      onEnterKeyDown={services.addTask}
      onEscapeKeyDown={services.clearInput}
      setFocus
    />
    <AbsoluteWrapper right={3} topOffset={14}>
      <Icon
        type="plus"
        size="30"
        padding={0}
        margin={0}
        onClick={services.addTask}
      />
    </AbsoluteWrapper>
  </Wrapper>
));
