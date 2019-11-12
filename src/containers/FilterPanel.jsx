import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { Text } from '../components';
import { Button } from '../components/Button';
import { GREY_COLOR, FILTER_TYPES } from '../const';

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  border: 1px solid ${GREY_COLOR};
  background-color: white;
  padding: 0 10px;
  box-sizing: border-box;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const useStoreData = () => {
  const { amountUncheckedTodos, filter, setFilter } = useStore();
  return {
    amountUncheckedTodos,
    filter,
    setFilter,
  };
};

export const FilterPanel = observer(() => {
  const { amountUncheckedTodos, filter, setFilter } = useStoreData();

  return (
    <FilterWrapper>
      <Text>{amountUncheckedTodos} items left</Text>
      <ButtonsWrapper>
        <Button
          active={filter === FILTER_TYPES.ALL}
          value={FILTER_TYPES.ALL}
          onClick={setFilter}
        >
          All
        </Button>
        <Button
          active={filter === FILTER_TYPES.UNCHECKED}
          value={FILTER_TYPES.UNCHECKED}
          onClick={setFilter}
        >
          Active
        </Button>
        <Button
          active={filter === FILTER_TYPES.CHECKED}
          value={FILTER_TYPES.CHECKED}
          onClick={setFilter}
        >
          Completed
        </Button>
      </ButtonsWrapper>
    </FilterWrapper>
  );
});
