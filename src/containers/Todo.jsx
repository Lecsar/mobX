import React from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, Text, Icon } from '../components';

export const Todo = observer(
  ({ checked, text, onClickCheckbox, onClickDelete }) => (
    <React.Fragment>
      <Checkbox onClick={onClickCheckbox} checked={checked} />
      <Text
        textDecoration={checked ? 'line-through' : 'none'}
        cursor="pointer"
        textAlign="justify"
      >
        {text}
      </Text>
      <Icon type="delete" size={20} onClick={onClickDelete} />
    </React.Fragment>
  )
);
