import React, { useState, useCallback, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { ENTER_KEY_CODE, ESCAPE_KEY_CODE } from '../const';
import { noop } from '../helpers';

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  padding: ${({ padding }) => padding};
  font-size: 30px;
  margin: 10px 0;
  border-radius: 5px;
  border: 0;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
`;

const INPUT_MODE = {
  MANUAL: 'MANUAL',
  AUTO: 'AUTO'
};

export const Input = observer(
  ({
    padding = '5px',
    placeholder = '',
    startValue = '',
    value = null,
    onChange = noop,
    onEnterKeyDown = noop,
    onEscapeKeyDown = noop,
    setFocus = false
  }) => {
    const [inputValue, setInputValue] = useState(startValue);
    const inputRef = useRef(null);
    const mode = value || value === '' ? INPUT_MODE.MANUAL : INPUT_MODE.AUTO;

    useEffect(() => {
      if (setFocus && inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }, [setFocus, inputRef]);

    const onChangeInputValue = useCallback(
      ({ target: { value } }) => {
        mode === INPUT_MODE.AUTO ? setInputValue(value) : onChange(value);
      },
      [onChange, mode]
    );

    const onKeyDown = useCallback(
      ({ keyCode }) => {
        switch (keyCode) {
          case ENTER_KEY_CODE:
            if (mode === INPUT_MODE.AUTO) {
              onEnterKeyDown(inputValue);
              setInputValue('');
            } else {
              onEnterKeyDown();
            }
            break;
          case ESCAPE_KEY_CODE:
            onEscapeKeyDown();

            if (mode === INPUT_MODE.AUTO) {
              setInputValue('');
            }
            break;
          default:
            break;
        }
      },
      [mode, setInputValue, inputValue, onEnterKeyDown, onEscapeKeyDown]
    );

    return (
      <StyledInput
        ref={inputRef}
        padding={padding}
        placeholder={placeholder}
        value={mode === INPUT_MODE.AUTO ? inputValue : value}
        onChange={onChangeInputValue}
        onKeyDown={onKeyDown}
      />
    );
  }
);
