import React, { useCallback } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { noop } from '../helpers';
import { Icon } from './Icon';

const StyledBox = styled.div`
  position: relative;
  margin: 5px 10px;
  width: ${({ elementSize }) => `${elementSize}px`};
  height: ${({ elementSize }) => `${elementSize}px`};
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  filter: invert(0.5);

  &:hover {
    filter: invert(0);
  }
`;

const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Checkbox = observer(({ checked, onClick = noop, size = 30 }) => {
  const toggleChecked = useCallback(() => {
    onClick(!checked);
  }, [onClick, checked]);

  return (
    <StyledBox elementSize={size} onClick={toggleChecked}>
      {checked && (
        <IconWrapper>
          <Icon type="check" padding={0} margin={0} />
        </IconWrapper>
      )}
    </StyledBox>
  );
});
