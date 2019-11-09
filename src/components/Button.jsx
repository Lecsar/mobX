import React, { useCallback } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { ORANGE_COLOR } from '../const';
import { noop } from '../helpers';

const StyledButton = styled.button`
  outline: none;
  border: ${({ active }) =>
    active ? `1px solid ${ORANGE_COLOR}` : `1px solid white`};
  cursor: pointer;
  background-color: white;
  margin: 0 10px;
  padding: 10px;

  &:hover {
    border: 1px solid ${ORANGE_COLOR};
  }
`;

export const Button = observer(
  ({ active, value, children, onClick = noop }) => {
    const onBtnClick = useCallback(() => {
      onClick(value);
    }, [value, onClick]);

    return (
      <StyledButton active={active} onClick={onBtnClick}>
        {children}
      </StyledButton>
    );
  }
);
